'use client';

import { useEffect, useState } from 'react';
import type { Idioma } from '@/data/idioma';
import { textos } from '@/data/textos';
import Icone from './Icone';
import styles from './BotaoTema.module.css';

type Tema = 'dark' | 'light';

/* O contrato do tema, o mesmo que o script de components/Documento.tsx usa
   antes da primeira pintura: a escolha mora em localStorage['tema'] e vale
   pelo atributo data-theme no <html>. Se um dos dois mudar, o outro tem que
   mudar junto. */
const CHAVE = 'tema';

/** A verdade é o documento — nunca o estado de um componente. */
function temaDoDocumento(): Tema {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

/** A escolha salva; sem escolha, o que o sistema pede. */
function temaPreferido(): Tema {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo === 'light' || salvo === 'dark') return salvo;
  } catch {
    /* navegação privada ou armazenamento bloqueado */
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * `guardar` separa duas coisas que parecem uma só: pintar a página e registrar
 * uma escolha. Repor o tema ao montar não é escolha de ninguém — se isso
 * gravasse, a preferência do sistema viraria decisão explícita na primeira
 * visita e o site pararia de acompanhar o claro/escuro do aparelho para
 * sempre, sem o dono nunca ter clicado em nada.
 */
function aplicar(tema: Tema, guardar: boolean) {
  document.documentElement.dataset.theme = tema;
  if (!guardar) return;
  try {
    localStorage.setItem(CHAVE, tema);
  } catch {
    /* sem onde guardar: o tema vale para esta visita, e é melhor que nada */
  }
}

// Hoje o botão aparece uma vez só, no topo, que serve aos dois layouts. Mesmo
// assim ele observa o atributo em vez de guardar estado próprio: no site
// antigo eram duas cópias, e a que não foi clicada ficava com o ícone velho e
// travava no primeiro clique. Observando o documento, isso não volta.
export default function BotaoTema({ idioma, className }: { idioma: Idioma; className?: string }) {
  const [tema, setTema] = useState<Tema>('dark');

  useEffect(() => {
    // Repõe a escolha ao montar. O script do layout já aplicou o tema antes da
    // pintura, mas a hidratação reconcilia os atributos do <html> e pode levar
    // o data-theme junto — e aí a página cai no escuro do `:root` sozinha,
    // parecendo que o tema claro "não fica". Repor custa nada e fecha o buraco.
    aplicar(temaPreferido(), false);
    setTema(temaDoDocumento());

    const observador = new MutationObserver(() => setTema(temaDoDocumento()));
    observador.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observador.disconnect();
  }, []);

  function alternar() {
    aplicar(temaDoDocumento() === 'dark' ? 'light' : 'dark', true);
    // O ícone não é atualizado aqui: quem faz isso é o observador.
  }

  const rotulo = tema === 'dark' ? textos.tema.paraClaro[idioma] : textos.tema.paraEscuro[idioma];

  return (
    <button
      type="button"
      onClick={alternar}
      className={`${styles.botao} ${className ?? ''}`}
      aria-label={rotulo}
      title={rotulo}
      aria-pressed={tema === 'light'}
    >
      <Icone nome={tema === 'dark' ? 'lua' : 'sol'} tamanho={18} />
    </button>
  );
}
