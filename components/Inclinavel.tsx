'use client';

import { useEffect, useRef } from 'react';
import styles from './Inclinavel.module.css';

// A tela do produto inclina na direção do mouse, como um objeto na mão, e um
// reflexo corre pela superfície. Só com mouse e só para quem não pediu menos
// movimento: no toque, o primeiro toque já é para abrir.

export default function Inclinavel({ children, className }: { children: React.ReactNode; className?: string }) {
  const caixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const pode =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!pode) return;

    let quadro = 0;
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        el.style.setProperty('--ry', `${(nx * 7).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-ny * 5).toFixed(2)}deg`);
        el.style.setProperty('--lx', `${((nx + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty('--ly', `${((ny + 0.5) * 100).toFixed(1)}%`);
        el.dataset.inclinado = '';
      });
    };
    const sair = () => {
      cancelAnimationFrame(quadro);
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
      delete el.dataset.inclinado;
    };
    el.addEventListener('pointermove', mover);
    el.addEventListener('pointerleave', sair);
    return () => {
      cancelAnimationFrame(quadro);
      el.removeEventListener('pointermove', mover);
      el.removeEventListener('pointerleave', sair);
    };
  }, []);

  return (
    <div ref={caixa} className={`${styles.cena} ${className ?? ''}`}>
      <div className={styles.objeto}>
        {children}
        <span className={styles.reflexo} aria-hidden />
      </div>
    </div>
  );
}
