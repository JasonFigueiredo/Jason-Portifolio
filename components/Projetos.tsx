import Link from 'next/link';
import { projetos, rotuloSituacao, type Projeto } from '@/data/projetos';
import { tecnologias } from '@/data/tecnologias';
import Janela from './Janela';
import Icone from './Icone';
import styles from './Projetos.module.css';

const nomeDaTecnologia = new Map(tecnologias.map((t) => [t.id, t.nome]));

function pilha(projeto: Projeto) {
  return projeto.tecnologias.map((id) => nomeDaTecnologia.get(id) ?? id).join(' · ');
}

// Vitrine: tela de um lado, provas do outro — sempre do mesmo lado.
// O zigue-zague antigo obrigava o olho a trocar de coluna a cada projeto.
function Destaque({ projeto }: { projeto: Projeto }) {
  const capa = projeto.imagens[0];
  const endereco = `/projetos/${projeto.id}`;

  return (
    <article className={styles.destaque}>
      {/* A imagem é atalho de mouse; quem usa teclado chega pelo título e pelo botão. */}
      <Link href={endereco} className={styles.capa} tabIndex={-1} aria-hidden>
        {/* O cartaz já desenha as próprias janelas: vai sem a moldura. */}
        {capa?.formato === 'cartaz' ? (
          <div className={styles.cartaz}>
            <img src={capa.src} alt="" loading="lazy" />
          </div>
        ) : (
          <Janela>
            {capa && (
              <div className={`${styles.moldura} ${styles[capa.formato]}`}>
                <img src={capa.src} alt="" loading="lazy" />
              </div>
            )}
          </Janela>
        )}
      </Link>

      <div className={styles.texto}>
        <p className={styles.olho}>
          <span className={`${styles.situacao} ${styles[projeto.situacao]}`}>
            {rotuloSituacao[projeto.situacao]}
          </span>
          {projeto.periodo}
        </p>

        <h3 className={styles.titulo}>
          <Link href={endereco}>{projeto.titulo}</Link>
        </h3>
        <p className={styles.resumo}>{projeto.resumo}</p>

        <dl className={styles.provas}>
          {projeto.provas.slice(0, 3).map(({ valor, rotulo }) => (
            <div key={rotulo}>
              <dt>{valor}</dt>
              <dd>{rotulo}</dd>
            </div>
          ))}
        </dl>

        <p className={styles.decisao}>
          <span>Decisão-chave{projeto.decisaoChave.adr && ` · ${projeto.decisaoChave.adr}`}</span>
          {projeto.decisaoChave.texto}
        </p>

        <p className={styles.pilha}>{pilha(projeto)}</p>

        <div className={styles.acoes}>
          <Link href={endereco} className={styles.primario}>
            Ler estudo de caso
            <Icone nome="setaDireita" tamanho={15} />
          </Link>
          {projeto.site && (
            <a href={projeto.site.url} target="_blank" rel="noreferrer" className={styles.secundario}>
              {projeto.site.rotulo}
              <Icone nome="externo" tamanho={15} />
            </a>
          )}
          {!projeto.site && projeto.repo && (
            <a href={projeto.repo} target="_blank" rel="noreferrer" className={styles.secundario}>
              <Icone nome="github" tamanho={15} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projetos() {
  const destaques = projetos.filter((p) => p.destaque);
  const outros = projetos.filter((p) => !p.destaque);
  const noAr = projetos.filter((p) => p.situacao === 'producao').length;

  return (
    <section id="projetos" className={styles.secao}>
      <header className={styles.tituloSecao}>
        <h2>Projetos</h2>
        <p>
          Sistemas que construí do banco de dados à interface.{' '}
          {noAr === projetos.length ? 'Todos rodam em produção hoje.' : `${noAr} rodam em produção hoje.`}
        </p>
      </header>

      <div className={styles.lista}>
        {destaques.map((projeto) => (
          <Destaque key={projeto.id} projeto={projeto} />
        ))}
      </div>

      {/* Índice enxuto para o que não está na vitrine. Some quando não há nada. */}
      {outros.length > 0 && (
        <div className={styles.indice}>
          <h3 className={styles.rotuloIndice}>Outros projetos</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">Ano</th>
                <th scope="col">Projeto</th>
                <th scope="col" className={styles.opcional}>O que é</th>
                <th scope="col" className={styles.opcional}>Feito com</th>
              </tr>
            </thead>
            <tbody>
              {outros.map((p) => (
                <tr key={p.id}>
                  <td className={styles.ano}>{p.periodo}</td>
                  <td className={styles.nome}>
                    <Link href={`/projetos/${p.id}`}>{p.titulo}</Link>
                  </td>
                  <td className={styles.opcional}>{p.resumo}</td>
                  <td className={styles.opcional}>{pilha(p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
