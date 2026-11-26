import Icone from './Icone';
import styles from './Janela.module.css';

// A moldura de janela com os três círculos, que no site antigo estava
// copiada onze vezes no HTML. Agora é um componente só. Com `endereco`, ganha
// a barra de endereço do navegador — o domínio de verdade, onde o sistema roda.
export default function Janela({
  children,
  className,
  endereco,
}: {
  children: React.ReactNode;
  className?: string;
  endereco?: string;
}) {
  return (
    <div className={`${styles.janela} ${className ?? ''}`}>
      <div className={styles.barra} aria-hidden>
        <span className={styles.vermelho} />
        <span className={styles.amarelo} />
        <span className={styles.verde} />
        {endereco && (
          <span className={styles.endereco}>
            <Icone nome="cadeado" tamanho={10} />
            {endereco}
          </span>
        )}
      </div>
      <div className={styles.conteudo}>{children}</div>
    </div>
  );
}
