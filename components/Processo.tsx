import { projetos } from '@/data/projetos';
import { textos } from '@/data/textos';
import type { Idioma } from '@/data/idioma';
import Secao from './Secao';
import Contador from './Contador';
import styles from './Processo.module.css';

// O caminho de todo projeto, em quatro passos — e cada passo com o número que
// ele deixou nos projetos. Os números são somados dos dados, não escritos aqui.

const somar = (campo: (p: (typeof projetos)[number]) => number) => projetos.reduce((s, p) => s + campo(p), 0);

const valores = [
  somar((p) => p.restricoes.length),
  somar((p) => p.adrs ?? 0),
  somar((p) => p.testes ?? 0),
  projetos.filter((p) => p.situacao === 'producao').length,
];

export default function Processo({ idioma }: { idioma: Idioma }) {
  return (
    <Secao
      id="processo"
      numero="03"
      olho={textos.navegacao.processo[idioma]}
      titulo={textos.processo.titulo[idioma]}
      chamada={textos.processo.chamada[idioma]}
    >
      <ol className={styles.passos} data-revelar="">
        {textos.processo.passos.map((passo, i) => (
          <li key={passo.titulo.pt} className={styles.passo} style={{ '--i': i } as React.CSSProperties}>
            <span className={styles.marco} aria-hidden>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.titulo}>{passo.titulo[idioma]}</h3>
            <p className={styles.texto}>{passo.texto[idioma]}</p>
            <p className={styles.numero}>
              <strong>
                <Contador valor={valores[i]} idioma={idioma} />
              </strong>
              <span>{passo.rotulo[idioma]}</span>
            </p>
          </li>
        ))}
      </ol>
    </Secao>
  );
}
