'use client';

import { useEffect, useRef } from 'react';
import { rotuloSituacao, type Projeto } from '@/data/projetos';
import Icone from './Icone';
import styles from './ModalProjeto.module.css';

export default function ModalProjeto({
  projeto,
  aoFechar,
}: {
  projeto: Projeto;
  aoFechar: () => void;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);

  // showModal() dá de graça o que daria trabalho reimplementar:
  // Esc para fechar, foco preso dentro e o resto da página inerte.
  useEffect(() => {
    dialogo.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <dialog
      ref={dialogo}
      className={styles.dialogo}
      onClose={aoFechar}
      // Clique fora do conteúdo cai no próprio <dialog>, e só aí fecha.
      onClick={(e) => {
        if (e.target === dialogo.current) dialogo.current?.close();
      }}
      aria-labelledby="titulo-projeto"
    >
      <article className={styles.conteudo}>
        <header className={styles.cabecalho}>
          <div className={styles.identidade}>
            <div className={styles.linhaTitulo}>
              <h2 id="titulo-projeto">{projeto.titulo}</h2>
              <span className={`${styles.situacao} ${styles[projeto.situacao]}`}>
                {rotuloSituacao[projeto.situacao]}
              </span>
            </div>
            <p className={styles.resumo}>{projeto.resumo}</p>
          </div>

          <button
            type="button"
            className={styles.fechar}
            onClick={() => dialogo.current?.close()}
            aria-label="Fechar"
          >
            <Icone nome="fechar" tamanho={18} />
          </button>
        </header>

        <div className={styles.corpo}>
          <div className={styles.galeria}>
            {projeto.imagens.map((img) => (
              <figure key={img.src} className={styles[img.formato]}>
                <img src={img.src} alt={img.legenda} loading="lazy" />
                <figcaption>{img.legenda}</figcaption>
              </figure>
            ))}
          </div>

          <section className={styles.secao}>
            <h3>Como funciona</h3>
            <p>{projeto.comoFunciona}</p>
          </section>

          <section className={styles.secao}>
            <h3>O que a define</h3>
            <ul className={styles.tracos}>
              {projeto.personalidade.map(({ rotulo, nota }) => (
                <li key={rotulo}>
                  <strong>{rotulo}</strong>
                  <span>{nota}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.secao}>
            <h3>O que foi construído</h3>
            <ul className={styles.itens}>
              {projeto.destaques.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {projeto.stack && (
            <section className={styles.secao}>
              <h3>Stack</h3>
              <dl className={styles.stack}>
                {projeto.stack.map(({ camada, ferramenta }) => (
                  <div key={camada}>
                    <dt>{camada}</dt>
                    <dd>{ferramenta}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>

        <footer className={styles.rodape}>
          <span>{projeto.periodo}</span>

          <div className={styles.acoesRodape}>
            {projeto.site && (
              <a
                href={projeto.site.url}
                target="_blank"
                rel="noreferrer"
                className={styles.acessar}
              >
                {projeto.site.rotulo}
                <Icone nome="externo" tamanho={14} />
              </a>
            )}
            {projeto.privado ? (
              <span className={styles.privado}>
                <Icone nome="cadeado" tamanho={14} />
                Código fechado
              </span>
            ) : (
              projeto.repo && (
                <a href={projeto.repo} target="_blank" rel="noreferrer" className={styles.repo}>
                  <Icone nome="github" tamanho={15} />
                  Ver no GitHub
                </a>
              )
            )}
          </div>
        </footer>
      </article>
    </dialog>
  );
}
