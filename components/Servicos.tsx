import Link from 'next/link';
import { servicos } from '@/data/servicos';
import { projetos } from '@/data/projetos';
import { textos } from '@/data/textos';
import { caminho, type Idioma } from '@/data/idioma';
import Secao from './Secao';
import Holofote from './Holofote';
import Icone from './Icone';
import styles from './Servicos.module.css';

// Os cinco pilares da marca. Cada cartão termina nos produtos que provam o
// que ele promete — o link leva direto ao estudo de caso.

const tituloDoProjeto = new Map(projetos.map((p) => [p.id, p.titulo]));

export default function Servicos({ idioma }: { idioma: Idioma }) {
  return (
    <Secao
      id="servicos"
      numero="01"
      olho={textos.navegacao.servicos[idioma]}
      titulo={textos.servicos.titulo[idioma]}
      chamada={textos.servicos.chamada[idioma]}
    >
      <ul className={styles.grade}>
        {servicos.map((servico, i) => (
          // A entrada ao rolar fica no item; o efeito do mouse, no cartão de
          // dentro. No mesmo elemento, as duas transições brigariam.
          <li
            key={servico.id}
            className={styles.item}
            style={{ '--atraso': `${i * 90}ms` } as React.CSSProperties}
            data-revelar=""
          >
          <Holofote className={styles.cartao}>
            <span className={styles.icone}>
              <Icone nome={servico.icone} tamanho={26} />
            </span>
            <h3 className={styles.titulo}>{servico.titulo[idioma]}</h3>
            <p className={styles.texto}>{servico.texto[idioma]}</p>
            <p className={styles.onde}>{servico.onde[idioma]}</p>

            <div className={styles.provas}>
              <span className={styles.rotulo}>{textos.servicos.provadoEm[idioma]}</span>
              <ul>
                {servico.projetos.map((id) => (
                  <li key={id}>
                    <Link href={caminho(idioma, `/projetos/${id}`)} className={styles.prova}>
                      {tituloDoProjeto.get(id) ?? id}
                      <Icone nome="setaCanto" tamanho={13} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Holofote>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
