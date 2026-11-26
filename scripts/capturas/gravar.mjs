// Grava as demonstrações em vídeo dos projetos: os sistemas de verdade,
// navegados por um Chrome sem janela, com dados fictícios. Nada aqui é gerado
// ou retocado: o que muda na página antes de gravar é só o que identificaria
// um cliente (ver sanearInova) e um aviso flutuante do Orion.
//
// Cada roteiro só olha: não cria, não edita, não apaga registro nenhum. O
// único formulário enviado é o de entrada do QualiPT, no ambiente local.
//
// 1. Gravar. Roda no contêiner do Puppeteer, com a rede do host (é por ela
//    que o ambiente local do QualiPT responde). $SAIDA é uma pasta fora do
//    repositório, onde ficam os quadros. Do diretório do portfólio:
//
//      mkdir -p "$SAIDA"
//      docker run --rm --network host --shm-size=1g --user "$(id -u):$(id -g)" \
//        -e HOME=/tmp -e PUPPETEER_CACHE_DIR=/home/pptruser/.cache/puppeteer \
//        -e QUALIPT_URL -e QUALIPT_LOGIN -e QUALIPT_SENHA -e TERMOS_SIGILOSOS \
//        -v "$PWD/scripts/capturas:/home/pptruser/capturas:ro" -v "$SAIDA:/saida" \
//        ghcr.io/puppeteer/puppeteer:latest node capturas/gravar.mjs [id...]
//
//    Sem id, grava todos: minhas-senhas, inova, qualipt, orion. O qualipt só
//    roda com QUALIPT_URL, QUALIPT_LOGIN e QUALIPT_SENHA definidos. A imagem
//    importa: o Chrome recente dela pinta o fundo desfocado do Orion dez
//    vezes mais rápido que o da zenika/alpine-chrome (e o Orion já leva uns
//    quatro minutos).
//
// 2. Codificar (no host, com Docker): node scripts/capturas/codificar.mjs "$SAIDA"
//
// Variáveis:
//   QUALIPT_URL, QUALIPT_LOGIN, QUALIPT_SENHA   ambiente local do QualiPT e um
//                                               login de supervisor de lá
//   TERMOS_SIGILOSOS   palavras que não podem aparecer na tela, separadas por
//                      vírgula (a cidade da fábrica, o nome da montadora...).
//                      Ficam fora do código porque o repositório é público:
//                      escrever a lista aqui seria publicá-la.
//   MINHAS_SENHAS_URL, INOVA_URL, ORION_URL     só para apontar outro endereço;
//                      o padrão é o público, o mesmo de data/projetos.ts

import { join } from 'node:path';
import { abrirNavegador, ALTURA, esperar, Gravacao, LARGURA } from './ferramentas.mjs';

const SAIDA = '/saida';
const TERMOS = (process.env.TERMOS_SIGILOSOS ?? '').split(',').map((t) => t.trim()).filter(Boolean);

/** Abre a página e espera as fontes: trocar de fonte no meio do vídeo pula o texto. */
async function abrir(g, url, seletor) {
  for (let tentativa = 0; ; tentativa++) {
    try {
      await g.pagina.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      if (seletor) await g.pagina.waitForSelector(seletor, { timeout: 20000 });
      break;
    } catch (erro) {
      // No Vite de desenvolvimento, a primeira visita a uma tela pode
      // reotimizar dependências e recarregar a página no meio do caminho.
      if (tentativa === 2) throw erro;
    }
  }
  await g.pagina.evaluate(() => document.fonts.ready);
}

/** Imagens com loading="lazy" chegariam atrasadas, já com a página rolando. */
async function carregarImagens(g) {
  await g.pagina.evaluate(async () => {
    const imagens = [...document.images];
    for (const img of imagens) img.loading = 'eager';
    await Promise.all(imagens.map((img) => (img.complete ? null : new Promise((r) => {
      img.addEventListener('load', r, { once: true });
      img.addEventListener('error', r, { once: true });
    }))));
    await Promise.all(imagens.map((img) => img.decode?.().catch(() => {})));
  });
}

// ---------------------------------------------------------------------------
// Minhas Senhas: a demonstração da página pública, que roda inteira no
// navegador com um cofre fictício. Segue as missões que a própria página
// propõe: destravar, abrir, revelar, copiar e gerar uma senha forte.

const minhasSenhas = {
  url: () => process.env.MINHAS_SENHAS_URL ?? 'https://minhasenha.duckdns.org/#demonstracao',

  async preparar(g) {
    await abrir(g, this.url(), '#palco-demo');
    // A janela do computador ocupa melhor um vídeo deitado do que o celular.
    // A demonstração é uma ilha que hidrata ao aparecer; até lá o botão não
    // responde, por isso a insistência.
    for (let i = 0; i < 30 && !(await g.pagina.$('#senha-mestra-d')); i++) {
      await g.pagina.evaluate(() => [...document.querySelectorAll('.seletor button')]
        .find((b) => b.innerText.includes('Computador'))?.click());
      await esperar(300);
    }
    await g.pagina.waitForSelector('#senha-mestra-d', { timeout: 10000 });
    await esperar(900);
    // Folga negativa: a faixa logo abaixo do cabeçalho é transparente, e o
    // seletor de aparelho apareceria cortado por ela.
    const topo = await g.alvoDeRolagem('#palco-demo .aparelho', { alinhar: 'topo', folga: -6 });
    await g.pagina.evaluate((y) => scrollTo(0, y), topo);
    await esperar(600);
    await g.posicionarCursor(LARGURA * 0.62, ALTURA * 0.86);
  },

  async gravar(g) {
    const senhaDaDemo = await g.pagina.$eval('#palco-demo .dica code', (el) => el.textContent.trim());
    await g.pausa(600);
    await g.clicar('#senha-mestra-d');
    await g.pausa(150);
    await g.digitar(senhaDaDemo);
    await g.pausa(250);
    await g.clicar('#palco-demo button[type=submit]', 'Destravar');
    await g.aguardar(() => !!document.querySelector('#palco-demo .lista button.abrir'), { minimo: 300 });
    await g.pausa(700);

    await g.clicar('#palco-demo .lista button.abrir', 'GitHub');
    await g.pausa(650);
    await g.clicar('#palco-demo .detalhe .acoes button', 'Mostrar');
    await g.pausa(450);
    await g.fotografarCartaz();
    await g.pausa(700);
    await g.clicar('#palco-demo .detalhe .acoes button', 'Copiar');
    await g.pausa(1200);

    // Uma senha fraca de propósito no cofre fictício: o app avisa e oferece a troca.
    await g.clicar('#palco-demo .lista button.abrir', 'Netflix');
    await g.pausa(1100);
    await g.clicar('#palco-demo .detalhe button', 'Trocar por uma forte');
    await g.pausa(900);
    await g.clicar('#palco-demo .editor button', 'Sortear outra');
    await g.pausa(700);
    await g.clicar('#palco-demo .editor button', 'Sortear outra');
    await g.pausa(1400);
  },
};

// ---------------------------------------------------------------------------
// Inova Blocos: a página de apresentação (/conheca), que reproduz as telas do
// sistema com dados de exemplo. O sistema em si, atrás do login, tem os dados
// reais do cliente e não é aberto.

/**
 * A página cita a cidade da fábrica no olho do topo e no rodapé. O código não
 * escreve o nome da cidade (o repositório é público): as regras reconhecem a
 * forma em que ela aparece, "Unidade <cidade>" e "<cidade> — UF".
 */
async function sanearInova(g) {
  await g.pagina.evaluate(() => {
    const olho = document.querySelector('.lp-hero .lp-eyebrow');
    if (olho) olho.textContent = 'Gestão da fábrica de blocos';

    const caminhante = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nos = [];
    while (caminhante.nextNode()) nos.push(caminhante.currentNode);
    for (const no of nos) {
      const texto = no.textContent;
      if (/^\s*Unidade\s+[\p{L} ]+?(\s*·\s*\p{Lu}{2})?\s*$/iu.test(texto)) no.textContent = 'Sistema de gestão';
      else if (/·\s*Unidade\s+\p{L}/iu.test(texto)) no.textContent = texto.replace(/\s*·\s*Unidade\s+[\p{L} ]+/iu, '');
      else if (/^\s*[\p{L} ]+\s+[—–-]\s+\p{Lu}{2}\s*$/u.test(texto)) {
        // "© 2026 INOVA BLOCOS · <cidade> — UF": some a cidade e o ponto que a separava.
        const anterior = no.parentElement?.previousElementSibling;
        if (anterior && anterior.textContent.trim() === '·') anterior.textContent = '';
        no.textContent = '';
      }
    }
  });
}

const inova = {
  url: () => process.env.INOVA_URL ?? 'https://inovablocos.duckdns.org/conheca',

  async preparar(g) {
    await abrir(g, this.url(), '#fila');
    await sanearInova(g);
    await carregarImagens(g);
    await esperar(1500);
  },

  async gravar(g) {
    // O topo já mostra a tela do painel, com o alerta de ruptura.
    await g.pausa(600);
    await g.fotografarCartaz();
    await g.pausa(1700);
    await g.rolarPara(await g.alvoDeRolagem('#fila .lp-fila-visual'), 2600);
    await g.pausa(3000);
    await g.rolarPara(await g.alvoDeRolagem('#perfis .lp-celular'), 1900);
    await g.pausa(2600);
  },
};

// ---------------------------------------------------------------------------
// QualiPT: o ambiente local de desenvolvimento, com os dados de demonstração
// que os roteiros de teste dele criam (as fotos das peças são ruído
// sintético). Só navega: painel, gráficos da análise, um registro não
// conforme e a não conformidade que ele abriu.

const qualipt = {
  exige: ['QUALIPT_URL', 'QUALIPT_LOGIN', 'QUALIPT_SENHA'],
  url: () => process.env.QUALIPT_URL.replace(/\/$/, ''),

  async preparar(g) {
    // Sem preferência salva, o app seguiria o idioma do Chrome sem janela.
    await g.pagina.evaluateOnNewDocument(() => {
      try { localStorage.setItem('qualipt.idioma', 'pt-BR'); } catch {}
    });
    await abrir(g, `${this.url()}/entrar`, '#login');
    await g.pagina.type('#login', process.env.QUALIPT_LOGIN);
    await g.pagina.type('#senha', process.env.QUALIPT_SENHA);
    await g.pagina.click('button[type=submit]');
    await g.pagina.waitForFunction(() => document.body.innerText.includes('Novo registro'), { timeout: 30000 });
    await abrir(g, `${this.url()}/painel`, 'canvas');
    // As barras do Chart.js crescem ao abrir; o vídeo começa com elas paradas.
    await esperar(2000);
    await g.posicionarCursor(LARGURA * 0.55, ALTURA * 0.62);
  },

  async gravar(g) {
    await g.pausa(1000);
    const evolucao = await g.achar('h2, h3', 'Evolução no período');
    await g.rolarPara(await g.alvoDeRolagem(evolucao, { alinhar: 'topo', folga: 120 }), 1200);
    await g.pausa(1000);

    await g.clicar('nav a[href="/analises"]');
    await g.aguardar(() => !!document.querySelector('a[href="/analises/graficos"]'));
    await g.pausa(450);
    await g.clicar('a[href="/analises/graficos"]');
    await g.aguardar(() => !!document.querySelector('select'));
    await g.pausa(400);

    // Filtros de visualização: escolher etapa e período não grava nada.
    const seletor = await g.achar('select');
    const etapa = await seletor.evaluate((s) => [...s.options].find((o) => o.textContent.includes('B10'))?.value ?? s.value);
    const { x, y } = await g.centroDe(seletor);
    await g.moverPara(x, y);
    await g.pausa(150);
    await g.pagina.select('select', etapa);
    await g.pausa(350);
    await g.clicar('button', '90 dias');
    await g.aguardar(() => document.querySelectorAll('canvas').length >= 2 && !document.querySelector('[aria-busy="true"]'));
    await g.pausa(1100);
    await g.fotografarCartaz();
    await g.pausa(500);
    await g.rolarPara(360, 1000);
    await g.pausa(700);

    // Um registro não conforme, e a não conformidade que ele abriu: é o
    // caminho que o supervisor faz.
    await g.clicar('nav a[href="/registros"]');
    await g.aguardar(() => !!document.querySelector('a[href^="/registros/"]'));
    await g.pausa(500);
    await g.clicar('a[href^="/registros/"]', 'Validada');
    await g.aguardar(() => !!document.querySelector('main a[href^="/ncs/"]'));
    await g.pausa(1100);
    await g.clicar('main a[href^="/ncs/"]');
    await g.aguardar(() => location.pathname.startsWith('/ncs/') && document.body.innerText.includes('Linha do tempo'));
    // O cursor sai de cima do texto que a tela nova pôs onde ele estava.
    await g.moverPara(LARGURA * 0.93, ALTURA * 0.55, 700);
    await g.pausa(800);
  },
};

// ---------------------------------------------------------------------------
// Orion: a página de apresentação, sem entrar. As telas são do próprio
// sistema, num servidor de demonstração com gente fictícia.

const orion = {
  url: () => process.env.ORION_URL ?? 'https://orionlive.duckdns.org',

  async preparar(g) {
    await abrir(g, this.url(), '#como-funciona');
    // O aviso de "pronto para funcionar offline" é do service worker, não da
    // página; ficaria parado no canto do vídeo inteiro.
    await g.pagina.addStyleTag({ content: '[role="status"].fixed { display: none !important; }' });
    await carregarImagens(g);
    await esperar(1500);
  },

  async gravar(g) {
    await g.pausa(1300);
    await g.rolarPara(await g.alvoDeRolagem('img[src*="heroi"]', { folga: 16 }), 1500);
    await g.pausa(400);
    await g.fotografarCartaz();
    await g.pausa(1500);
    const passos = await g.pagina.$$('#como-funciona figure');
    for (const [i, passo] of passos.entries()) {
      if (i === 1) continue;
      await g.rolarPara(await g.alvoDeRolagem(passo), 1500);
      await g.pausa(1300);
    }
    await g.rolarPara(await g.alvoDeRolagem('#celular figure'), 1700);
    await g.pausa(1900);
  },
};

// ---------------------------------------------------------------------------

const ROTEIROS = { 'minhas-senhas': minhasSenhas, inova, qualipt, orion };

const pedidos = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(ROTEIROS);
let falhou = false;

for (const id of pedidos) {
  const roteiro = ROTEIROS[id];
  if (!roteiro) {
    console.error(`[${id}] não existe; os roteiros são: ${Object.keys(ROTEIROS).join(', ')}`);
    falhou = true;
    continue;
  }
  const faltando = (roteiro.exige ?? []).filter((v) => !process.env[v]);
  if (faltando.length) {
    console.log(`[${id}] pulado: faltam ${faltando.join(', ')}`);
    continue;
  }

  const navegador = await abrirNavegador();
  try {
    const g = await Gravacao.nova(navegador, join(SAIDA, id), TERMOS);
    await roteiro.preparar(g);
    await g.conferirSigilo();
    const inicio = Date.now();
    await g.iniciar();
    await roteiro.gravar(g);
    const { duracao, quadros } = await g.parar();
    console.log(`[${id}] ${duracao.toFixed(1)} s de vídeo, ${quadros} quadros, em ${Math.round((Date.now() - inicio) / 1000)} s`);
  } catch (erro) {
    console.error(`[${id}] falhou: ${erro.stack ?? erro.message}`);
    falhou = true;
  } finally {
    await navegador.close();
  }
}

process.exit(falhou ? 1 : 0);
