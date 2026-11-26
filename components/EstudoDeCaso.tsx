import Link from 'next/link';
import { projetos, rotuloSituacao, type Imagem, type Projeto } from '@/data/projetos';
import { textos, preencher } from '@/data/textos';
import { caminho, t, type Idioma } from '@/data/idioma';
import FundoVivo from './FundoVivo';
import Cabecalho from './Cabecalho';
import Janela from './Janela';
import Icone from './Icone';
import Diagrama from './Diagrama';
import VideoDemo from './VideoDemo';
import Botao from './Botao';
import Contato from './Contato';
import Rodape from './Rodape';
import Revelacoes from './Revelacoes';
import styles from './EstudoDeCaso.module.css';

// A página de cada produto. Os repositórios são privados, então é ela que
// prova o trabalho. A ordem dos blocos segue as perguntas de quem avalia:
// quadro-resumo → tela → problema → o que faz → decisões → arquitetura → stack
// → outras telas → o que deu errado → próximos passos. Os títulos à esquerda
// contam a história sozinhos para quem só lê títulos.

function Tela({ img, idioma, inteira }: { img: Imagem; idioma: Idioma; inteira?: boolean }) {
  return (
    <figure className={inteira ? styles.inteira : undefined}>
      {/* Reduzida, a captura não se lê: o clique abre no tamanho real. */}
      <a
        href={img.src}
        target="_blank"
        rel="noreferrer"
        className={`${styles.moldura} ${styles[img.formato]}`}
        title={textos.caso.abrirTela[idioma]}
      >
        <img src={img.src} alt={img.legenda[idioma]} loading="lazy" />
      </a>
      <figcaption>
        {img.texto ? (
          <>
            <strong>{img.legenda[idioma]}</strong>
            {img.texto[idioma]}
          </>
        ) : (
          img.legenda[idioma]
        )}
      </figcaption>
    </figure>
  );
}

function Bloco({ titulo, nota, children }: { titulo: string; nota?: string; children: React.ReactNode }) {
  return (
    <section className={styles.bloco} data-revelar="">
      <h2>
        {titulo}
        {nota && <small>{nota}</small>}
      </h2>
      <div className={styles.corpo}>{children}</div>
    </section>
  );
}

export default function EstudoDeCaso({ projeto, idioma }: { projeto: Projeto; idioma: Idioma }) {
  const tx = textos.caso;
  const outro: Idioma = idioma === 'pt' ? 'en' : 'pt';
  const indice = projetos.findIndex((p) => p.id === projeto.id);
  const proximo = projetos[(indice + 1) % projetos.length];
  const inicio = caminho(idioma, '/');
  const [capa, ...telas] = projeto.imagens;
  // Computador numa grade, celulares noutra: misturados, uma linha teria uma
  // tela deitada ao lado de uma em pé, cada uma de uma altura.
  const largas = telas.filter((img) => img.formato !== 'celular');
  const celulares = telas.filter((img) => img.formato === 'celular');
  const dominio = projeto.site ? new URL(projeto.site.url).host : undefined;

  return (
    <>
      <FundoVivo />
      <Cabecalho idioma={idioma} alternativo={caminho(outro, `/projetos/${projeto.id}`)} fixa="produtos" />

      <main id="conteudo" className={styles.principal}>
        <article className={styles.pagina}>
          <nav className={styles.trilha} aria-label={tx.produtos[idioma]}>
            <Link href={`${inicio}#produtos`}>
              <Icone nome="setaDireita" tamanho={14} className={styles.voltar} />
              {tx.produtos[idioma]}
            </Link>
            {proximo.id !== projeto.id && (
              <Link href={caminho(idioma, `/projetos/${proximo.id}`)}>
                {tx.proximo[idioma]}: {proximo.titulo}
                <Icone nome="setaDireita" tamanho={14} />
              </Link>
            )}
          </nav>

          <header className={styles.topo}>
            <p className={styles.olho}>
              <span className={`${styles.situacao} ${styles[projeto.situacao]}`}>
                {rotuloSituacao[projeto.situacao][idioma]}
              </span>
              {projeto.periodo}
            </p>
            <h1 className={styles.titulo}>{projeto.titulo}</h1>
            <p className={styles.lede}>{projeto.resumo[idioma]}</p>

            <div className={styles.acoes}>
              {projeto.site && (
                <Botao href={projeto.site.url} icone="externo" externo>
                  {projeto.site.rotulo[idioma]}
                </Botao>
              )}
              {projeto.privado ? (
                <span className={styles.privado}>
                  <Icone nome="cadeado" tamanho={15} />
                  {tx.privado[idioma]}
                </span>
              ) : (
                projeto.repo && (
                  <Botao href={projeto.repo} variante="secundario" icone="github" iconeAntes externo>
                    {tx.verGithub[idioma]}
                  </Botao>
                )
              )}
            </div>
          </header>

          {/* O resumo para quem só vai ler isto: quem fez o quê, para quem, e as provas. */}
          <div className={styles.quadro}>
            <dl className={styles.fatos}>
              <div>
                <dt>{tx.papel[idioma]}</dt>
                <dd>{projeto.papel[idioma]}</dd>
              </div>
              <div>
                <dt>{tx.paraQuem[idioma]}</dt>
                <dd>{projeto.paraQuem[idioma]}</dd>
              </div>
              <div>
                <dt>{tx.ondeRoda[idioma]}</dt>
                <dd>{projeto.ondeRoda[idioma]}</dd>
              </div>
            </dl>
            <dl className={styles.provas}>
              {projeto.provas.map(({ valor, rotulo }) => (
                <div key={rotulo.pt}>
                  <dt>{t(valor, idioma)}</dt>
                  <dd>{rotulo[idioma]}</dd>
                </div>
              ))}
            </dl>
          </div>

          {capa && (
            <figure className={styles.capa}>
              {capa.formato === 'cartaz' ? (
                <div className={styles.cartaz}>
                  <img src={capa.src} alt={capa.legenda[idioma]} />
                </div>
              ) : (
                <Janela endereco={dominio}>
                  <div className={`${styles.moldura} ${styles[capa.formato]}`}>
                    <img src={capa.src} alt={capa.legenda[idioma]} />
                  </div>
                </Janela>
              )}
              <figcaption>{capa.legenda[idioma]}</figcaption>
            </figure>
          )}

          <Bloco titulo={tx.problema[idioma]}>
            <p>{projeto.problema[idioma]}</p>
            <ul className={styles.restricoes}>
              {projeto.restricoes.map(({ rotulo, nota }) => (
                <li key={rotulo.pt}>
                  <strong>{rotulo[idioma]}</strong>
                  <span>{nota[idioma]}</span>
                </li>
              ))}
            </ul>
          </Bloco>

          {projeto.recursos && (
            <Bloco titulo={tx.oQueFaz[idioma]} nota={tx.oQueFazNota[idioma]}>
              <ul className={styles.recursos}>
                {projeto.recursos.map(({ titulo, texto }) => (
                  <li key={titulo.pt}>
                    <strong>{titulo[idioma]}</strong>
                    <span>{texto[idioma]}</span>
                  </li>
                ))}
              </ul>
            </Bloco>
          )}

          {projeto.demo && (
            <Bloco titulo={tx.demo[idioma]}>
              <Janela endereco={dominio}>
                <VideoDemo demo={projeto.demo} rotulo={projeto.titulo} idioma={idioma} />
              </Janela>
            </Bloco>
          )}

          <Bloco
            titulo={tx.decisoes[idioma]}
            nota={
              projeto.adrs
                ? preencher(tx.decisoesDeTotal[idioma], { n: projeto.decisoes.length, total: projeto.adrs })
                : tx.decisoesNota[idioma]
            }
          >
            {projeto.decisoes.map((d) => (
              <article key={d.titulo.pt} className={styles.decisao}>
                <header>
                  <h3>{d.titulo[idioma]}</h3>
                  {d.adr && <span className={styles.adr}>{t(d.adr, idioma)}</span>}
                </header>
                <dl>
                  <div>
                    <dt>{tx.porque[idioma]}</dt>
                    <dd>{d.porque[idioma]}</dd>
                  </div>
                  <div>
                    <dt>{tx.descartado[idioma]}</dt>
                    <dd className={styles.descartado}>{d.descartado[idioma]}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </Bloco>

          <Bloco titulo={tx.comoSeEncaixa[idioma]}>
            <Diagrama id={projeto.id} arquitetura={projeto.arquitetura} idioma={idioma} />
          </Bloco>

          <Bloco titulo={tx.comOQue[idioma]} nota={tx.comOQueNota[idioma]}>
            <table className={styles.stack}>
              <tbody>
                {projeto.stack.map(({ camada, ferramenta, papel }) => (
                  <tr key={t(camada, 'pt')}>
                    <th scope="row">{t(camada, idioma)}</th>
                    <td className={styles.ferramenta}>{t(ferramenta, idioma)}</td>
                    <td>{papel[idioma]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Bloco>

          {telas.length > 0 && (
            <Bloco titulo={tx.telas[idioma]}>
              <div className={styles.telas}>
                {largas.length > 0 && (
                  <div className={styles.largas}>
                    {largas.map((img, i) => (
                      // Em duas colunas, uma quantidade ímpar deixaria um buraco no fim:
                      // a primeira tela, que abre a galeria, ocupa a linha toda.
                      <Tela key={img.src} img={img} idioma={idioma} inteira={i === 0 && largas.length % 2 === 1} />
                    ))}
                  </div>
                )}
                {celulares.length > 0 && (
                  <div className={styles.celulares}>
                    {celulares.map((img) => (
                      <Tela key={img.src} img={img} idioma={idioma} />
                    ))}
                  </div>
                )}
              </div>
            </Bloco>
          )}

          <Bloco titulo={tx.deuErrado[idioma]} nota={projeto.dificil.titulo[idioma]}>
            {projeto.dificil.texto.map((paragrafo) => (
              <p key={paragrafo.pt.slice(0, 24)}>{paragrafo[idioma]}</p>
            ))}
          </Bloco>

          {projeto.proximos && (
            <Bloco titulo={tx.proximosPassos[idioma]}>
              <p>{projeto.proximos[idioma]}</p>
            </Bloco>
          )}

          {proximo.id !== projeto.id && (
            <footer className={styles.rodape}>
              <Botao href={`${inicio}#produtos`} variante="secundario">
                {tx.todos[idioma]}
              </Botao>
              <Link href={caminho(idioma, `/projetos/${proximo.id}`)} className={styles.proximo}>
                <span>{tx.proximoProjeto[idioma]}</span>
                <strong>
                  {proximo.titulo}
                  <Icone nome="setaDireita" tamanho={22} />
                </strong>
              </Link>
            </footer>
          )}
        </article>

        <Contato idioma={idioma} />
      </main>

      <Rodape idioma={idioma} />
      <Revelacoes />
    </>
  );
}
