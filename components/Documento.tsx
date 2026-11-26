import { titulo, corpo, mono } from '@/app/fontes';
import { lang, type Idioma } from '@/data/idioma';

// O <html> e o <body> do site. Cada idioma tem o próprio layout raiz — é o
// jeito de o <html lang> sair certo no HTML estático, sem depender de
// JavaScript —, e os dois montam o documento por aqui, para não divergirem.

// Roda antes da primeira pintura: aplica o tema salvo sem deixar a tela piscar.
// O contrato (chave 'tema' no localStorage, atributo data-theme no <html>) é o
// mesmo de components/BotaoTema.tsx.
//
// Também barra o arraste de qualquer coisa da página — imagem, ícone, vídeo ou
// link —, a pedido do Jason. O CSS (globals.css) cuida disso no Chrome e no
// Safari; o Firefox só obedece cancelando o evento. Fica aqui, e não num
// componente, para valer desde o primeiro instante e em todas as páginas.
const scriptInicial = `
(function () {
  try {
    var salvo = localStorage.getItem('tema');
    var escuroNoSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = salvo || (escuroNoSistema ? 'dark' : 'light');
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
  document.addEventListener('dragstart', function (e) { e.preventDefault(); });
})();
`;

export default function Documento({ idioma, children }: { idioma: Idioma; children: React.ReactNode }) {
  return (
    <html
      lang={lang[idioma]}
      className={`${titulo.variable} ${corpo.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptInicial }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
