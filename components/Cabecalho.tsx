'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { caminho, type Idioma } from '@/data/idioma';
import { textos } from '@/data/textos';
import Marca from './Marca';
import BotaoTema from './BotaoTema';
import BotaoIdioma from './BotaoIdioma';
import Icone from './Icone';
import styles from './Cabecalho.module.css';

// Só seções que existem de verdade. No site antigo eram oito ícones,
// e sete apontavam para âncoras inexistentes. O contato não entra na lista:
// ele é o botão de destaque no fim do menu, como no manual da marca.
const secoes = ['servicos', 'produtos', 'processo', 'tecnologias'] as const;
type Secao = (typeof secoes)[number] | 'contato';

type Props = {
  idioma: Idioma;
  /** esta mesma página no outro idioma */
  alternativo: string;
  /** fora da home não há seções para observar: este item fica marcado */
  fixa?: Secao;
};

// Um topo só para desktop e celular. O tema e o idioma ficam sempre à vista;
// no celular, só os links das seções vão para o menu sobreposto. Assim o
// botão de tema existe uma vez na página — duas cópias foi o bug do site antigo.
export default function Cabecalho({ idioma, alternativo, fixa }: Props) {
  const [ativa, setAtiva] = useState<Secao | null>(fixa ?? null);
  const [aberto, setAberto] = useState(false);
  const [rolado, setRolado] = useState(false);
  const inicio = caminho(idioma, '/');
  const naInicial = !fixa;

  // O vidro do topo só aparece depois que a abertura sai de baixo dele.
  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 12);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Marca a seção visível. O observador avisa sozinho quando ela muda,
  // em vez de recalcular posições a cada pixel de rolagem.
  useEffect(() => {
    if (!naInicial) return;
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visivel) setAtiva(visivel.target.id as Secao);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    [...secoes, 'contato'].forEach((id) => {
      const alvo = document.getElementById(id);
      if (alvo) observador.observe(alvo);
    });
    // Voltando ao topo, nenhuma seção fica marcada.
    const abertura = document.getElementById('inicio');
    const doTopo = new IntersectionObserver(([e]) => e.isIntersecting && setAtiva(null), {
      rootMargin: '0px 0px -60% 0px',
    });
    if (abertura) doTopo.observe(abertura);
    return () => {
      observador.disconnect();
      doTopo.disconnect();
    };
  }, [naInicial]);

  // Com o menu aberto no celular, travar a rolagem do fundo evita
  // aquele efeito de duas camadas deslizando juntas.
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false);
    window.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', aoTeclar);
    };
  }, [aberto]);

  const href = (id: string) => (naInicial ? `#${id}` : `${inicio}#${id}`);

  return (
    <header className={`${styles.topo} ${rolado || aberto ? styles.rolado : ''}`}>
      <a href="#conteudo" className={styles.pular}>
        {textos.navegacao.pularParaConteudo[idioma]}
      </a>

      <div className={styles.faixa}>
        <Link href={inicio} className={styles.marca} aria-label={`JSON Technologies — ${textos.navegacao.inicio[idioma]}`}>
          <Marca idioma={idioma} />
        </Link>

        <nav
          id="menu-principal"
          className={`${styles.menu} ${aberto ? styles.aberto : ''}`}
          aria-label={textos.navegacao.rotulo[idioma]}
        >
          <ul>
            {secoes.map((id, i) => (
              <li key={id} style={{ '--ordem': i } as React.CSSProperties}>
                <a
                  href={href(id)}
                  className={`${styles.link} ${ativa === id ? styles.ativo : ''}`}
                  aria-current={ativa === id ? 'true' : undefined}
                  onClick={() => setAberto(false)}
                >
                  {textos.navegacao[id][idioma]}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={href('contato')}
            className={`${styles.chamada} ${ativa === 'contato' ? styles.chamadaAtiva : ''}`}
            aria-current={ativa === 'contato' ? 'true' : undefined}
            onClick={() => setAberto(false)}
          >
            {textos.navegacao.contato[idioma]}
            <Icone nome="setaDireita" tamanho={14} />
          </a>
        </nav>

        <div className={styles.ferramentas}>
          <BotaoIdioma idioma={idioma} alternativo={alternativo} />
          <BotaoTema idioma={idioma} />
          <button
            type="button"
            className={styles.botaoMenu}
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? textos.navegacao.fecharMenu[idioma] : textos.navegacao.abrirMenu[idioma]}
            aria-expanded={aberto}
            aria-controls="menu-principal"
          >
            <Icone nome={aberto ? 'fechar' : 'menu'} tamanho={20} />
          </button>
        </div>
      </div>

      {/* Quanto da página já foi lido. Só desenha onde o navegador sabe ligar
          animação à rolagem; nos outros, a barra simplesmente não aparece. */}
      <span className={styles.progresso} aria-hidden />
    </header>
  );
}
