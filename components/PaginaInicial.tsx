import { caminho, type Idioma } from '@/data/idioma';
import FundoVivo from './FundoVivo';
import Cabecalho from './Cabecalho';
import Abertura from './Abertura';
import Numeros from './Numeros';
import Servicos from './Servicos';
import Produtos from './Produtos';
import Processo from './Processo';
import Tecnologias from './Tecnologias';
import Fundador from './Fundador';
import Contato from './Contato';
import Rodape from './Rodape';
import Revelacoes from './Revelacoes';

// A home inteira, igual nos dois idiomas: as rotas de app/ só dizem qual.

export default function PaginaInicial({ idioma }: { idioma: Idioma }) {
  const outro: Idioma = idioma === 'pt' ? 'en' : 'pt';

  return (
    <>
      <FundoVivo />
      <Cabecalho idioma={idioma} alternativo={caminho(outro, '/')} />
      <main id="conteudo">
        <Abertura idioma={idioma} />
        <Numeros idioma={idioma} />
        <Servicos idioma={idioma} />
        <Produtos idioma={idioma} />
        <Processo idioma={idioma} />
        <Tecnologias idioma={idioma} />
        <Fundador idioma={idioma} />
        <Contato idioma={idioma} />
      </main>
      <Rodape idioma={idioma} />
      <Revelacoes />
    </>
  );
}
