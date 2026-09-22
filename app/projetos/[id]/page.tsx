import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projetos, rotuloSituacao, type Imagem } from '@/data/projetos';
import BarraLateral from '@/components/BarraLateral';
import Janela from '@/components/Janela';
import Icone from '@/components/Icone';
import Diagrama from '@/components/Diagrama';
import Contato from '@/components/Contato';
import casca from '../../page.module.css';
import styles from './pagina.module.css';

// Uma página por projeto, gerada no build. Substituiu o modal da home: modal não
// tem endereço para mandar a um cliente, não volta pelo histórico e o Google não lê.
export function generateStaticParams() {
  return projetos.map((p) => ({ id: p.id }));
}

// Endereço que não saiu do array é 404, não uma página montada na hora.
export const dynamicParams = false;

export async function generateMetadata(props: PageProps<'/projetos/[id]'>): Promise<Metadata> {
  const { id } = await props.params;
  const projeto = projetos.find((p) => p.id === id);
  if (!projeto) return {};
  return {
    title: `${projeto.titulo} — Jason Figueiredo`,
    description: projeto.resumo,
    openGraph: { title: projeto.titulo, description: projeto.resumo, locale: 'pt_BR', type: 'article' },
  };
}

function Tela({ img, inteira }: { img: Imagem; inteira?: boolean }) {
  return (
    <figure className={inteira ? styles.inteira : undefined}>
      {/* Reduzida, a captura não se lê: o clique abre no tamanho real. */}
      <a href={img.src} target="_blank" rel="noreferrer" className={`${styles.moldura} ${styles[img.formato]}`}>
        <img src={img.src} alt={img.legenda} loading="lazy" />
      </a>
      <figcaption>
        {img.texto ? (
          <>
            <strong>{img.legenda}</strong>
            {img.texto}
          </>
        ) : (
          img.legenda
        )}
      </figcaption>
    </figure>
  );
}

export default async function PaginaProjeto(props: PageProps<'/projetos/[id]'>) {
  const { id } = await props.params;
  const indice = projetos.findIndex((p) => p.id === id);
  if (indice === -1) notFound();

  const projeto = projetos[indice];
  const proximo = projetos[(indice + 1) % projetos.length];
  const [capa, ...telas] = projeto.imagens;
  // Computador numa grade, celulares noutra: misturados, uma linha teria uma
  // tela deitada ao lado de uma em pé, cada uma de uma altura.
  const largas = telas.filter((img) => img.formato !== 'celular');
  const celulares = telas.filter((img) => img.formato === 'celular');

  return (
    <>
      <BarraLateral fixa="projetos" />
      <main className={casca.principal}>
        <div className={casca.limite}>
          <article className={styles.pagina}>
            <nav className={styles.trilha} aria-label="Navegação entre projetos">
              <Link href="/#projetos">
                <Icone nome="setaDireita" tamanho={14} className={styles.voltar} />
                Projetos
              </Link>
              {proximo.id !== projeto.id && (
                <Link href={`/projetos/${proximo.id}`}>
                  Próximo: {proximo.titulo}
                  <Icone nome="setaDireita" tamanho={14} />
                </Link>
              )}
            </nav>

            <header className={styles.topo}>
              <p className={styles.olho}>
                <span className={`${styles.situacao} ${styles[projeto.situacao]}`}>
                  {rotuloSituacao[projeto.situacao]}
                </span>
                {projeto.periodo}
              </p>
              <h1 className={styles.titulo}>{projeto.titulo}</h1>
              <p className={styles.lede}>{projeto.resumo}</p>

              <div className={styles.acoes}>
                {projeto.site && (
                  <a href={projeto.site.url} target="_blank" rel="noreferrer" className={styles.primario}>
                    {projeto.site.rotulo}
                    <Icone nome="externo" tamanho={15} />
                  </a>
                )}
                {projeto.privado ? (
                  <span className={styles.privado}>
                    <Icone nome="cadeado" tamanho={15} />
                    Código privado — o que foi construído e por quê está abaixo
                  </span>
                ) : (
                  projeto.repo && (
                    <a href={projeto.repo} target="_blank" rel="noreferrer" className={styles.secundario}>
                      <Icone nome="github" tamanho={15} />
                      Ver no GitHub
                    </a>
                  )
                )}
              </div>
            </header>

            {/* O resumo para quem só vai ler isto: quem fez o quê, para quem, e as provas. */}
            <div className={styles.quadro}>
              <dl className={styles.fatos}>
                <div>
                  <dt>Papel</dt>
                  <dd>{projeto.papel}</dd>
                </div>
                <div>
                  <dt>Para quem</dt>
                  <dd>{projeto.paraQuem}</dd>
                </div>
                <div>
                  <dt>Onde roda</dt>
                  <dd>{projeto.ondeRoda}</dd>
                </div>
              </dl>
              <dl className={styles.provas}>
                {projeto.provas.map(({ valor, rotulo }) => (
                  <div key={rotulo}>
                    <dt>{valor}</dt>
                    <dd>{rotulo}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {capa && (
              <figure className={styles.capa}>
                {capa.formato === 'cartaz' ? (
                  <div className={styles.cartaz}>
                    <img src={capa.src} alt={capa.legenda} />
                  </div>
                ) : (
                  <Janela>
                    <div className={`${styles.moldura} ${styles[capa.formato]}`}>
                      <img src={capa.src} alt={capa.legenda} />
                    </div>
                  </Janela>
                )}
                <figcaption>{capa.legenda}</figcaption>
              </figure>
            )}

            <section className={styles.bloco}>
              <h2>O problema</h2>
              <div className={styles.corpo}>
                <p>{projeto.problema}</p>
                <ul className={styles.restricoes}>
                  {projeto.restricoes.map(({ rotulo, nota }) => (
                    <li key={rotulo}>
                      <strong>{rotulo}</strong>
                      <span>{nota}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {projeto.recursos && (
              <section className={styles.bloco}>
                <h2>
                  O que faz
                  <small>Do ponto de vista de quem usa</small>
                </h2>
                <div className={styles.corpo}>
                  <ul className={styles.recursos}>
                    {projeto.recursos.map(({ titulo, texto }) => (
                      <li key={titulo}>
                        <strong>{titulo}</strong>
                        <span>{texto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            <section className={styles.bloco}>
              <h2>
                Decisões
                <small>
                  {projeto.adrs
                    ? `${projeto.decisoes.length} das ${projeto.adrs} registradas, cada uma com a alternativa descartada`
                    : 'Cada uma com a alternativa descartada'}
                </small>
              </h2>
              <div className={styles.corpo}>
                {projeto.decisoes.map((d) => (
                  <article key={d.titulo} className={styles.decisao}>
                    <header>
                      <h3>{d.titulo}</h3>
                      {d.adr && <span className={styles.adr}>{d.adr}</span>}
                    </header>
                    <dl>
                      <div>
                        <dt>Por quê</dt>
                        <dd>{d.porque}</dd>
                      </div>
                      <div>
                        <dt>Descartado</dt>
                        <dd className={styles.descartado}>{d.descartado}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.bloco}>
              <h2>Como se encaixa</h2>
              <div className={styles.corpo}>
                <Diagrama id={projeto.id} arquitetura={projeto.arquitetura} />
              </div>
            </section>

            <section className={styles.bloco}>
              <h2>
                Com o quê
                <small>Cada peça com o trabalho que faz aqui</small>
              </h2>
              <div className={styles.corpo}>
                <table className={styles.stack}>
                  <tbody>
                    {projeto.stack.map(({ camada, ferramenta, papel }) => (
                      <tr key={camada}>
                        <th scope="row">{camada}</th>
                        <td className={styles.ferramenta}>{ferramenta}</td>
                        <td>{papel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {telas.length > 0 && (
              <section className={styles.bloco}>
                <h2>Telas</h2>
                <div className={`${styles.corpo} ${styles.telas}`}>
                  {largas.length > 0 && (
                    <div className={styles.largas}>
                      {largas.map((img, i) => (
                        // Em duas colunas, uma quantidade ímpar deixaria um buraco no fim:
                        // a primeira tela, que abre a galeria, ocupa a linha toda.
                        <Tela key={img.src} img={img} inteira={i === 0 && largas.length % 2 === 1} />
                      ))}
                    </div>
                  )}
                  {celulares.length > 0 && (
                    <div className={styles.celulares}>
                      {celulares.map((img) => (
                        <Tela key={img.src} img={img} />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            <section className={styles.bloco}>
              <h2>
                O que deu errado
                <small>{projeto.dificil.titulo}</small>
              </h2>
              <div className={styles.corpo}>
                {projeto.dificil.texto.map((paragrafo) => (
                  <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
                ))}
              </div>
            </section>

            {projeto.proximos && (
              <section className={styles.bloco}>
                <h2>Próximos passos</h2>
                <div className={styles.corpo}>
                  <p>{projeto.proximos}</p>
                </div>
              </section>
            )}

            {proximo.id !== projeto.id && (
              <footer className={styles.rodape}>
                <Link href="/#projetos" className={styles.secundario}>
                  Todos os projetos
                </Link>
                <Link href={`/projetos/${proximo.id}`} className={styles.proximo}>
                  <span>Próximo projeto</span>
                  <strong>{proximo.titulo}</strong>
                </Link>
              </footer>
            )}
          </article>

          <Contato />
        </div>
      </main>
    </>
  );
}
