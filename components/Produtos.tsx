import Link from 'next/link';
import { projetos, rotuloSituacao, type Projeto } from '@/data/projetos';
import { tecnologias } from '@/data/tecnologias';
import { textos, preencher } from '@/data/textos';
import { caminho, t, type Idioma } from '@/data/idioma';
import Secao from './Secao';
import Janela from './Janela';
import Inclinavel from './Inclinavel';
import VideoDemo from './VideoDemo';
import Botao from './Botao';
import styles from './Produtos.module.css';

// "Destaque e índice": quem tem telas ganha a vitrine; os demais entram numa
// tabela enxuta embaixo, que some quando está vazia. A tela fica sempre à
// esquerda — o zigue-zague antigo obrigava o olho a trocar de coluna a cada
// projeto.

const nomeDaTecnologia = new Map(tecnologias.map((tec) => [tec.id, tec.nome]));

function dominio(projeto: Projeto) {
  return projeto.site ? new URL(projeto.site.url).host : undefined;
}

function Midia({ projeto, idioma, endereco }: { projeto: Projeto; idioma: Idioma; endereco: string }) {
  // Com gravação, o vídeo toma o lugar da capa: o sistema em movimento diz
  // mais que a tela parada. Não é link, porque tem o próprio controle. Uma
  // `vitrine` declarada vence o vídeo, por ser escolha explícita.
  if (projeto.demo && !projeto.vitrine) {
    return (
      <Janela endereco={dominio(projeto)}>
        <VideoDemo demo={projeto.demo} rotulo={projeto.titulo} idioma={idioma} />
      </Janela>
    );
  }

  const capa = projeto.vitrine ?? projeto.imagens[0];
  if (!capa) return null;

  // A imagem é atalho de mouse; quem usa teclado chega pelo título e pelo
  // botão. Link dentro de link é HTML inválido, por isso o site fica fora.
  return (
    <Link href={endereco} tabIndex={-1} aria-hidden className={styles.atalho}>
      {capa.formato === 'cartaz' ? (
        // O cartaz já desenha as próprias janelas: vai sem a moldura.
        <div className={styles.cartaz}>
          <img src={capa.src} alt="" loading="lazy" />
        </div>
      ) : (
        <Janela endereco={dominio(projeto)}>
          <div className={`${styles.moldura} ${styles[capa.formato]}`}>
            <img src={capa.src} alt="" loading="lazy" />
          </div>
        </Janela>
      )}
    </Link>
  );
}

function Vitrine({ projeto, idioma, ordem }: { projeto: Projeto; idioma: Idioma; ordem: number }) {
  const endereco = caminho(idioma, `/projetos/${projeto.id}`);

  return (
    <article className={styles.vitrine}>
      <div className={styles.midia} data-revelar="">
        <span className={styles.ordem} aria-hidden>
          {String(ordem).padStart(2, '0')}
        </span>
        <Inclinavel>
          <Midia projeto={projeto} idioma={idioma} endereco={endereco} />
        </Inclinavel>
      </div>

      <div className={styles.texto} data-revelar="" style={{ '--atraso': '120ms' } as React.CSSProperties}>
        <p className={styles.olho}>
          <span className={`${styles.situacao} ${styles[projeto.situacao]}`}>
            {rotuloSituacao[projeto.situacao][idioma]}
          </span>
          <span>{projeto.periodo}</span>
        </p>

        <h3 className={styles.titulo}>
          <Link href={endereco}>{projeto.titulo}</Link>
        </h3>
        <p className={styles.resumo}>{projeto.resumo[idioma]}</p>

        <dl className={styles.provas}>
          {projeto.provas.slice(0, 3).map(({ valor, rotulo }) => (
            <div key={rotulo.pt}>
              <dt>{t(valor, idioma)}</dt>
              <dd>{rotulo[idioma]}</dd>
            </div>
          ))}
        </dl>

        <p className={styles.decisao}>
          <span>
            {textos.produtos.decisaoChave[idioma]}
            {projeto.decisaoChave.adr && ` · ${t(projeto.decisaoChave.adr, idioma)}`}
          </span>
          {projeto.decisaoChave.texto[idioma]}
        </p>

        <ul className={styles.pilha} aria-label={textos.produtos.feitoCom[idioma]}>
          {projeto.tecnologias.map((id) => (
            <li key={id}>{nomeDaTecnologia.get(id) ?? id}</li>
          ))}
        </ul>

        <div className={styles.acoes}>
          <Botao href={endereco} icone="setaDireita">
            {textos.produtos.lerCaso[idioma]}
          </Botao>
          {projeto.site && (
            <Botao href={projeto.site.url} variante="texto" icone="externo" externo>
              {projeto.site.rotulo[idioma]}
            </Botao>
          )}
          {!projeto.site && projeto.repo && (
            <Botao href={projeto.repo} variante="texto" icone="github" iconeAntes externo>
              GitHub
            </Botao>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Produtos({ idioma }: { idioma: Idioma }) {
  const destaques = projetos.filter((p) => p.destaque);
  const outros = projetos.filter((p) => !p.destaque);
  const noAr = projetos.filter((p) => p.situacao === 'producao').length;

  return (
    <Secao
      id="produtos"
      numero="02"
      olho={textos.navegacao.produtos[idioma]}
      titulo={textos.produtos.titulo[idioma]}
      chamada={preencher(textos.produtos.chamada[idioma], { n: noAr })}
    >
      <div className={styles.lista}>
        {destaques.map((projeto, i) => (
          <Vitrine key={projeto.id} projeto={projeto} idioma={idioma} ordem={i + 1} />
        ))}
      </div>

      {/* Índice enxuto para o que não está na vitrine. Some quando não há nada. */}
      {outros.length > 0 && (
        <div className={styles.indice} data-revelar="">
          <h3 className={styles.rotuloIndice}>{textos.produtos.outros[idioma]}</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">{textos.produtos.ano[idioma]}</th>
                <th scope="col">{textos.produtos.projeto[idioma]}</th>
                <th scope="col" className={styles.opcional}>
                  {textos.produtos.oQueE[idioma]}
                </th>
                <th scope="col" className={styles.opcional}>
                  {textos.produtos.feitoCom[idioma]}
                </th>
              </tr>
            </thead>
            <tbody>
              {outros.map((p) => (
                <tr key={p.id}>
                  <td className={styles.ano}>{p.periodo}</td>
                  <td className={styles.nome}>
                    <Link href={caminho(idioma, `/projetos/${p.id}`)}>{p.titulo}</Link>
                    <span className={`${styles.situacao} ${styles[p.situacao]}`}>
                      {rotuloSituacao[p.situacao][idioma]}
                    </span>
                  </td>
                  <td className={styles.opcional}>{p.resumo[idioma]}</td>
                  <td className={`${styles.opcional} ${styles.feito}`}>
                    {p.tecnologias.map((id) => nomeDaTecnologia.get(id) ?? id).join(' · ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Secao>
  );
}
