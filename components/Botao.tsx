import Link from 'next/link';
import Icone, { type NomeIcone } from './Icone';
import styles from './Botao.module.css';

// Os botões do site são todos links: levam a uma seção, a uma página ou a
// outro site. Um componente só, para o azul, o raio e o foco serem os mesmos
// em toda parte — antes, cada seção tinha a sua cópia de .primario.

type Props = {
  href: string;
  children: React.ReactNode;
  variante?: 'primario' | 'secundario' | 'texto';
  icone?: NomeIcone;
  /** o ícone vem antes do texto (marcas: GitHub, LinkedIn) */
  iconeAntes?: boolean;
  externo?: boolean;
  className?: string;
};

export default function Botao({
  href,
  children,
  variante = 'primario',
  icone,
  iconeAntes,
  externo,
  className,
}: Props) {
  const classes = `${styles.botao} ${styles[variante]} ${className ?? ''}`;
  const conteudo = (
    <>
      {icone && iconeAntes && <Icone nome={icone} tamanho={16} />}
      <span>{children}</span>
      {icone && !iconeAntes && <Icone nome={icone} tamanho={16} className={styles.seta} />}
    </>
  );

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {conteudo}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {conteudo}
    </Link>
  );
}
