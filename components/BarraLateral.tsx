'use client';

import { useEffect, useState } from 'react';
import Icone, { type NomeIcone } from './Icone';
import BotaoTema from './BotaoTema';
import styles from './BarraLateral.module.css';

// Só seções que existem de verdade. No site antigo eram oito ícones,
// e sete apontavam para âncoras inexistentes.
const secoes: { id: string; rotulo: string; icone: NomeIcone }[] = [
  { id: 'inicio', rotulo: 'Início', icone: 'casa' },
  { id: 'projetos', rotulo: 'Projetos', icone: 'maleta' },
  { id: 'tecnologias', rotulo: 'Tecnologias', icone: 'codigo' },
  { id: 'contato', rotulo: 'Contato', icone: 'email' },
];

export default function BarraLateral() {
  const [ativa, setAtiva] = useState('inicio');
  const [aberta, setAberta] = useState(false);

  // Marca a seção visível. O observador avisa sozinho quando ela muda,
  // em vez de recalcular posições a cada pixel de rolagem.
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visivel) setAtiva(visivel.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    secoes.forEach(({ id }) => {
      const alvo = document.getElementById(id);
      if (alvo) observador.observe(alvo);
    });

    return () => observador.disconnect();
  }, []);

  // No celular o menu cobre a tela; travar a rolagem do fundo evita
  // aquele efeito de duas camadas deslizando juntas.
  useEffect(() => {
    document.body.style.overflow = aberta ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberta]);

  return (
    <>
      {/* Topo do celular: abrir menu e trocar tema. */}
      <div className={styles.topoMovel}>
        <button
          type="button"
          className={styles.botaoMenu}
          onClick={() => setAberta((v) => !v)}
          aria-label={aberta ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberta}
        >
          <Icone nome={aberta ? 'fechar' : 'menu'} tamanho={20} />
        </button>
        <BotaoTema />
      </div>

      {aberta && <div className={styles.fundo} onClick={() => setAberta(false)} />}

      <nav className={`${styles.barra} ${aberta ? styles.aberta : ''}`} aria-label="Navegação principal">
        <BotaoTema className={styles.temaLateral} />
        <ul className={styles.menu}>
          {secoes.map(({ id, rotulo, icone }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`${styles.link} ${ativa === id ? styles.ativo : ''}`}
                onClick={() => setAberta(false)}
                aria-current={ativa === id ? 'true' : undefined}
              >
                <Icone nome={icone} tamanho={18} />
                <span className={styles.rotulo}>{rotulo}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
