import { marca } from '@/data/marca';
import { textos } from '@/data/textos';
import type { Idioma } from '@/data/idioma';
import Secao from './Secao';
import Simbolo from './Simbolo';
import Botao from './Botao';
import styles from './Fundador.module.css';

// Quem está por trás da marca. Sem foto de banco de imagens e sem equipe que
// não existe: o símbolo e o nome de quem fez cada produto.

export default function Fundador({ idioma }: { idioma: Idioma }) {
  const tx = textos.fundador;

  return (
    <Secao id="fundador" numero="05" olho={textos.navegacao.fundador[idioma]} titulo={tx.titulo[idioma]}>
      <div className={styles.grade}>
        <div className={styles.emblema} data-revelar="" aria-hidden>
          <span className={styles.orbita} />
          <span className={`${styles.orbita} ${styles.orbita2}`} />
          <span className={styles.satelite} />
          <Simbolo tamanho={120} className={styles.simbolo} />
        </div>

        <div className={styles.texto} data-revelar="" style={{ '--atraso': '120ms' } as React.CSSProperties}>
          <h3 className={styles.nome}>{marca.fundador}</h3>
          <p className={styles.papel}>{marca.papelDoFundador[idioma]}</p>

          {tx.bio.map((paragrafo) => (
            <p key={paragrafo.pt.slice(0, 24)} className={styles.bio}>
              {paragrafo[idioma]}
            </p>
          ))}

          <dl className={styles.fatos}>
            <div>
              <dt>{tx.formacao[idioma]}</dt>
              <dd>{tx.curso[idioma]}</dd>
            </div>
          </dl>

          <div className={styles.acoes}>
            <Botao href={marca.linkedin} variante="secundario" icone="linkedin" iconeAntes externo>
              LinkedIn
            </Botao>
            <Botao href={marca.github} variante="secundario" icone="github" iconeAntes externo>
              GitHub
            </Botao>
          </div>
        </div>
      </div>
    </Secao>
  );
}
