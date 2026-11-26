import { marca } from '@/data/marca';
import type { Idioma } from '@/data/idioma';
import { CHAVE } from './Simbolo';
import styles from './Marca.module.css';

// A assinatura horizontal: { JSON TECHNOLOGIES }, com "JSON" em azul. A
// completa leva o slogan embaixo, com a última palavra em azul, como no manual.

function Chave({ direita }: { direita?: boolean }) {
  return (
    <svg viewBox="0 0 28 88" className={styles.chave} aria-hidden>
      <path d={CHAVE} transform={direita ? 'translate(28 0) scale(-1 1)' : undefined} />
    </svg>
  );
}

type Props = {
  idioma: Idioma;
  /** 'completa' leva o slogan; 'compacta' é a do topo da página */
  variante?: 'compacta' | 'completa';
  className?: string;
};

export default function Marca({ idioma, variante = 'compacta', className }: Props) {
  const [primeira, ...resto] = marca.nome.toUpperCase().split(' ');

  return (
    <span className={`${styles.marca} ${styles[variante]} ${className ?? ''}`}>
      <span className={styles.linha}>
        <Chave />
        <span className={styles.nome}>
          <b>{primeira}</b> <span className={styles.resto}>{resto.join(' ')}</span>
        </span>
        <Chave direita />
      </span>
      {variante === 'completa' && (
        <span className={styles.slogan}>
          {marca.slogan.inicio[idioma]} <em>{marca.slogan.fim[idioma]}</em>
        </span>
      )}
    </span>
  );
}
