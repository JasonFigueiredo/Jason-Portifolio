import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const titulo = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-titulo',
  display: 'swap',
});

const corpo = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-corpo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jason Figueiredo — Desenvolvedor Full Stack',
  description:
    'Portfólio de Jason Figueiredo. Desenvolvimento full stack com Laravel, Vue e React, ' +
    'e aplicativos Android nativos em Kotlin.',
  openGraph: {
    title: 'Jason Figueiredo — Desenvolvedor Full Stack',
    description: 'Projetos, tecnologias e trajetória.',
    locale: 'pt_BR',
    type: 'website',
  },
};

// Roda antes da primeira pintura: aplica o tema salvo sem deixar a tela piscar.
const scriptTema = `
(function () {
  try {
    var salvo = localStorage.getItem('tema');
    var escuroNoSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = salvo || (escuroNoSistema ? 'dark' : 'light');
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${titulo.variable} ${corpo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
