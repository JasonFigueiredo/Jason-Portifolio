import type { Arquitetura, Caixa, Ligacao } from '@/data/projetos';
import styles from './Diagrama.module.css';

// O diagrama é desenhado aqui, não importado como imagem: um SVG dentro de <img>
// não enxerga os tokens de tema, e o diagrama quebraria no tema claro.
// A geometria é de grade — os dados dizem só a coluna e a linha de cada caixa.

const COLUNA = 240;
const LINHA = 110;
const LARGURA = 164;
const ALTURA = 58;
const MARGEM = 16;

type Pontos = { x: number; y: number; cx: number; cy: number; dir: number; base: number };

function pontos(c: Caixa): Pontos {
  const x = MARGEM + c.coluna * COLUNA;
  const y = MARGEM + c.linha * LINHA;
  return { x, y, cx: x + LARGURA / 2, cy: y + ALTURA / 2, dir: x + LARGURA, base: y + ALTURA };
}

type Rotulo = { x: number; y: number; ancora: 'middle' | 'start' };

/** Caminho em ângulo reto entre duas caixas e onde o rótulo fica. */
function tracar(de: Pontos, para: Pontos, ligacao: Ligacao): { d: string; rotulo: Rotulo } {
  // Mesma linha: reto na horizontal, rótulo em cima.
  if (de.cy === para.cy) {
    const [x1, x2] = de.cx < para.cx ? [de.dir, para.x] : [de.x, para.dir];
    return { d: `M${x1} ${de.cy}H${x2}`, rotulo: { x: (x1 + x2) / 2, y: de.cy - 8, ancora: 'middle' } };
  }

  // Mesma coluna: reto na vertical, rótulo ao lado.
  if (de.cx === para.cx) {
    const [y1, y2] = de.cy < para.cy ? [de.base, para.y] : [de.y, para.base];
    return { d: `M${de.cx} ${y1}V${y2}`, rotulo: { x: de.cx + 8, y: (y1 + y2) / 2 + 4, ancora: 'start' } };
  }

  if (ligacao.rota === 'hv') {
    const x1 = de.cx < para.cx ? de.dir : de.x;
    const y2 = de.cy < para.cy ? para.y : para.base;
    return {
      d: `M${x1} ${de.cy}H${para.cx}V${y2}`,
      rotulo: { x: (x1 + para.cx) / 2, y: de.cy - 8, ancora: 'middle' },
    };
  }

  const y1 = de.cy < para.cy ? de.base : de.y;
  const x2 = de.cx < para.cx ? para.x : para.dir;
  return {
    d: `M${de.cx} ${y1}V${para.cy}H${x2}`,
    rotulo: { x: (de.cx + x2) / 2, y: para.cy - 8, ancora: 'middle' },
  };
}

export default function Diagrama({ id, arquitetura }: { id: string; arquitetura: Arquitetura }) {
  const { caixas, ligacoes, legenda } = arquitetura;
  const porId = new Map(caixas.map((c) => [c.id, pontos(c)]));
  const colunas = Math.max(...caixas.map((c) => c.coluna)) + 1;
  const linhas = Math.max(...caixas.map((c) => c.linha)) + 1;
  const largura = MARGEM * 2 + (colunas - 1) * COLUNA + LARGURA;
  const altura = MARGEM * 2 + (linhas - 1) * LINHA + ALTURA;
  const seta = `seta-${id}`;

  const descricao = caixas.map((c) => `${c.titulo} (${c.nota})`).join(', ');

  return (
    <figure className={styles.figura}>
      <div className={styles.rolagem}>
        <svg
          viewBox={`0 0 ${largura} ${altura}`}
          className={styles.svg}
          style={{ minWidth: Math.min(largura, 640) }}
          role="img"
          aria-label={`Arquitetura: ${descricao}. ${legenda}.`}
        >
          <defs>
            <marker
              id={seta}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path className={styles.ponta} d="M0 0L10 5L0 10z" />
            </marker>
          </defs>

          {ligacoes.map((l) => {
            const de = porId.get(l.de);
            const para = porId.get(l.para);
            if (!de || !para) return null;
            const { d, rotulo } = tracar(de, para, l);
            return (
              <g key={`${l.de}-${l.para}`}>
                <path
                  d={d}
                  className={`${styles.ligacao} ${l.tracejada ? styles.tracejada : ''}`}
                  markerEnd={`url(#${seta})`}
                  markerStart={l.dupla ? `url(#${seta})` : undefined}
                />
                {l.rotulo && (
                  <text x={rotulo.x} y={rotulo.y} textAnchor={rotulo.ancora} className={styles.rotulo}>
                    {l.rotulo}
                  </text>
                )}
              </g>
            );
          })}

          {caixas.map((c) => {
            const p = porId.get(c.id)!;
            return (
              <g key={c.id}>
                <rect
                  x={p.x}
                  y={p.y}
                  width={LARGURA}
                  height={ALTURA}
                  rx={8}
                  className={`${styles.caixa} ${c.forte ? styles.forte : ''}`}
                />
                <text x={p.x + 14} y={p.y + 25} className={styles.titulo}>
                  {c.titulo}
                </text>
                <text x={p.x + 14} y={p.y + 43} className={styles.nota}>
                  {c.nota}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className={styles.legenda}>
        {legenda}
        <span className={styles.dica}> · Arraste para o lado para ver o diagrama inteiro.</span>
      </figcaption>
    </figure>
  );
}
