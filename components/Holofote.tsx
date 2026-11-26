'use client';

import { createElement } from 'react';

// Embrulha um cartão e passa a posição do mouse para o CSS (--hx, --hy). O
// brilho que segue o cursor é desenhado pelo CSS do próprio cartão; aqui só se
// mede. Sem estado: nada re-renderiza enquanto o mouse anda.

type Props = {
  elemento?: 'div' | 'li' | 'article';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  [dado: `data-${string}`]: string | undefined;
};

export default function Holofote({ elemento = 'div', className, style, children, ...resto }: Props) {
  function mover(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse') return;
    const caixa = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--hx', `${e.clientX - caixa.left}px`);
    e.currentTarget.style.setProperty('--hy', `${e.clientY - caixa.top}px`);
  }

  return createElement(elemento, { className, style, onPointerMove: mover, ...resto }, children);
}
