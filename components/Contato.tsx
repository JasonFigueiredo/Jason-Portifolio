import Janela from './Janela';
import Icone from './Icone';
import styles from './Contato.module.css';

const LINKEDIN = 'https://www.linkedin.com/in/jasonfigueiredo99';
const GITHUB = 'https://github.com/JasonFigueiredo';

export default function Contato() {
  return (
    <section id="contato" className={styles.secao}>
      <header className={styles.tituloSecao}>
        <h2>Contato</h2>
        <p>Aberto a projetos, colaborações e conversas técnicas.</p>
      </header>

      <div className={styles.grade}>
        <Janela className={styles.chamada}>
          <div className={styles.icone}>
            <Icone nome="mais" tamanho={28} />
          </div>
          <h3>Este pode ser nosso projeto</h3>
          <p>Quer construir alguma coisa junto?</p>

          <div className={styles.botoes}>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className={styles.primario}>
              <span>Falar no LinkedIn</span>
              <Icone nome="setaDireita" tamanho={16} />
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer" className={styles.secundario}>
              <Icone nome="github" tamanho={16} />
              <span>Ver GitHub</span>
            </a>
          </div>
        </Janela>

        <div className={styles.informacoes}>
          <div>
            <h4>Formação</h4>
            <ul>
              <li>FIAP — Faculdade de Informática e Administração Paulista</li>
              <li>Tecnólogo em Análise e Desenvolvimento de Sistemas</li>
            </ul>
          </div>

          <div>
            <h4>Onde me achar</h4>
            <ul>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className={styles.link}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={GITHUB} target="_blank" rel="noreferrer" className={styles.link}>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className={styles.rodape}>
        <span>Jason Figueiredo · {new Date().getFullYear()}</span>
        <span>Feito com Next.js</span>
      </footer>
    </section>
  );
}
