import { projetos } from '@/data/projetos';
import { totalLinhas } from '@/data/tecnologias';
import Icone from './Icone';
import styles from './Hero.module.css';

// Os números saem dos dados, não de texto fixo: mudou o array, mudou a vitrine.
const emProducao = projetos.filter((p) => p.situacao !== 'concluido').length;

const numeros = [
  { valor: String(projetos.length), rotulo: 'projetos' },
  { valor: `${Math.round(totalLinhas / 1000)}k`, rotulo: 'linhas de código' },
  { valor: String(emProducao), rotulo: 'sistemas no ar' },
];

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <p className={styles.disponivel}>
        <span className={styles.ponto} aria-hidden />
        Aberto a novos projetos
      </p>

      <h1 className={styles.titulo}>
        Jason
        <br />
        Figueiredo
      </h1>

      <p className={styles.linha}>
        Desenvolvedor full stack. Construo sistemas que rodam em produção —
        <strong> Laravel e Vue</strong> na web, <strong>Kotlin</strong> no Android.
      </p>

      <ul className={styles.numeros}>
        {numeros.map(({ valor, rotulo }) => (
          <li key={rotulo}>
            <strong>{valor}</strong>
            <span>{rotulo}</span>
          </li>
        ))}
      </ul>

      <div className={styles.botoes}>
        <a href="#projetos" className={styles.primario}>
          <span>Ver projetos</span>
          <Icone nome="setaDireita" tamanho={16} />
        </a>
        <a
          href="https://github.com/JasonFigueiredo"
          target="_blank"
          rel="noreferrer"
          className={styles.secundario}
        >
          <Icone nome="github" tamanho={16} />
          <span>GitHub</span>
        </a>
      </div>

      <div className={styles.rolar} aria-hidden>
        <Icone nome="setaBaixo" tamanho={20} />
      </div>
    </section>
  );
}
