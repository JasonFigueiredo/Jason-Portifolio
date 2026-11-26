// Peças de gravação usadas pelos roteiros de gravar.mjs: o navegador, o
// relógio da página, o cursor visível e a gravação quadro a quadro.
//
// Roda dentro do contêiner do Chrome (ver o cabeçalho de gravar.mjs).
//
// Por que quadro a quadro, e não o screencast do DevTools: no contêiner não há
// GPU, e uma página que rola, ou que tem fundo desfocado, leva de 100 ms a
// meio segundo para pintar cada quadro. Gravando em tempo real, o vídeo
// sairia com menos de 10 quadros por segundo. Aqui o tempo da página só anda quando a gravação manda: cada
// quadro avança o relógio 1/30 s e fotografa a tela, demore o quanto demorar.
// As animações, os temporizadores e o requestAnimationFrame da página veem
// esse relógio, então o vídeo sai a 30 quadros por segundo, na velocidade de
// verdade.

import puppeteer from 'puppeteer';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const LARGURA = 1280;
export const ALTURA = 800;
export const QUADROS_POR_SEGUNDO = 30;
const DURACAO_DO_QUADRO = 1000 / QUADROS_POR_SEGUNDO;

export const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// Começa e termina devagar: é o que faz um movimento parecer de mão, e não de
// máquina.
const suave = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
// A rolagem longa usa a de quinta potência, que arranca e para mais macio.
const suaveLonga = (p) => (p < 0.5 ? 16 * p ** 5 : 1 - Math.pow(-2 * p + 2, 5) / 2);

export async function abrirNavegador() {
  return puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--lang=pt-BR',
      '--hide-scrollbars',
      // Sem perfil de cor do sistema, as cores saem como o CSS manda; com ele,
      // o mesmo vídeo muda de tom conforme a máquina que grava.
      '--force-color-profile=srgb',
    ],
    env: {
      ...process.env,
      // O --lang sozinho não basta: o campo de data segue o idioma do
      // processo, e a tela de um sistema em português mostraria 11/26/2026.
      LANG: 'pt_BR.UTF-8',
      LANGUAGE: 'pt_BR:pt',
      FONTCONFIG_FILE: fileURLToPath(new URL('./fontes.conf', import.meta.url)),
    },
    defaultViewport: null,
  });
}

/**
 * Troca o relógio da página por um que a gravação controla. Instalado antes de
 * qualquer script da página, para que bibliotecas que guardam uma referência a
 * requestAnimationFrame ao carregar (o Chart.js faz isso) peguem esta.
 *
 * Enquanto a página prepara, uma bomba de tempo real faz o relógio seguir o
 * relógio de parede: tudo funciona normalmente. Ao congelar, o tempo só anda
 * em avancar(), e as animações CSS e Web Animations são pausadas e movidas na
 * mão, quadro a quadro.
 */
function instalarRelogio() {
  if (window.__relogio) return;
  const real = {
    setInterval: window.setInterval.bind(window),
    clearInterval: window.clearInterval.bind(window),
    setTimeout: window.setTimeout.bind(window),
    agora: performance.now.bind(performance),
    dataAgora: Date.now,
  };
  let agora = real.agora();
  const deslocamento = real.dataAgora() - agora;
  let sequencia = 0;
  const temporizadores = new Map();
  const quadros = new Map();
  const animacoesVistas = new WeakSet();

  const agendar = (funcao, ms, args, repetir) => {
    const id = ++sequencia;
    const espera = Math.max(0, Number(ms) || 0);
    temporizadores.set(id, { quando: agora + espera, funcao, args, repetir: repetir ? Math.max(1, espera) : 0 });
    return id;
  };
  window.setTimeout = (funcao, ms, ...args) => agendar(funcao, ms, args, false);
  window.setInterval = (funcao, ms, ...args) => agendar(funcao, ms, args, true);
  window.clearTimeout = window.clearInterval = (id) => temporizadores.delete(id);
  window.requestAnimationFrame = (funcao) => {
    const id = ++sequencia;
    quadros.set(id, funcao);
    return id;
  };
  window.cancelAnimationFrame = (id) => quadros.delete(id);
  performance.now = () => agora;
  Date.now = () => Math.round(agora + deslocamento);

  const correr = (funcao, args) => {
    try {
      if (typeof funcao === 'function') funcao(...args);
    } catch (erro) {
      console.error(erro);
    }
  };

  function correrTemporizadores(ate) {
    for (let guarda = 0; guarda < 5000; guarda++) {
      let proximo;
      for (const [id, t] of temporizadores) {
        if (t.quando <= ate && (!proximo || t.quando < proximo[1].quando)) proximo = [id, t];
      }
      if (!proximo) break;
      const [id, t] = proximo;
      agora = Math.max(agora, t.quando);
      if (t.repetir) t.quando += t.repetir;
      else temporizadores.delete(id);
      correr(t.funcao, t.args);
    }
    agora = Math.max(agora, ate);
  }

  function correrQuadros() {
    const pendentes = [...quadros.values()];
    quadros.clear();
    for (const funcao of pendentes) correr(funcao, [agora]);
  }

  function moverAnimacoes(ms) {
    for (const animacao of document.getAnimations()) {
      // As que seguem a rolagem (animation-timeline) já andam com ela.
      if (animacao.timeline !== document.timeline || animacao.playState === 'finished') continue;
      try {
        if (animacao.playState === 'running') animacao.pause();
        // Animação que nasceu neste quadro começa do zero, e não do tanto de
        // tempo de parede que passou até a gravação percebê-la.
        if (!animacoesVistas.has(animacao)) {
          animacoesVistas.add(animacao);
          animacao.currentTime = 0;
          continue;
        }
        const fim = animacao.effect?.getComputedTiming?.().endTime;
        const proximo = (animacao.currentTime ?? 0) + ms * (animacao.playbackRate || 1);
        // finish(), e não só currentTime no fim: sem ele não sai o evento de
        // término, e quem espera por ele (transições do Vue e do Svelte que
        // tiram o elemento da tela) esperaria para sempre.
        if (Number.isFinite(fim) && proximo >= fim) animacao.finish();
        else animacao.currentTime = proximo;
      } catch (erro) {
        console.error(erro);
      }
    }
  }

  let congelado = false;
  let ultimo = real.agora();
  const bomba = real.setInterval(() => {
    const t = real.agora();
    correrTemporizadores(agora + (t - ultimo));
    ultimo = t;
    correrQuadros();
  }, 16);

  window.__relogio = {
    congelar() {
      if (congelado) return;
      congelado = true;
      real.clearInterval(bomba);
      for (const animacao of document.getAnimations()) {
        animacoesVistas.add(animacao);
        if (animacao.timeline === document.timeline && animacao.playState === 'running') animacao.pause();
      }
    },
    /** Avança o relógio e devolve depois que o que isso agendou já rodou. */
    async avancar(ms, rolagem) {
      correrTemporizadores(agora + ms);
      if (rolagem != null) {
        const raiz = document.scrollingElement;
        raiz.style.scrollBehavior = 'auto';
        raiz.scrollTop = rolagem;
      }
      correrQuadros();
      moverAnimacoes(ms);
      // Vue e Svelte aplicam as mudanças em microtarefas; uma volta do laço
      // de eventos garante que elas já estão no DOM antes da foto.
      await new Promise((r) => real.setTimeout(r, 0));
    },
  };
}

/**
 * O cursor do Chrome sem janela não aparece em captura nenhuma. Este ponto
 * segue os eventos de mouse de verdade (os mesmos que acionam :hover e os
 * cliques), então o que se vê no vídeo é o que a página recebeu.
 */
function instalarCursor() {
  if (window.__cursorDaGravacao) return;
  window.__cursorDaGravacao = true;
  const montar = () => {
    const estilo = document.createElement('style');
    estilo.textContent = `
      #cursor-da-gravacao {
        position: fixed; left: 0; top: 0; z-index: 2147483647; pointer-events: none;
        width: 22px; height: 22px; margin: -11px 0 0 -11px; border-radius: 50%;
        background: rgba(17, 20, 28, 0.42); border: 2px solid rgba(255, 255, 255, 0.95);
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(17, 20, 28, 0.25);
        opacity: 0; transition: opacity 0.25s, scale 0.12s;
      }
      #cursor-da-gravacao.visivel { opacity: 1; }
      #cursor-da-gravacao.apertado { scale: 0.78; }
      .onda-da-gravacao {
        position: fixed; z-index: 2147483646; pointer-events: none;
        width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.9); background: rgba(17, 20, 28, 0.18);
        animation: onda-da-gravacao 0.5s ease-out forwards;
      }
      @keyframes onda-da-gravacao {
        from { scale: 0.35; opacity: 0.9; }
        to { scale: 1.35; opacity: 0; }
      }`;
    const ponto = document.createElement('div');
    ponto.id = 'cursor-da-gravacao';
    document.documentElement.append(estilo, ponto);
    // A posição vai em translate, e não em transform: o scale do aperto é
    // aplicado antes do transform e encolheria o deslocamento junto, jogando
    // o ponto para longe do clique.
    const posicionar = (e) => {
      ponto.style.translate = `${e.clientX}px ${e.clientY}px`;
      ponto.classList.add('visivel');
    };
    addEventListener('mousemove', posicionar, true);
    addEventListener('mousedown', (e) => {
      posicionar(e);
      ponto.classList.add('apertado');
      const onda = document.createElement('div');
      onda.className = 'onda-da-gravacao';
      onda.style.left = `${e.clientX}px`;
      onda.style.top = `${e.clientY}px`;
      document.documentElement.append(onda);
      onda.addEventListener('animationend', () => onda.remove());
    }, true);
    addEventListener('mouseup', () => ponto.classList.remove('apertado'), true);
  };
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', montar);
  else montar();
}

/**
 * Uma gravação: a página, o cursor e os quadros. Antes de iniciar(), a página
 * vive em tempo real e o roteiro prepara a cena com esperar(); depois, o tempo
 * só passa pelos métodos daqui (pausa, moverPara, rolarPara...), cada um
 * fotografando os quadros que lhe cabem.
 */
export class Gravacao {
  static async nova(navegador, pastaSaida, termosSigilosos = []) {
    const pagina = await navegador.newPage();
    await pagina.setViewport({ width: LARGURA, height: ALTURA, deviceScaleFactor: 1 });
    await pagina.emulateTimezone('America/Sao_Paulo');
    await pagina.evaluateOnNewDocument(instalarRelogio);
    await pagina.evaluateOnNewDocument(instalarCursor);
    const gravacao = new Gravacao(pagina, pastaSaida, termosSigilosos);
    gravacao.cdp = await pagina.createCDPSession();
    return gravacao;
  }

  constructor(pagina, pastaSaida, termosSigilosos) {
    this.pagina = pagina;
    this.pasta = pastaSaida;
    this.termos = termosSigilosos;
    this.quadros = 0;
    this.mouse = { x: LARGURA * 0.75, y: ALTURA * 0.7 };
  }

  async iniciar() {
    rmSync(this.pasta, { recursive: true, force: true });
    mkdirSync(join(this.pasta, 'quadros'), { recursive: true });
    await this.pagina.evaluate(() => window.__relogio.congelar());
    await this.fotografar();
  }

  async fotografar() {
    const { data } = await this.cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
    this.quadros += 1;
    writeFileSync(join(this.pasta, 'quadros', `${String(this.quadros).padStart(5, '0')}.jpg`), Buffer.from(data, 'base64'));
    // Confere o texto da tela a cada segundo de vídeo, não só no começo: cada
    // clique pode trazer uma tela nova.
    if (this.quadros % QUADROS_POR_SEGUNDO === 0) await this.conferirSigilo();
  }

  /** Um quadro: o relógio da página anda 1/30 s, a rolagem vai a y (se dada), e a foto. */
  async quadro(rolagem) {
    await this.pagina.evaluate((ms, y) => window.__relogio.avancar(ms, y), DURACAO_DO_QUADRO, rolagem ?? null);
    await this.fotografar();
  }

  async pausa(ms) {
    for (let i = Math.round(ms / DURACAO_DO_QUADRO); i > 0; i--) await this.quadro();
  }

  /**
   * Grava até a condição valer na página. Serve ao que depende do mundo de
   * fora, como uma resposta de rede: ela chega no tempo de parede, e o vídeo
   * mostra a espera que houve.
   */
  async aguardar(condicao, { limite = 20000, minimo = 0 } = {}) {
    const fim = Date.now() + limite;
    let feitos = 0;
    for (;;) {
      if (feitos * DURACAO_DO_QUADRO >= minimo && await this.pagina.evaluate(condicao).catch(() => false)) return;
      if (Date.now() > fim) throw new Error(`a condição não veio a tempo: ${condicao}`);
      await this.quadro();
      feitos += 1;
    }
  }

  /**
   * Fotografa a tela de agora como cartaz do vídeo, sem o ponto do cursor:
   * parado em cima de um botão, numa imagem estática, ele parece defeito. O
   * relógio não anda, então o vídeo não perde nem ganha quadro.
   */
  async fotografarCartaz() {
    const mostrarCursor = (visivel) => this.pagina.evaluate((v) => {
      for (const el of document.querySelectorAll('#cursor-da-gravacao, .onda-da-gravacao')) {
        el.style.visibility = v ? '' : 'hidden';
      }
    }, visivel);
    await mostrarCursor(false);
    const { data } = await this.cdp.send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(this.pasta, 'cartaz.png'), Buffer.from(data, 'base64'));
    await mostrarCursor(true);
    this.cartaz = 'cartaz.png';
  }

  async parar() {
    await this.conferirSigilo();
    const resumo = {
      quadrosPorSegundo: QUADROS_POR_SEGUNDO,
      quadros: this.quadros,
      duracao: Number((this.quadros / QUADROS_POR_SEGUNDO).toFixed(2)),
      cartaz: this.cartaz ?? `quadros/${String(Math.ceil(this.quadros / 2)).padStart(5, '0')}.jpg`,
    };
    writeFileSync(join(this.pasta, 'gravacao.json'), `${JSON.stringify(resumo, null, 2)}\n`);
    return resumo;
  }

  // ---- cursor ------------------------------------------------------------

  /** Põe o cursor num ponto sem animar (antes de a gravação começar). */
  async posicionarCursor(x, y) {
    this.mouse = { x, y };
    await this.pagina.mouse.move(x, y);
  }

  /** Leva o mouse até (x, y) num caminho levemente curvo, como a mão faz. */
  async moverPara(x, y, ms) {
    const { x: x0, y: y0 } = this.mouse;
    const distancia = Math.hypot(x - x0, y - y0);
    const duracao = ms ?? Math.min(850, 360 + distancia * 0.5);
    // A curva sai para o lado, proporcional à distância: linha reta denuncia robô.
    const curva = Math.min(50, distancia * 0.1);
    const nx = distancia ? -(y - y0) / distancia : 0;
    const ny = distancia ? (x - x0) / distancia : 0;
    const passos = Math.max(1, Math.round(duracao / DURACAO_DO_QUADRO));
    for (let i = 1; i <= passos; i++) {
      const e = suave(i / passos);
      const arco = Math.sin(Math.PI * e) * curva;
      await this.pagina.mouse.move(x0 + (x - x0) * e + nx * arco, y0 + (y - y0) * e + ny * arco);
      await this.quadro();
    }
    this.mouse = { x, y };
  }

  /**
   * Acha um elemento visível pelo seletor e, se dado, por um trecho do texto.
   * Procura pelo texto porque é o que está na tela: um seletor de classe muda
   * a cada build, o rótulo não.
   */
  async achar(seletor, texto) {
    const alvo = await this.pagina.evaluateHandle((s, t) => {
      const visivel = (el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden';
      };
      return [...document.querySelectorAll(s)].find(
        (el) => visivel(el) && (!t || (el.innerText || el.value || '').trim().includes(t)),
      ) ?? null;
    }, seletor, texto ?? null);
    const elemento = alvo.asElement();
    if (!elemento) throw new Error(`não achei ${seletor}${texto ? ` com "${texto}"` : ''}`);
    return elemento;
  }

  async centroDe(elemento, { dx = 0.5, dy = 0.5 } = {}) {
    const caixa = await elemento.boundingBox();
    if (!caixa || caixa.y < 0 || caixa.y + caixa.height > ALTURA) {
      throw new Error('o elemento a clicar está fora da tela; role antes');
    }
    return { x: caixa.x + caixa.width * dx, y: caixa.y + caixa.height * dy };
  }

  /** Move até o elemento e clica, com o aperto visível. */
  async clicar(seletor, texto, opcoes = {}) {
    const elemento = await this.achar(seletor, texto);
    const { x, y } = await this.centroDe(elemento, opcoes);
    await this.moverPara(x, y);
    await this.pausa(opcoes.antes ?? 130);
    await this.pagina.mouse.down();
    await this.pausa(100);
    await this.pagina.mouse.up();
    await this.quadro();
    return elemento;
  }

  /** Digita no campo com foco, uma tecla a cada intervalo. */
  async digitar(texto, intervalo = 90) {
    for (const tecla of texto) {
      await this.pagina.keyboard.type(tecla);
      await this.pausa(intervalo);
    }
  }

  // ---- rolagem -------------------------------------------------------------

  /** Rola a janela até y, um passo por quadro. */
  async rolarPara(y, ms) {
    const { origem, maximo } = await this.pagina.evaluate(() => ({
      origem: document.scrollingElement.scrollTop,
      maximo: document.scrollingElement.scrollHeight - innerHeight,
    }));
    const destino = Math.max(0, Math.min(maximo, Math.round(y)));
    const duracao = ms ?? Math.min(2600, 700 + Math.abs(destino - origem) * 0.45);
    const passos = Math.max(1, Math.round(duracao / DURACAO_DO_QUADRO));
    for (let i = 1; i <= passos; i++) {
      await this.quadro(origem + (destino - origem) * suaveLonga(i / passos));
    }
  }

  /**
   * Posição de rolagem que deixa o elemento centrado no espaço útil (abaixo
   * de um cabeçalho fixo, se houver). Se ele for mais alto que esse espaço,
   * alinha pelo topo.
   */
  async alvoDeRolagem(alvo, { alinhar = 'centro', folga = 24, texto } = {}) {
    const elemento = typeof alvo === 'string' ? await this.achar(alvo, texto) : alvo;
    const cabecalho = await this.alturaDoTopoFixo();
    return elemento.evaluate((el, topo, modo, margem) => {
      const r = el.getBoundingClientRect();
      const y = r.top + scrollY;
      const util = innerHeight - topo;
      if (modo === 'topo' || r.height + margem * 2 > util) return y - topo - margem;
      return y - topo - (util - r.height) / 2;
    }, cabecalho, alinhar, folga);
  }

  /** Onde termina o cabeçalho fixo no topo da página (0 se não houver). */
  async alturaDoTopoFixo() {
    return this.pagina.evaluate(() => {
      let fundo = 0;
      for (const el of document.body.querySelectorAll('*')) {
        const posicao = getComputedStyle(el).position;
        if (posicao !== 'fixed' && posicao !== 'sticky') continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 1 && r.height > 0 && r.height < 160 && r.width > innerWidth * 0.6) fundo = Math.max(fundo, r.bottom);
      }
      return fundo;
    });
  }

  // ---- sigilo --------------------------------------------------------------

  /** Quantos termos sigilosos estão no texto visível da página agora. */
  async contarSigilosos() {
    const { termos } = this;
    if (!termos.length) return 0;
    const texto = await this.pagina.evaluate(() => `${document.title}\n${document.body.innerText}`);
    // \b não enxerga letra acentuada; a fronteira aqui é "não é letra".
    return termos.filter((t) =>
      new RegExp(`(?<!\\p{L})${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'iu').test(texto)).length;
  }

  async conferirSigilo() {
    const achados = await this.contarSigilosos();
    if (achados) throw new Error(`${achados} termo(s) de TERMOS_SIGILOSOS na página; gravação descartada`);
  }
}
