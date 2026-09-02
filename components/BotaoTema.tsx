'use client';

import { useEffect, useState } from 'react';
import Icone from './Icone';
import styles from './BotaoTema.module.css';

type Tema = 'dark' | 'light';

// Um único botão para os dois layouts. No site antigo havia dois, e eles
// gravavam o tema em elementos diferentes — por isso o do celular travava.
export default function BotaoTema({ className }: { className?: string }) {
  const [tema, setTema] = useState<Tema>('dark');

  // O tema já foi aplicado pelo script do layout, antes da primeira pintura.
  // Aqui só lemos o que ficou, para o ícone nascer certo.
  useEffect(() => {
    setTema((document.documentElement.dataset.theme as Tema) ?? 'dark');
  }, []);

  function alternar() {
    const novo: Tema = tema === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = novo;
    localStorage.setItem('tema', novo);
    setTema(novo);
  }

  return (
    <button
      type="button"
      onClick={alternar}
      className={`${styles.botao} ${className ?? ''}`}
      aria-label={tema === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      <Icone nome={tema === 'dark' ? 'lua' : 'sol'} tamanho={18} />
    </button>
  );
}
