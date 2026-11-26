'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icone from './Icone';
import styles from './Carrossel.module.css';

// O carrossel infinito das tecnologias.
//
// Cada fileira tem os itens três vezes seguidas e anda exatamente uma cópia:
// quando a animação recomeça, a segunda cópia está onde a primeira estava, e o
// salto não se vê. Três, e não duas, para não sobrar buraco em tela larga.
//
// As cópias extras ficam fora do teclado (tabIndex -1, inclusive nos links) e
// dos leitores de tela (aria-hidden), mas continuam respondendo ao mouse: na
// tela, dois terços dos ícones visíveis são cópias. Elas já foram `inert`, e o
// navegador ignora o mouse em elemento inerte — o detalhe não abria nelas.
//
// Passar o mouse para as duas fileiras, amplia o item e abre o detalhe. Quem
// navega pelo teclado, ou pediu menos movimento, recebe tudo parado numa grade
// — tecla Tab num carrossel andando levaria o foco para fora da tela. O botão
// "Ver todas" faz o mesmo para qualquer um, e é também o jeito de pausar.

export type ItemTecnologia = {
  id: string;
  nome: string;
  icone: string;
  categoria: string;
  /** já formatado no idioma da página */
  linhas?: string;
  desde: string;
  usos: { href: string; titulo: string; camada?: string; papel?: string }[];
  tambem?: string;
};

type Rotulos = {
  linhas: string;
  desde: string;
  projetos: string;
  ondeFoiUsada: string;
  tambem: string;
  dica: string;
  verTodas: string;
  emMovimento: string;
};

const COPIAS = [0, 1, 2];
const LARGURA_DO_DETALHE = 320;
const MARGEM = 16;
/** abaixo disto, do lado de costume, o detalhe ficaria praticamente escondido */
const ESPACO_MINIMO = 160;

/**
 * O detalhe nasce centrado no item, mas perto da borda sairia da tela: mede
 * e empurra para dentro. A conta mora no CSS, que lê só o deslocamento.
 *
 * Na vertical, a fileira de cima abre para cima e a de baixo para baixo:
 * assim um detalhe nunca cobre a outra fileira. Só quando o lado de costume
 * praticamente não tem espaço — o carrossel colado no cabeçalho fixo, ou no pé
 * da tela — o detalhe vira para o outro lado. Passar um pouco do fim da tela
 * não conta: rolar um tanto resolve, e virar cobriria a outra fileira, onde o
 * mouse cairia no detalhe aberto em vez de abrir o do ícone que procurava.
 */
function posicionar(e: React.SyntheticEvent<HTMLElement>) {
  const item = e.currentTarget;
  const caixa = item.getBoundingClientRect();
  const largura = Math.min(LARGURA_DO_DETALHE, window.innerWidth - MARGEM * 2);
  const ideal = caixa.left + caixa.width / 2 - largura / 2;
  const possivel = Math.max(MARGEM, Math.min(ideal, window.innerWidth - largura - MARGEM));
  item.style.setProperty('--desvio', `${Math.round(possivel - ideal)}px`);

  const detalhe = item.querySelector<HTMLElement>('[data-detalhe]');
  const precisa = (detalhe?.offsetHeight ?? 0) + 24;
  const raiz = getComputedStyle(document.documentElement);
  const topo = parseFloat(raiz.getPropertyValue('--altura-topo')) || 0;
  const acima = caixa.top - topo;
  const abaixo = window.innerHeight - caixa.bottom;
  const costume = item.dataset.padrao;
  let lado = costume;
  if (costume === 'cima' && acima < ESPACO_MINIMO && abaixo >= precisa) lado = 'baixo';
  if (costume === 'baixo' && abaixo < ESPACO_MINIMO && acima >= precisa) lado = 'cima';
  item.dataset.abre = lado;
}

function Detalhe({ item, rotulos, copia }: { item: ItemTecnologia; rotulos: Rotulos; copia: boolean }) {
  return (
    <div className={styles.detalhe} data-detalhe="">
      <header className={styles.cabecalho}>
        <img src={item.icone} alt="" width={36} height={36} loading="lazy" />
        <div>
          <strong>{item.nome}</strong>
          <span>{item.categoria}</span>
        </div>
      </header>

      <dl className={styles.fatos}>
        {item.linhas && (
          <div>
            <dt>{rotulos.linhas}</dt>
            <dd>{item.linhas}</dd>
          </div>
        )}
        <div>
          <dt>{rotulos.desde}</dt>
          <dd>{item.desde}</dd>
        </div>
        <div>
          <dt>{rotulos.projetos}</dt>
          <dd>{item.usos.length}</dd>
        </div>
      </dl>

      {item.usos.length > 0 && (
        <>
          <p className={styles.subtitulo}>{rotulos.ondeFoiUsada}</p>
          <ul className={styles.usos}>
            {item.usos.map((uso) => (
              <li key={uso.href}>
                <Link href={uso.href} tabIndex={copia ? -1 : undefined}>
                  {uso.titulo}
                  <Icone nome="setaCanto" tamanho={12} />
                </Link>
                {uso.camada && <span className={styles.camada}>{uso.camada}</span>}
                {uso.papel && <p>{uso.papel}</p>}
              </li>
            ))}
          </ul>
        </>
      )}

      {item.tambem && (
        <p className={styles.tambem}>
          {rotulos.tambem}: {item.tambem}
        </p>
      )}
    </div>
  );
}

export default function Carrossel({ fileiras, rotulos }: { fileiras: ItemTecnologia[][]; rotulos: Rotulos }) {
  const [grade, setGrade] = useState(false);
  // No toque não existe "passar por cima": o detalhe abre num toque e fica
  // aberto até outro toque, fora ou no mesmo ícone. Não dá para depender do
  // foco, porque o Safari do iPhone nem sempre foca o que se toca. Com mouse,
  // nada disso vale: abre ao passar e fecha ao sair, pelo CSS.
  const [aberto, setAberto] = useState<string | null>(null);
  const ponteiro = useRef<string>('mouse');

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: PointerEvent) => {
      if ((e.target as Element).closest?.('[data-aberto]')) return;
      setAberto(null);
      // Tira o foco que o toque deixou no ícone, que manteria o detalhe aberto.
      const ativo = document.activeElement as HTMLElement | null;
      if (ativo?.closest('[data-copia]')) ativo.blur();
    };
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(null);
    document.addEventListener('pointerdown', fora);
    document.addEventListener('keydown', tecla);
    return () => {
      document.removeEventListener('pointerdown', fora);
      document.removeEventListener('keydown', tecla);
    };
  }, [aberto]);

  function tocar(e: React.MouseEvent<HTMLElement>, chave: string) {
    // Com mouse num aparelho que sabe "passar por cima", quem abre é o hover
    // (CSS). Num aparelho que se declara sem hover — tablet com mouse, por
    // exemplo —, o clique do mouse faz o papel do toque.
    if (ponteiro.current === 'mouse' && window.matchMedia('(hover: hover)').matches) return;
    // Só o ícone abre e fecha. Toque dentro do detalhe é para ler ou seguir um
    // link, não para fechar.
    if ((e.target as Element).closest('[data-detalhe]')) return;
    const item = e.currentTarget;
    if (aberto === chave) {
      setAberto(null);
      // O toque deixou o ícone em foco, e o foco também abre o detalhe.
      item.blur();
      return;
    }
    posicionar(e);
    setAberto(chave);
  }

  return (
    <div className={styles.carrossel} data-grade={grade || undefined} data-pausado={aberto ? '' : undefined}>
      <div className={styles.barra}>
        <p className={styles.dica}>{rotulos.dica}</p>
        <button type="button" className={styles.alternar} onClick={() => setGrade((g) => !g)} aria-pressed={grade}>
          <Icone nome={grade ? 'play' : 'pausa'} tamanho={14} />
          {grade ? rotulos.emMovimento : rotulos.verTodas}
        </button>
      </div>

      {fileiras.map((itens, f) => (
        <div key={f} className={`${styles.janela} ${f === 0 ? styles.abreParaCima : styles.abreParaBaixo}`}>
          <ul
            className={`${styles.trilho} ${f % 2 === 1 ? styles.reverso : ''}`}
            style={{ '--duracao': `${itens.length * 3.4}s` } as React.CSSProperties}
          >
            {COPIAS.map((copia) =>
              itens.map((item) => {
                const chave = `${f}-${copia}-${item.id}`;
                return (
                  <li
                    key={chave}
                    className={styles.item}
                    data-copia={copia}
                    data-aberto={aberto === chave ? '' : undefined}
                    data-padrao={f === 0 ? 'cima' : 'baixo'}
                    tabIndex={copia === 0 ? 0 : -1}
                    aria-hidden={copia > 0 || undefined}
                    onPointerEnter={posicionar}
                    onFocus={posicionar}
                    onPointerDown={(e) => (ponteiro.current = e.pointerType)}
                    onClick={(e) => tocar(e, chave)}
                  >
                    <span className={styles.chip}>
                      <img src={item.icone} alt="" width={28} height={28} loading="lazy" />
                      <span>{item.nome}</span>
                    </span>
                    <Detalhe item={item} rotulos={rotulos} copia={copia > 0} />
                  </li>
                );
              }),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
