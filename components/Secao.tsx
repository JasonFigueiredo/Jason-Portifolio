import styles from './Secao.module.css';

// O esqueleto de toda seção da home: o número, o rótulo, o título e a chamada,
// sempre na mesma ordem. Quem só lê títulos atravessa a página e entende a
// história; quem lê o número sabe onde está.

type Props = {
  id: string;
  numero: string;
  olho: string;
  titulo: string;
  chamada?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function Secao({ id, numero, olho, titulo, chamada, children, className }: Props) {
  return (
    <section id={id} className={`${styles.secao} ${className ?? ''}`} aria-labelledby={`${id}-titulo`}>
      <div className={styles.limite}>
        <header className={styles.cabecalho} data-revelar="">
          <p className={styles.olho}>
            <span className={styles.numero}>{numero}</span>
            <span className={styles.traco} aria-hidden />
            {olho}
          </p>
          <h2 id={`${id}-titulo`} className={styles.titulo}>
            {titulo}
          </h2>
          {chamada && <p className={styles.chamada}>{chamada}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
