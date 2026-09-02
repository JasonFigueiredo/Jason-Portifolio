import BarraLateral from '@/components/BarraLateral';
import Hero from '@/components/Hero';
import Projetos from '@/components/Projetos';
import Tecnologias from '@/components/Tecnologias';
import Contato from '@/components/Contato';
import styles from './page.module.css';

export default function Pagina() {
  return (
    <>
      <BarraLateral />
      <main className={styles.principal}>
        <div className={styles.limite}>
          <Hero />
          <Projetos />
          <Tecnologias />
          <Contato />
        </div>
      </main>
    </>
  );
}
