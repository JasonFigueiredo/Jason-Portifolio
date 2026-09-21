import Link from 'next/link';
import { tecnologias, categorias, totalLinhas } from '@/data/tecnologias';
import Icone from './Icone';
import { projetos } from '@/data/projetos';
import Janela from './Janela';
import styles from './Tecnologias.module.css';

const tituloDoProjeto = new Map(projetos.map((p) => [p.id, p.titulo]));

function formatar(n: number) {
  return n.toLocaleString('pt-BR');
}

export default function Tecnologias() {
  return (
    <section id="tecnologias" className={styles.secao}>
      <header className={styles.tituloSecao}>
        <h2>Tecnologias</h2>
        <p>
          Com o que eu trabalho — e o quanto. São {formatar(totalLinhas)} linhas de código
          autoral nos meus repositórios, já descontadas dependências e bibliotecas de terceiros.
        </p>
      </header>

      {categorias.map(({ id, rotulo }) => {
        const doGrupo = tecnologias.filter((t) => t.categoria === id);
        if (doGrupo.length === 0) return null;

        return (
          <div key={id} className={styles.grupo}>
            <h3 className={styles.rotuloGrupo}>{rotulo}</h3>

            <ul className={styles.grade}>
              {doGrupo.map((tec) => (
                <li key={tec.id}>
                  <Janela className={styles.cartao}>
                    <div className={styles.frente}>
                      {/* Ícone servido por CDN; dimensões fixas evitam salto de layout. */}
                      <img
                        src={`https://skillicons.dev/icons?i=${tec.icone}`}
                        alt=""
                        width={52}
                        height={52}
                        loading="lazy"
                        className={styles.icone}
                      />
                      <span className={styles.nome}>{tec.nome}</span>
                      <span className={styles.contagem}>
                        {tec.projetos.length > 0
                          ? `${tec.projetos.length} projeto${tec.projetos.length > 1 ? 's' : ''}`
                          : `desde ${tec.desde}`}
                      </span>
                    </div>

                    {/* Sobe ao passar o mouse ou ao receber foco; no toque, fica sempre visível.
                        Sem barra de porcentagem: quem passa rápido a lê como nota de habilidade. */}
                    <div className={styles.detalhe}>
                      <span className={styles.nomeDetalhe}>{tec.nome}</span>
                      <p className={styles.linhas}>
                        {tec.linhas !== undefined
                          ? `${formatar(tec.linhas)} linhas · desde ${tec.desde}`
                          : `Desde ${tec.desde}`}
                      </p>

                      {/* Cada tecnologia leva ao estudo de caso onde ela resolveu algo. */}
                      <p className={styles.usadoEm}>
                        {tec.projetos.map((id, i) => (
                          <span key={id}>
                            {i > 0 && ' · '}
                            <Link href={`/projetos/${id}`}>{tituloDoProjeto.get(id) ?? id}</Link>
                          </span>
                        ))}
                        {tec.tambem && `${tec.projetos.length > 0 ? ' · ' : ''}${tec.tambem}`}
                      </p>
                    </div>
                  </Janela>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <div className={styles.chamada}>
        <p>Cada tecnologia aponta para o projeto onde foi usada.</p>
        <div className={styles.acoes}>
          <a href="#projetos" className={styles.primario}>
            <span>Ver meus projetos</span>
            <Icone nome="setaDireita" tamanho={16} />
          </a>
          <a href="#inicio" className={styles.secundario}>
            <span>Voltar ao início</span>
          </a>
        </div>
      </div>
    </section>
  );
}
