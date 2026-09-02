import styles from './Janela.module.css';

// A moldura de janela com os três círculos, que no site antigo estava
// copiada onze vezes no HTML. Agora é um componente só.
export default function Janela({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.janela} ${className ?? ''}`}>
      <div className={styles.barra} aria-hidden>
        <span className={styles.vermelho} />
        <span className={styles.amarelo} />
        <span className={styles.verde} />
      </div>
      <div className={styles.conteudo}>{children}</div>
    </div>
  );
}
