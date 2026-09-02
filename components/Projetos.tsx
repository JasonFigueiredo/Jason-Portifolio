'use client';

import { useState } from 'react';
import { projetos, rotuloSituacao, type Projeto } from '@/data/projetos';
import { tecnologias } from '@/data/tecnologias';
import Janela from './Janela';
import Icone from './Icone';
import ModalProjeto from './ModalProjeto';
import styles from './Projetos.module.css';

const nomeDaTecnologia = new Map(tecnologias.map((t) => [t.id, t.nome]));

function Bloco({
  projeto,
  invertido,
  aoAbrir,
}: {
  projeto: Projeto;
  invertido: boolean;
  aoAbrir: () => void;
}) {
  const capa = projeto.imagens[0];

  return (
    <article className={`${styles.bloco} ${invertido ? styles.invertido : ''}`}>
      {/* O clique no card é atalho de mouse; quem usa teclado chega pelo botão do rodapé. */}
      <Janela className={styles.cartao}>
        <div className={styles.clicavel} onClick={aoAbrir}>
          {capa && (
            <div className={`${styles.capa} ${styles[capa.formato]}`}>
              <img src={capa.src} alt={capa.legenda} loading="lazy" />
              <span className={styles.lupa}>
                <Icone nome="externo" tamanho={15} />
                Ver detalhes
              </span>
            </div>
          )}

          <header className={styles.cabecalho}>
            <h3 className={styles.titulo}>{projeto.titulo}</h3>
            <span className={`${styles.situacao} ${styles[projeto.situacao]}`}>
              {rotuloSituacao[projeto.situacao]}
            </span>
          </header>

          <p className={styles.resumo}>{projeto.resumo}</p>

          <ul className={styles.tags}>
            {projeto.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <footer className={styles.rodape}>
          <button type="button" className={styles.detalhes} onClick={aoAbrir}>
            Ver detalhes
            <Icone nome="setaDireita" tamanho={14} />
          </button>
          {projeto.privado ? (
            <span className={styles.privado}>
              <Icone nome="cadeado" tamanho={14} />
              Código fechado
            </span>
          ) : (
            projeto.repo && (
              <a href={projeto.repo} target="_blank" rel="noreferrer" className={styles.repo}>
                <Icone nome="github" tamanho={14} />
                GitHub
              </a>
            )
          )}
        </footer>
      </Janela>

      <div className={styles.detalhe}>
        <p className={styles.descricao}>{projeto.descricao}</p>

        <ul className={styles.destaques}>
          {projeto.destaques.slice(0, 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <ul className={styles.pilha}>
          {projeto.tecnologias.map((id) => (
            <li key={id}>{nomeDaTecnologia.get(id) ?? id}</li>
          ))}
        </ul>

        {/* Projeto no ar: leva o visitante direto para o produto. */}
        {projeto.site && (
          <a
            href={projeto.site.url}
            target="_blank"
            rel="noreferrer"
            className={styles.acessar}
          >
            <span>{projeto.site.rotulo}</span>
            <Icone nome="externo" tamanho={16} />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projetos() {
  const [aberto, setAberto] = useState<Projeto | null>(null);

  return (
    <section id="projetos" className={styles.secao}>
      <header className={styles.tituloSecao}>
        <h2>Projetos</h2>
        <p>Clique em qualquer um para ver as telas e as decisões por trás.</p>
      </header>

      <div className={styles.lista}>
        {projetos.map((projeto, i) => (
          <Bloco
            key={projeto.id}
            projeto={projeto}
            invertido={i % 2 === 1}
            aoAbrir={() => setAberto(projeto)}
          />
        ))}
      </div>

      {aberto && <ModalProjeto projeto={aberto} aoFechar={() => setAberto(null)} />}
    </section>
  );
}
