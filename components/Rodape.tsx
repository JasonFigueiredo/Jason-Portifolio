import { marca } from '@/data/marca';
import { textos } from '@/data/textos';
import { caminho, type Idioma } from '@/data/idioma';
import Marca from './Marca';
import Icone from './Icone';
import styles from './Rodape.module.css';

const secoes = ['servicos', 'produtos', 'processo', 'tecnologias', 'fundador', 'contato'] as const;

export default function Rodape({ idioma }: { idioma: Idioma }) {
  const inicio = caminho(idioma, '/');

  return (
    <footer className={styles.rodape}>
      <div className={styles.limite}>
        <div className={styles.topo}>
          <a href={`${inicio}#inicio`} className={styles.marca} aria-label="JSON Technologies">
            <Marca idioma={idioma} variante="completa" />
          </a>

          {/* Nome próprio: dois menus com o mesmo nome confundem quem navega
              pelos marcos da página com leitor de tela. */}
          <nav aria-label={textos.navegacao.rodape[idioma]}>
            <ul className={styles.links}>
              {secoes.map((id) => (
                <li key={id}>
                  <a href={`${inicio}#${id}`}>{textos.navegacao[id][idioma]}</a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className={styles.redes}>
            <li>
              <a href={marca.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Icone nome="linkedin" tamanho={18} />
              </a>
            </li>
            <li>
              <a href={marca.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Icone nome="github" tamanho={18} />
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.base}>
          <span>
            © {new Date().getFullYear()} {marca.nome} · {marca.fundador}
          </span>
          <span>{textos.contato.feitoCom[idioma]}</span>
        </div>
      </div>
    </footer>
  );
}
