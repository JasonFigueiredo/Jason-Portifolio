import type { Texto } from './idioma';

// A marca que reúne os sistemas. O nome não se traduz; o slogan, sim.
//
// Por enquanto a marca não tem domínio nem e-mail próprios: o site continua no
// endereço pessoal, e o contato é pelo LinkedIn e pelo GitHub. Quando o domínio
// da marca entrar, muda aqui e em nenhum outro lugar.

type Marca = {
  nome: string;
  /** a última palavra vai em azul, como no manual */
  slogan: { inicio: Texto; fim: Texto };
  /** a frase que segue o slogan na abertura */
  proposta: Texto;
  fundador: string;
  papelDoFundador: Texto;
  site: string;
  linkedin: string;
  github: string;
};

export const marca: Marca = {
  nome: 'JSON Technologies',
  slogan: {
    inicio: { pt: 'Tecnologia projetada para', en: 'Technology engineered for' },
    fim: { pt: 'negócios.', en: 'business.' },
  },
  proposta: {
    pt:
      'Sistemas completos que conectam processos, dados e pessoas — do banco de dados à ' +
      'interface, rodando em produção.',
    en:
      'Complete systems that connect processes, data and people — from the database to the ' +
      'interface, running in production.',
  },
  fundador: 'Jason Figueiredo',
  papelDoFundador: { pt: 'Fundador e desenvolvedor full stack', en: 'Founder and full-stack developer' },
  site: 'https://jasonfigueiredo.com.br',
  linkedin: 'https://www.linkedin.com/in/jasonfigueiredo99',
  github: 'https://github.com/JasonFigueiredo',
};

/** O slogan inteiro, em texto corrido: títulos de aba e descrições. */
export function sloganCompleto(idioma: keyof Texto): string {
  return `${marca.slogan.inicio[idioma]} ${marca.slogan.fim[idioma]}`;
}
