'use client';

import { useEffect, useRef } from 'react';
import styles from './FundoVivo.module.css';

// O fundo da página inteira, atrás de tudo: a grade, dois brilhos que derivam
// devagar, sinais de código flutuando e uma luz que segue o mouse.
//
// Os sinais têm posição fixa, escrita aqui, e não sorteada: sorteio no
// servidor e outro no navegador dariam dois fundos diferentes na hidratação.
// O movimento é todo em CSS; o JavaScript só move a luz do mouse.

const sinais = [
  { s: '{', x: 5, y: 16, t: 2.8, d: 19, a: 0 },
  { s: '}', x: 93, y: 24, t: 3.2, d: 23, a: -4 },
  { s: '</>', x: 12, y: 74, t: 1.4, d: 26, a: -8 },
  { s: '[ ]', x: 85, y: 66, t: 1.6, d: 21, a: -2 },
  { s: '=>', x: 47, y: 90, t: 1.3, d: 24, a: -11 },
  { s: ';', x: 72, y: 10, t: 2.4, d: 18, a: -6 },
  { s: '{ }', x: 30, y: 38, t: 1.2, d: 28, a: -14 },
  { s: '0 1', x: 63, y: 48, t: 1.1, d: 22, a: -3 },
  { s: '//', x: 3, y: 48, t: 1.6, d: 25, a: -9 },
  { s: '()', x: 96, y: 88, t: 1.8, d: 20, a: -12 },
  { s: '"id":', x: 40, y: 8, t: 1.1, d: 27, a: -5 },
  { s: '&&', x: 22, y: 94, t: 1.3, d: 23, a: -16 },
];

export default function FundoVivo() {
  const luz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Só com mouse de verdade: no toque, a luz pularia de dedo em dedo.
    const fino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alvo = luz.current;
    if (!fino || reduzir || !alvo) return;

    let quadro = 0;
    let x = 0;
    let y = 0;
    const mover = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      // Um repinte por quadro, não um por evento: o mouse dispara bem mais
      // eventos do que a tela consegue mostrar.
      if (quadro) return;
      quadro = requestAnimationFrame(() => {
        alvo.style.setProperty('--px', `${x}px`);
        alvo.style.setProperty('--py', `${y}px`);
        alvo.dataset.ativa = '';
        quadro = 0;
      });
    };
    window.addEventListener('pointermove', mover, { passive: true });
    return () => {
      window.removeEventListener('pointermove', mover);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <div className={styles.fundo} aria-hidden>
      <div className={styles.grade} />
      <div className={`${styles.aurora} ${styles.azul}`} />
      <div className={`${styles.aurora} ${styles.ciano}`} />
      <div className={styles.sinais}>
        {sinais.map(({ s, x, y, t, d, a }) => (
          <span
            key={`${s}-${x}`}
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                fontSize: `${t}rem`,
                animationDuration: `${d}s`,
                animationDelay: `${a}s`,
              } as React.CSSProperties
            }
          >
            {s}
          </span>
        ))}
      </div>
      <div ref={luz} className={styles.luz} />
    </div>
  );
}
