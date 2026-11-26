import { Fragment } from 'react';
import { marca } from '@/data/marca';
import { projetos } from '@/data/projetos';
import { textos, preencher } from '@/data/textos';
import type { Idioma } from '@/data/idioma';
import Botao from './Botao';
import CenaRede from './CenaRede';
import { CHAVE } from './Simbolo';
import styles from './Abertura.module.css';

// A primeira dobra: o slogan da marca, a proposta e o cubo de rede entre as
// chaves do símbolo — o {J} do logo aberto em cena.
//
// O número de sistemas no ar sai dos dados: "no ar" é só o que está em
// produção; o que está em evolução ainda não chegou lá.

const emProducao = projetos.filter((p) => p.situacao === 'producao').length;

export default function Abertura({ idioma }: { idioma: Idioma }) {
  const palavras = marca.slogan.inicio[idioma].split(' ');

  return (
    <section id="inicio" className={styles.abertura}>
      <div className={styles.limite}>
        <div className={styles.texto}>
          <p className={styles.status}>
            <span className={styles.pulso} aria-hidden />
            {preencher(textos.abertura.noAr[idioma], { n: emProducao })}
          </p>

          {/* Cada palavra sobe de trás de uma máscara, uma depois da outra. O
              espaço fica fora da máscara: dentro dela, no fim de uma caixa
              inline-block, o navegador o descarta e as palavras grudam. */}
          <h1 className={styles.titulo}>
            {palavras.map((palavra, i) => (
              <Fragment key={`${palavra}-${i}`}>
                <span className={styles.palavra}>
                  <span style={{ '--i': i } as React.CSSProperties}>{palavra}</span>
                </span>{' '}
              </Fragment>
            ))}
            <span className={styles.palavra}>
              <em style={{ '--i': palavras.length } as React.CSSProperties}>{marca.slogan.fim[idioma]}</em>
            </span>
          </h1>

          <p className={styles.proposta}>{marca.proposta[idioma]}</p>

          <div className={styles.botoes}>
            <Botao href="#produtos" icone="setaDireita">
              {textos.abertura.verProdutos[idioma]}
            </Botao>
            <Botao href="#contato" variante="secundario">
              {textos.navegacao.conversar[idioma]}
            </Botao>
          </div>

          <p className={styles.olho}>
            <span aria-hidden>{'{'}</span> {textos.abertura.olho[idioma]} <span aria-hidden>{'}'}</span>
          </p>
        </div>

        <div className={styles.palco} aria-hidden>
          <div className={styles.halo} />
          <svg className={styles.chave} viewBox="0 0 28 88">
            <path d={CHAVE} />
          </svg>
          <div className={styles.cubo}>
            <CenaRede />
          </div>
          <svg className={`${styles.chave} ${styles.direita}`} viewBox="0 0 28 88">
            <path d={CHAVE} transform="translate(28 0) scale(-1 1)" />
          </svg>
        </div>
      </div>

      <div className={styles.chao} aria-hidden />

      <a href="#numeros" className={styles.rolar} aria-label={textos.abertura.rolar[idioma]}>
        <span />
      </a>
    </section>
  );
}
