// O site existe em português e em inglês. Cada texto que alguém lê mora nos
// dados com as duas versões lado a lado: assim o TypeScript recusa um texto
// novo que chegue sem tradução, e números, imagens e endereços continuam num
// lugar só, sem uma cópia por idioma para desencontrar.

export type Idioma = 'pt' | 'en';

export const idiomas: Idioma[] = ['pt', 'en'];

/** Texto que muda com o idioma. */
export type Texto = Record<Idioma, string>;

/**
 * Rótulo que às vezes não depende de idioma: nome de ferramenta, número,
 * sigla. Escrito como string quando é igual nos dois, como Texto quando não é.
 */
export type Rotulo = string | Texto;

/** O texto no idioma da página. */
export function t(valor: Rotulo, idioma: Idioma): string {
  return typeof valor === 'string' ? valor : valor[idioma];
}

/** Atributo lang do <html> e locale do Open Graph. */
export const lang: Record<Idioma, string> = { pt: 'pt-BR', en: 'en' };
export const locale: Record<Idioma, string> = { pt: 'pt_BR', en: 'en_US' };

/**
 * Português mora na raiz (os endereços que já circulam continuam valendo);
 * inglês, debaixo de /en.
 */
export function caminho(idioma: Idioma, rota = '/'): string {
  if (idioma === 'pt') return rota;
  return rota === '/' ? '/en' : `/en${rota}`;
}

/** Números no formato de cada idioma: 155.510 em português, 155,510 em inglês. */
export function formatar(n: number, idioma: Idioma): string {
  return n.toLocaleString(lang[idioma]);
}
