'use client';

import { useEffect, useRef, useState } from 'react';
import { formatar, type Idioma } from '@/data/idioma';
import styles from './Contador.module.css';

// Um número que conta do zero até o valor quando entra na tela.
//
// O servidor já entrega o valor final: sem JavaScript, ou para quem pediu menos
// movimento, o número certo está lá desde o começo. Só o que está abaixo da
// dobra volta a zero para contar — o que já está à vista não pisca.

export default function Contador({ valor, idioma }: { valor: number; idioma: Idioma }) {
  const [mostrado, setMostrado] = useState(valor);
  const elemento = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elemento.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setMostrado(0);
    let quadro = 0;
    const observador = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observador.disconnect();
      const inicio = performance.now();
      const DURACAO = 1600;
      const passo = (agora: number) => {
        const p = Math.min((agora - inicio) / DURACAO, 1);
        // desacelera no fim, como um contador mecânico parando
        const suave = 1 - Math.pow(2, -10 * p);
        setMostrado(Math.round(valor * (p === 1 ? 1 : suave)));
        if (p < 1) quadro = requestAnimationFrame(passo);
      };
      quadro = requestAnimationFrame(passo);
    });
    observador.observe(el);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor]);

  // O leitor de tela lê o valor final, num texto que a tela não mostra; a
  // contagem animada fica escondida dele (anunciar 0, 12, 87… seria ruído).
  // aria-label num <span> não vale: span não tem papel que aceite rótulo.
  return (
    <span ref={elemento}>
      <span className={styles.paraLeitor}>{formatar(valor, idioma)}</span>
      <span aria-hidden>{formatar(mostrado, idioma)}</span>
    </span>
  );
}
