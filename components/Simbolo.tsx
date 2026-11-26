import styles from './Simbolo.module.css';

// O símbolo da marca: o monograma "J" entre as chaves do JSON. Redesenhado em
// vetor a partir do manual, com as medidas tiradas do próprio quadro.
//
// O J é feito de três faces chapadas, e não de gradientes: gradiente de SVG
// depende de um id no documento, e com o símbolo repetido (topo, rodapé, menu
// do celular escondido) o navegador pode resolver o id para uma cópia
// invisível e pintar a face de preto. Três cores sólidas dão o mesmo volume.

/** A chave da esquerda, pelo eixo do traço; a da direita é o espelho. */
export const CHAVE =
  'M23 4H19Q13 4 13 10V34Q13 41 6 44Q13 47 13 54V78Q13 84 19 84H23';

type Props = {
  /** altura em pixels; a largura acompanha a proporção */
  tamanho?: number;
  /** 'mono' usa a cor do texto, para fundos onde o azul não vale */
  variante?: 'cor' | 'mono';
  /** monta as peças em sequência ao aparecer */
  animado?: boolean;
  className?: string;
  /** sem rótulo, o símbolo é decorativo e some para leitores de tela */
  rotulo?: string;
};

export default function Simbolo({ tamanho = 40, variante = 'cor', animado, className, rotulo }: Props) {
  const classes = [styles.simbolo, styles[variante], animado ? styles.animado : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      viewBox="0 0 116 88"
      height={tamanho}
      width={(tamanho * 116) / 88}
      className={classes}
      role={rotulo ? 'img' : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
    >
      <path className={styles.chave} d={CHAVE} />
      <path className={styles.chave} d={CHAVE} transform="translate(116 0) scale(-1 1)" />
      <path className={styles.bracoEsquerdo} d="M37 51L58 66L58 83L37 68Z" />
      <path className={styles.bracoDireito} d="M58 66L79 51L79 68L58 83Z" />
      <path className={styles.haste} d="M66 12L79 19L79 51L66 60.3Z" />
    </svg>
  );
}
