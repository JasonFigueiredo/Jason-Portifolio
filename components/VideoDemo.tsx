'use client';

import { useEffect, useRef, useState } from 'react';
import type { Demo } from '@/data/projetos';
import type { Idioma } from '@/data/idioma';
import { textos } from '@/data/textos';
import Icone from './Icone';
import styles from './VideoDemo.module.css';

// A gravação real do sistema. Toca sem som, em laço, só enquanto está à vista:
// fora da tela não gasta bateria nem banda. O vídeo só começa a baixar quando
// chega perto — até lá, fica o pôster.
//
// Vídeo que se move sozinho por mais de cinco segundos precisa de um jeito de
// parar (WCAG 2.2.2): o botão no canto. Quem pediu menos movimento recebe o
// pôster parado e decide se quer tocar.

export default function VideoDemo({ demo, rotulo, idioma }: { demo: Demo; rotulo: string; idioma: Idioma }) {
  const video = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const pausadoPorQuem = useRef<'pessoa' | null>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzir) pausadoPorQuem.current = 'pessoa';

    const observador = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && pausadoPorQuem.current !== 'pessoa') {
          v.play().catch(() => setTocando(false));
        } else if (!e.isIntersecting) {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    observador.observe(v);
    return () => observador.disconnect();
  }, []);

  function alternar() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      pausadoPorQuem.current = null;
      v.play().catch(() => setTocando(false));
    } else {
      pausadoPorQuem.current = 'pessoa';
      v.pause();
    }
  }

  return (
    <div className={styles.demo}>
      <video
        ref={video}
        className={styles.video}
        poster={demo.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={rotulo}
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
      >
        <source src={demo.webm} type="video/webm" />
        <source src={demo.mp4} type="video/mp4" />
      </video>
      <span className={styles.selo}>
        <span className={styles.ponto} data-tocando={tocando || undefined} />
        <span className={styles.texto}>{textos.produtos.demo[idioma]}</span>
      </span>
      <button
        type="button"
        className={styles.controle}
        onClick={alternar}
        aria-label={tocando ? textos.produtos.pausar[idioma] : textos.produtos.tocar[idioma]}
      >
        <Icone nome={tocando ? 'pausa' : 'play'} tamanho={16} />
      </button>
    </div>
  );
}
