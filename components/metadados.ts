import type { Metadata } from 'next';
import { marca, sloganCompleto } from '@/data/marca';
import { caminho, lang, locale, type Idioma } from '@/data/idioma';
import { projetos } from '@/data/projetos';

// Os metadados que os dois idiomas compartilham: título, descrição, Open
// Graph e o aviso aos buscadores de que a mesma página existe na outra língua.

const descricao: Record<Idioma, string> = {
  pt:
    'JSON Technologies, de Jason Figueiredo: sistemas completos, do banco de dados à interface, ' +
    'rodando em produção. Laravel e Vue na web, Kotlin no Android, Rust no desktop.',
  en:
    'JSON Technologies, by Jason Figueiredo: complete systems, from database to interface, ' +
    'running in production. Laravel and Vue on the web, Kotlin on Android, Rust on the desktop.',
};

/**
 * A imagem que aparece quando alguém manda o link (WhatsApp, LinkedIn, X).
 * Arquivo fixo em public/marca, declarado aqui, e não pela convenção
 * opengraph-image do Next: os estudos de caso definem o próprio Open Graph, e
 * aí a imagem herdada do layout se perdia.
 */
function imagemDeCompartilhamento(idioma: Idioma) {
  return [
    {
      url: `/marca/compartilhamento-${idioma}.png`,
      width: 1200,
      height: 630,
      alt:
        idioma === 'pt'
          ? 'JSON Technologies, de Jason Figueiredo: o símbolo {J} ao lado do slogan "Tecnologia projetada para negócios."'
          : 'JSON Technologies, by Jason Figueiredo: the {J} symbol next to the tagline "Technology engineered for business."',
    },
  ];
}

/**
 * Os dois endereços da mesma página, para o hreflang. `rota` é o caminho sem
 * o prefixo de idioma: '/' ou '/projetos/orion'.
 */
export function alternativas(idioma: Idioma, rota: string): NonNullable<Metadata['alternates']> {
  return {
    canonical: caminho(idioma, rota),
    languages: {
      [lang.pt]: caminho('pt', rota),
      [lang.en]: caminho('en', rota),
      'x-default': caminho('pt', rota),
    },
  };
}

export function metadadosDoLayout(idioma: Idioma): Metadata {
  const titulo = `${marca.nome} · ${marca.fundador}`;
  return {
    metadataBase: new URL(marca.site),
    title: { default: `${titulo} — ${sloganCompleto(idioma)}`, template: `%s · ${marca.nome}` },
    description: descricao[idioma],
    openGraph: {
      title: titulo,
      description: descricao[idioma],
      siteName: marca.nome,
      locale: locale[idioma],
      type: 'website',
      images: imagemDeCompartilhamento(idioma),
    },
    // O X só mostra a imagem grande com este tipo de cartão.
    twitter: { card: 'summary_large_image', images: imagemDeCompartilhamento(idioma) },
  };
}

/* --- páginas de projeto, nos dois idiomas --- */

/** Uma página por projeto, gerada no build. */
export function parametrosDosProjetos() {
  return projetos.map((p) => ({ id: p.id }));
}

export function metadadosDoProjeto(idioma: Idioma, id: string): Metadata {
  const projeto = projetos.find((p) => p.id === id);
  if (!projeto) return {};
  return {
    title: projeto.titulo,
    description: projeto.resumo[idioma],
    alternates: alternativas(idioma, `/projetos/${projeto.id}`),
    openGraph: {
      title: `${projeto.titulo} · ${marca.nome}`,
      description: projeto.resumo[idioma],
      locale: locale[idioma],
      type: 'article',
      images: imagemDeCompartilhamento(idioma),
    },
    twitter: { card: 'summary_large_image', images: imagemDeCompartilhamento(idioma) },
  };
}
