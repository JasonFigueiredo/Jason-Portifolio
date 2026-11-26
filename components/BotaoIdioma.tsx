import type { Idioma } from '@/data/idioma';
import { textos } from '@/data/textos';
import Icone from './Icone';
import styles from './BotaoIdioma.module.css';

// Trocar de idioma é ir para a mesma página na outra língua: um link comum.
// Sem estado e sem JavaScript — o endereço já diz o idioma, então dá para
// mandar a versão em inglês para alguém e ela abre em inglês.
//
// É um <a>, não o Link do Next: cada idioma tem o próprio layout raiz, e a
// troca entre eles recarrega a página de qualquer jeito.

export default function BotaoIdioma({
  idioma,
  alternativo,
  className,
}: {
  idioma: Idioma;
  /** o endereço desta mesma página no outro idioma */
  alternativo: string;
  className?: string;
}) {
  const outro = idioma === 'pt' ? 'en' : 'pt';

  return (
    <a
      href={alternativo}
      hrefLang={outro === 'pt' ? 'pt-BR' : 'en'}
      lang={outro === 'pt' ? 'pt-BR' : 'en'}
      className={`${styles.botao} ${className ?? ''}`}
      aria-label={textos.idioma.outro[idioma]}
      title={textos.idioma.outro[idioma]}
    >
      <Icone nome="globo" tamanho={16} />
      <span>{textos.idioma.sigla[idioma]}</span>
    </a>
  );
}
