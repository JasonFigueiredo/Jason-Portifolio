import { projetos } from '@/data/projetos';
import { tecnologias, totalLinhas } from '@/data/tecnologias';
import { textos } from '@/data/textos';
import type { Idioma } from '@/data/idioma';
import Contador from './Contador';
import styles from './Numeros.module.css';

// A faixa de provas logo abaixo da abertura. Nada aqui é digitado: cada número
// sai dos dados, e os dados vêm da contagem nos repositórios. Mudou o array,
// mudou a faixa.

const numeros = [
  { valor: projetos.length, rotulo: textos.numeros.sistemas },
  { valor: projetos.filter((p) => p.situacao === 'producao').length, rotulo: textos.numeros.producao },
  { valor: totalLinhas, rotulo: textos.numeros.linhas },
  { valor: projetos.reduce((soma, p) => soma + (p.adrs ?? 0), 0), rotulo: textos.numeros.decisoes },
  { valor: tecnologias.length, rotulo: textos.numeros.tecnologias },
];

export default function Numeros({ idioma }: { idioma: Idioma }) {
  return (
    <section id="numeros" className={styles.faixa} aria-label={textos.numeros.rotulo[idioma]}>
      <div className={styles.limite}>
        <dl className={styles.lista} data-revelar="">
          {numeros.map(({ valor, rotulo }, i) => (
            <div key={rotulo.pt} className={styles.item} style={{ '--atraso': `${i * 80}ms` } as React.CSSProperties}>
              <dt className={styles.valor}>
                <Contador valor={valor} idioma={idioma} />
              </dt>
              <dd className={styles.rotulo}>{rotulo[idioma]}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.nota}>{textos.numeros.nota[idioma]}</p>
      </div>
    </section>
  );
}
