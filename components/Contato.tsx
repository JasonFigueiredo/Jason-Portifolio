import { marca } from '@/data/marca';
import { textos } from '@/data/textos';
import type { Idioma } from '@/data/idioma';
import Botao from './Botao';
import Simbolo from './Simbolo';
import styles from './Contato.module.css';

// O fechamento da página: um convite só, e os dois caminhos que existem hoje.
// Sem formulário e sem e-mail da marca — por enquanto ela não tem domínio
// próprio, e um formulário exigiria servidor num site que é só arquivo.

export default function Contato({ idioma }: { idioma: Idioma }) {
  const tx = textos.contato;

  return (
    <section id="contato" className={styles.secao} aria-labelledby="contato-titulo">
      <div className={styles.limite}>
        <div className={styles.painel} data-revelar="">
          <span className={styles.olho}>
            <span className={styles.numero}>06</span> {textos.navegacao.contato[idioma]}
          </span>
          <Simbolo tamanho={44} className={styles.simbolo} />
          <h2 id="contato-titulo" className={styles.titulo}>
            {tx.titulo[idioma]}
          </h2>
          <p className={styles.texto}>{tx.texto[idioma]}</p>
          <div className={styles.botoes}>
            <Botao href={marca.linkedin} icone="setaDireita" externo>
              {tx.linkedin[idioma]}
            </Botao>
            <Botao href={marca.github} variante="secundario" icone="github" iconeAntes externo>
              {tx.github[idioma]}
            </Botao>
          </div>
        </div>
      </div>
    </section>
  );
}
