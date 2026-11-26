'use client';

import { useEffect } from 'react';

// Faz os blocos marcados com data-revelar entrarem ao rolar.
//
// Quem esconde é este componente, depois de carregar, e só o que ainda está
// abaixo da dobra: sem JavaScript tudo aparece de saída, e o que já está na
// tela não pisca. Quem pediu menos movimento não vê nada sumir.
// O estilo dos dois estados mora em globals.css.

export default function Revelacoes() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          (entrada.target as HTMLElement).dataset.revelar = 'visivel';
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    const dobra = window.innerHeight * 0.95;
    document.querySelectorAll<HTMLElement>('[data-revelar]').forEach((el) => {
      if (el.getBoundingClientRect().top < dobra) return;
      el.dataset.revelar = 'oculto';
      observador.observe(el);
    });

    return () => observador.disconnect();
  }, []);

  return null;
}
