import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

// As três fontes do manual da marca. Ficam num arquivo só porque cada idioma
// tem o próprio layout raiz, e os dois precisam das mesmas instâncias: o
// next/font baixa os arquivos no build e serve tudo do próprio site.

/** Títulos e destaques. */
export const titulo = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-titulo',
  display: 'swap',
});

/** Textos. */
export const corpo = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-corpo',
  display: 'swap',
});

/** Código, números e dados. */
export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});
