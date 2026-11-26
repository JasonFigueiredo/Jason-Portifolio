'use client';

import { useEffect, useRef } from 'react';
import styles from './CenaRede.module.css';

// O cubo da abertura: uma rede de 27 nós em grade 3 × 3 × 3, com pacotes de
// dados correndo pelas arestas. É a "estrutura" e a "integração" do manual em
// movimento, desenhada em canvas, sem biblioteca 3D: são poucas dezenas de
// pontos, e a projeção cabe em meia dúzia de multiplicações.
//
// As cores saem dos tokens do tema, lidos do CSS, e são relidas quando o tema
// muda. A animação para quando o cubo sai da tela ou a aba fica escondida, e
// quem pediu menos movimento recebe um quadro parado.

type V3 = [number, number, number];
type Pacote = { de: number; para: number; t: number; v: number };
type Rgb = [number, number, number];

const PASSOS = [-1, 0, 1];
const nos: V3[] = [];
for (const x of PASSOS) for (const y of PASSOS) for (const z of PASSOS) nos.push([x, y, z]);

const indice = (x: number, y: number, z: number) => (x + 1) * 9 + (y + 1) * 3 + (z + 1);

// Aresta entre vizinhos de grade: diferem em uma coordenada, por um passo.
const arestas: [number, number][] = [];
const vizinhos: number[][] = nos.map(() => []);
nos.forEach(([x, y, z], i) => {
  for (const [dx, dy, dz] of [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]) {
    const [nx, ny, nz] = [x + dx, y + dy, z + dz];
    if (nx > 1 || ny > 1 || nz > 1) continue;
    const j = indice(nx, ny, nz);
    arestas.push([i, j]);
    vizinhos[i].push(j);
    vizinhos[j].push(i);
  }
});

// O núcleo: um cubo pequeno que gira ao contrário, no centro.
const NUCLEO: V3[] = [];
for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) NUCLEO.push([x * 0.32, y * 0.32, z * 0.32]);
const arestasNucleo: [number, number][] = [];
NUCLEO.forEach((a, i) =>
  NUCLEO.forEach((b, j) => {
    const diferentes = a.filter((v, k) => v !== b[k]).length;
    if (j > i && diferentes === 1) arestasNucleo.push([i, j]);
  }),
);

// O halo: pontos espalhados por igual numa esfera (espiral de Fibonacci).
const PONTOS_DO_HALO = 84;
const HALO: V3[] = Array.from({ length: PONTOS_DO_HALO }, (_, i) => {
  const y = 1 - (i / (PONTOS_DO_HALO - 1)) * 2;
  const raio = Math.sqrt(1 - y * y);
  const angulo = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(angulo) * raio * 2.15, y * 2.15, Math.sin(angulo) * raio * 2.15];
});

function hexParaRgb(hex: string): Rgb {
  const h = hex.replace('#', '').trim();
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const rgba = ([r, g, b]: Rgb, a: number) => `rgba(${r},${g},${b},${a.toFixed(3)})`;

function girar([x, y, z]: V3, ax: number, ay: number): V3 {
  // em torno do eixo Y, depois do X
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cx = Math.cos(ax);
  const sx = Math.sin(ax);
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
}

function novoPacote(): Pacote {
  const [de, para] = arestas[Math.floor(Math.random() * arestas.length)];
  return Math.random() < 0.5
    ? { de, para, t: Math.random(), v: 0.55 + Math.random() * 0.6 }
    : { de: para, para: de, t: Math.random(), v: 0.55 + Math.random() * 0.6 };
}

export default function CenaRede({ className }: { className?: string }) {
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = tela.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const raiz = document.documentElement;

    let largura = 0;
    let altura = 0;
    let dpr = 1;
    let marca: Rgb = [40, 120, 240];
    let marca2: Rgb = [53, 197, 217];
    let claro = false;
    let brilho: HTMLCanvasElement | null = null;

    // A luz de cada nó é um sprite desenhado uma vez: gradiente radial por nó
    // a cada quadro custaria caro à toa.
    function montarBrilho() {
      const s = document.createElement('canvas');
      s.width = s.height = 64;
      const c = s.getContext('2d')!;
      const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, rgba(claro ? marca : [255, 255, 255], 1));
      g.addColorStop(0.18, rgba(marca2, claro ? 0.9 : 0.95));
      g.addColorStop(0.45, rgba(marca, claro ? 0.25 : 0.35));
      g.addColorStop(1, rgba(marca, 0));
      c.fillStyle = g;
      c.fillRect(0, 0, 64, 64);
      brilho = s;
    }

    function lerCores() {
      const estilo = getComputedStyle(raiz);
      marca = hexParaRgb(estilo.getPropertyValue('--marca') || '#2878f0');
      marca2 = hexParaRgb(estilo.getPropertyValue('--marca-2') || '#35c5d9');
      claro = raiz.dataset.theme === 'light';
      montarBrilho();
    }

    function medir() {
      const caixa = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = caixa.width;
      altura = caixa.height;
      canvas!.width = Math.round(largura * dpr);
      canvas!.height = Math.round(altura * dpr);
    }

    lerCores();
    medir();

    // --- estado da cena ---
    let ax = -0.5;
    let ay = 0.6;
    let alvoX = -0.5;
    let alvoY = 0.6;
    let giro = 0;
    let rolagem = 0;
    let rajada = 1;
    const pacotes: Pacote[] = Array.from({ length: 16 }, novoPacote);

    function projetar(p: V3, escala: number): [number, number, number] {
      const DISTANCIA = 5.2;
      const k = DISTANCIA / (DISTANCIA - p[2]);
      return [largura / 2 + p[0] * escala * k, altura / 2 + p[1] * escala * k, k];
    }

    function desenhar(dt: number) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, largura, altura);
      ctx!.globalCompositeOperation = claro ? 'source-over' : 'lighter';
      ctx!.lineCap = 'round';

      const escala = Math.min(largura, altura) * 0.25;
      const rx = ax;
      const ry = ay + giro + rolagem;

      // Halo, ao fundo, girando devagar no sentido contrário.
      for (const p of HALO) {
        const g = girar(p, rx * 0.6, -ry * 0.35);
        const [x, y, k] = projetar(g, escala);
        const prof = (g[2] + 2.2) / 4.4;
        ctx!.fillStyle = rgba(marca2, (claro ? 0.22 : 0.18) + prof * 0.3);
        ctx!.beginPath();
        ctx!.arc(x, y, 0.6 + k * 0.7, 0, Math.PI * 2);
        ctx!.fill();
      }

      const girados = nos.map((p) => girar(p, rx, ry));
      const projetados = girados.map((p) => projetar(p, escala));
      const profundidade = (z: number) => (z + 1.8) / 3.6; // 0 no fundo, 1 na frente

      // Arestas: as da frente mais fortes, as do fundo quase sumindo.
      for (const [a, b] of arestas) {
        const prof = profundidade((girados[a][2] + girados[b][2]) / 2);
        ctx!.strokeStyle = rgba(prof > 0.55 ? marca2 : marca, (claro ? 0.14 : 0.08) + prof * (claro ? 0.5 : 0.55));
        ctx!.lineWidth = 0.6 + prof * 1.1;
        ctx!.beginPath();
        ctx!.moveTo(projetados[a][0], projetados[a][1]);
        ctx!.lineTo(projetados[b][0], projetados[b][1]);
        ctx!.stroke();
      }

      // Núcleo.
      const nucleo = NUCLEO.map((p) => projetar(girar(p, -rx * 1.3, -ry * 1.6), escala));
      ctx!.strokeStyle = rgba(marca2, claro ? 0.55 : 0.6);
      ctx!.lineWidth = 1.2;
      for (const [a, b] of arestasNucleo) {
        ctx!.beginPath();
        ctx!.moveTo(nucleo[a][0], nucleo[a][1]);
        ctx!.lineTo(nucleo[b][0], nucleo[b][1]);
        ctx!.stroke();
      }

      // Pacotes: andam pela aresta e, no fim, seguem para um vizinho que não
      // seja o de onde vieram — um passeio pela rede, nunca um vaivém.
      for (const p of pacotes) {
        p.t += p.v * dt * rajada;
        if (p.t >= 1) {
          const opcoes = vizinhos[p.para].filter((n) => n !== p.de);
          const proximo = opcoes[Math.floor(Math.random() * opcoes.length)];
          p.de = p.para;
          p.para = proximo;
          p.t = 0;
        }
        const [x1, y1] = projetados[p.de];
        const [x2, y2] = projetados[p.para];
        const cauda = Math.max(0, p.t - 0.35);
        const x = x1 + (x2 - x1) * p.t;
        const y = y1 + (y2 - y1) * p.t;
        const gradiente = ctx!.createLinearGradient(x1 + (x2 - x1) * cauda, y1 + (y2 - y1) * cauda, x, y);
        gradiente.addColorStop(0, rgba(marca2, 0));
        gradiente.addColorStop(1, rgba(marca2, claro ? 0.9 : 1));
        ctx!.strokeStyle = gradiente;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(x1 + (x2 - x1) * cauda, y1 + (y2 - y1) * cauda);
        ctx!.lineTo(x, y);
        ctx!.stroke();
        if (brilho) ctx!.drawImage(brilho, x - 7, y - 7, 14, 14);
      }

      // Nós, de trás para frente, para a frente cobrir o fundo.
      const ordem = girados.map((p, i) => [p[2], i] as const).sort((a, b) => a[0] - b[0]);
      for (const [z, i] of ordem) {
        const prof = profundidade(z);
        const [x, y, k] = projetados[i];
        const r = (2.2 + prof * 4.2) * k;
        ctx!.globalAlpha = 0.35 + prof * 0.65;
        if (brilho) ctx!.drawImage(brilho, x - r * 2, y - r * 2, r * 4, r * 4);
        ctx!.globalAlpha = 1;
      }
    }

    // --- interação ---
    const aoMover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const caixa = canvas.getBoundingClientRect();
      const nx = ((e.clientX - (caixa.left + caixa.width / 2)) / window.innerWidth) * 2;
      const ny = ((e.clientY - (caixa.top + caixa.height / 2)) / window.innerHeight) * 2;
      alvoY = 0.6 + nx * 0.7;
      alvoX = -0.5 + ny * 0.45;
    };
    const aoRolar = () => {
      rolagem = window.scrollY * 0.0018;
    };
    // Um clique no cubo manda uma rajada de pacotes saindo do centro.
    const aoClicar = () => {
      const centro = indice(0, 0, 0);
      for (const para of vizinhos[centro]) pacotes.push({ de: centro, para, t: 0, v: 1.4 });
      if (pacotes.length > 44) pacotes.splice(0, pacotes.length - 44);
      rajada = 2.6;
    };

    // --- ciclo ---
    let quadro = 0;
    let anterior = 0;
    let visivel = true;

    function ciclo(agora: number) {
      const dt = Math.min((agora - anterior) / 1000, 0.05);
      anterior = agora;
      giro += dt * 0.16;
      ax += (alvoX - ax) * Math.min(dt * 2.5, 1);
      ay += (alvoY - ay) * Math.min(dt * 2.5, 1);
      rajada += (1 - rajada) * Math.min(dt * 1.2, 1);
      desenhar(dt);
      quadro = requestAnimationFrame(ciclo);
    }

    function iniciar() {
      if (reduzir || quadro || !visivel || document.hidden) return;
      anterior = performance.now();
      quadro = requestAnimationFrame(ciclo);
    }

    function parar() {
      cancelAnimationFrame(quadro);
      quadro = 0;
    }

    const aoRedimensionar = new ResizeObserver(() => {
      medir();
      if (reduzir) desenhar(0);
    });
    aoRedimensionar.observe(canvas);

    const naTela = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) iniciar();
      else parar();
    });
    naTela.observe(canvas);

    const aoTrocarAba = () => (document.hidden ? parar() : iniciar());
    document.addEventListener('visibilitychange', aoTrocarAba);

    const aoTrocarTema = new MutationObserver(() => {
      lerCores();
      if (reduzir) desenhar(0);
    });
    aoTrocarTema.observe(raiz, { attributes: true, attributeFilter: ['data-theme'] });

    if (reduzir) {
      desenhar(0);
    } else {
      window.addEventListener('pointermove', aoMover, { passive: true });
      window.addEventListener('scroll', aoRolar, { passive: true });
      canvas.addEventListener('pointerdown', aoClicar);
      iniciar();
    }

    return () => {
      parar();
      aoRedimensionar.disconnect();
      naTela.disconnect();
      aoTrocarTema.disconnect();
      document.removeEventListener('visibilitychange', aoTrocarAba);
      window.removeEventListener('pointermove', aoMover);
      window.removeEventListener('scroll', aoRolar);
      canvas.removeEventListener('pointerdown', aoClicar);
    };
  }, []);

  return <canvas ref={tela} className={`${styles.tela} ${className ?? ''}`} aria-hidden />;
}
