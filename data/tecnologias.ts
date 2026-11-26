// Tecnologias com que já trabalhei.
// Para adicionar uma nova, basta acrescentar um objeto aqui — o carrossel se monta sozinho.
//
// `linhas` sai da contagem de código autoral nos meus repositórios, já descontados
// dependências, builds e templates de terceiros. Percentual não aparece: na vitrine,
// quem passa rápido lê uma barra de porcentagem como barra de habilidade.
// Total apurado em setembro de 2026: 112.404 linhas. Em outubro entraram o QualiPT
// e o Ponte Tradutor, contados do mesmo jeito (+43.106): 155.510.
//
// Cada uma diz, curto, para que serve (`funcao`) e o que ganho usando-a (`beneficio`),
// para quem entende um pouco do assunto ver por que ela está ali. O benefício fala do
// que ela faz nos meus sistemas, não de propaganda: se não dá para apontar onde ele
// aparece, não entra.
//
// Nome de tecnologia não se traduz; o que muda com o idioma traz as duas línguas,
// { pt, en } — ver data/idioma.ts.

import type { Texto } from './idioma';

export type Categoria = 'linguagem' | 'framework' | 'mobile' | 'infra';

export type Tecnologia = {
  id: string;
  nome: string;
  /** slug em skillicons.dev */
  icone: string;
  categoria: Categoria;
  /** linhas de código autoral; ausente para ferramentas que não se medem assim */
  linhas?: number;
  /** ids de projetos em data/projetos.ts */
  projetos: string[];
  /** uso fora dos projetos listados, ex.: { pt: 'este site', en: 'this site' } */
  tambem?: Texto;
  desde: string;
  /** para que serve, em uma frase */
  funcao: Texto;
  /** por que uso: o ganho concreto nos meus sistemas, em uma ou duas frases */
  beneficio: Texto;
};

const ESTE_SITE: Texto = { pt: 'este site', en: 'this site' };

export const tecnologias: Tecnologia[] = [
  {
    id: 'php',
    nome: 'PHP',
    icone: 'php',
    categoria: 'linguagem',
    linhas: 50449,
    projetos: ['inova-blocos', 'orion', 'qualipt'],
    desde: '2024',
    funcao: {
      pt: 'A linguagem do servidor: recebe cada pedido, aplica as regras do negócio e conversa com o banco.',
      en: 'The server-side language: it takes each request, applies the business rules and talks to the database.',
    },
    beneficio: {
      pt: 'Madura e rápida desde o PHP 8, roda em qualquer servidor e é a base do Laravel — menos código de infraestrutura, mais regra de negócio.',
      en: 'Mature and fast since PHP 8, runs on any server and powers Laravel — less plumbing code, more business logic.',
    },
  },
  {
    id: 'vue',
    nome: 'Vue',
    icone: 'vue',
    categoria: 'framework',
    linhas: 32543,
    projetos: ['inova-blocos', 'orion', 'qualipt'],
    desde: '2024',
    funcao: {
      pt: 'Framework de interface: monta as telas, que se atualizam sozinhas quando os dados mudam.',
      en: 'Interface framework: it builds the screens, which update on their own when the data changes.',
    },
    beneficio: {
      pt: 'Leve e direto; componentes reaproveitados mantêm dezenas de telas iguais entre si sem repetir código.',
      en: 'Light and straightforward; reused components keep dozens of screens consistent without repeating code.',
    },
  },
  {
    id: 'typescript',
    nome: 'TypeScript',
    icone: 'ts',
    categoria: 'linguagem',
    linhas: 18549,
    projetos: ['orion', 'qualipt', 'ponte'],
    tambem: ESTE_SITE,
    desde: '2025',
    funcao: {
      pt: 'JavaScript com tipos: o editor e o compilador conferem o código antes de ele rodar.',
      en: 'JavaScript with types: the editor and the compiler check the code before it runs.',
    },
    beneficio: {
      pt: 'Pega o erro antes do usuário; num sistema grande, mudar uma peça aponta na hora tudo o que precisa mudar junto.',
      en: 'Catches the bug before the user does; in a large system, changing one piece instantly shows everything that must change with it.',
    },
  },
  {
    id: 'javascript',
    nome: 'JavaScript',
    icone: 'js',
    categoria: 'linguagem',
    linhas: 16424,
    projetos: ['inova-blocos', 'orion', 'qualipt'],
    desde: '2022',
    funcao: {
      pt: 'A linguagem do navegador: dá vida às telas e conversa com o servidor sem recarregar a página.',
      en: 'The language of the browser: it brings screens to life and talks to the server without reloading the page.',
    },
    beneficio: {
      pt: 'Roda em qualquer navegador sem instalar nada — e é o que permite o modo offline e o app instalável no celular.',
      en: 'Runs in any browser with nothing to install — and it is what makes offline mode and the installable phone app possible.',
    },
  },
  {
    id: 'kotlin',
    nome: 'Kotlin',
    icone: 'kotlin',
    categoria: 'mobile',
    linhas: 16167,
    projetos: ['minhas-senhas'],
    desde: '2025',
    funcao: {
      pt: 'A linguagem oficial do Android, que também roda no desktop e no terminal.',
      en: 'The official Android language, which also runs on the desktop and in the terminal.',
    },
    beneficio: {
      pt: 'Um núcleo só para três apps, e proteção contra valor nulo na própria linguagem — menos falhas que derrubam o app.',
      en: 'One core for three apps, and null safety built into the language — fewer crashes that take the app down.',
    },
  },
  {
    id: 'rust',
    nome: 'Rust',
    icone: 'rust',
    categoria: 'linguagem',
    linhas: 13103,
    projetos: ['ponte'],
    desde: '2026',
    funcao: {
      pt: 'Linguagem de sistema: programa nativo, rápido como C, sem coletor de lixo.',
      en: 'A systems language: native programs as fast as C, with no garbage collector.',
    },
    beneficio: {
      pt: 'O compilador barra os erros de memória mais comuns; o tradutor fica leve na bandeja e responde na hora.',
      en: 'The compiler blocks the most common memory bugs; the translator stays light in the tray and answers instantly.',
    },
  },
  {
    id: 'css',
    nome: 'CSS',
    icone: 'css',
    categoria: 'linguagem',
    linhas: 4411,
    projetos: ['inova-blocos', 'orion', 'minhas-senhas', 'qualipt'],
    desde: '2022',
    funcao: {
      pt: 'A linguagem do visual: cores, layout, tema claro e escuro, adaptação ao celular e animação.',
      en: 'The language of looks: colors, layout, light and dark themes, mobile adaptation and animation.',
    },
    beneficio: {
      pt: 'Animação em CSS roda no próprio navegador, leve e suave, sem biblioteca extra — como neste site.',
      en: 'CSS animation runs in the browser itself, light and smooth, with no extra library — like on this site.',
    },
  },
  {
    id: 'html',
    nome: 'HTML',
    icone: 'html',
    categoria: 'linguagem',
    linhas: 3295,
    projetos: ['inova-blocos', 'minhas-senhas'],
    desde: '2022',
    funcao: {
      pt: 'A estrutura de toda página web: títulos, textos, formulários e links.',
      en: 'The structure of every web page: headings, text, forms and links.',
    },
    beneficio: {
      pt: 'Bem escrito, é o que deixa o site acessível a leitores de tela e legível para o Google.',
      en: 'Written well, it is what makes a site accessible to screen readers and readable by Google.',
    },
  },
  {
    id: 'java',
    nome: 'Java',
    icone: 'java',
    categoria: 'linguagem',
    linhas: 569,
    projetos: [],
    desde: '2023',
    funcao: {
      pt: 'Linguagem orientada a objetos, base de sistemas corporativos e da plataforma onde o Android roda.',
      en: 'An object-oriented language, the basis of enterprise systems and of the platform Android runs on.',
    },
    beneficio: {
      pt: 'Entender Java é entender a máquina virtual por baixo do Kotlin — hoje é o Kotlin que ocupa esse lugar nos meus projetos.',
      en: 'Knowing Java means knowing the virtual machine beneath Kotlin — today Kotlin fills that role in my projects.',
    },
  },

  // Ferramentas e plataformas — sem contagem de linhas, mas parte do dia a dia.
  {
    id: 'laravel',
    nome: 'Laravel',
    icone: 'laravel',
    categoria: 'framework',
    projetos: ['inova-blocos', 'orion', 'qualipt'],
    desde: '2024',
    funcao: {
      pt: 'Framework PHP completo: rotas, banco, filas, e-mail e login já vêm prontos.',
      en: 'A complete PHP framework: routing, database, queues, email and login come ready to use.',
    },
    beneficio: {
      pt: 'Proteção contra os ataques mais comuns (CSRF, SQL injection, XSS) de fábrica, numa estrutura que qualquer dev Laravel entende.',
      en: 'Protection against the most common attacks (CSRF, SQL injection, XSS) out of the box, in a structure any Laravel developer understands.',
    },
  },
  {
    id: 'react',
    nome: 'React',
    icone: 'react',
    categoria: 'framework',
    projetos: ['ponte'],
    tambem: ESTE_SITE,
    desde: '2025',
    funcao: {
      pt: 'Biblioteca de interface em componentes, a mais usada do mercado.',
      en: 'A component-based interface library, the most widely used on the market.',
    },
    beneficio: {
      pt: 'Ecossistema enorme e componentes reaproveitáveis; é a base das janelas do Ponte e deste site.',
      en: 'A huge ecosystem and reusable components; it powers the Ponte windows and this site.',
    },
  },
  {
    id: 'nextjs',
    nome: 'Next.js',
    icone: 'nextjs',
    categoria: 'framework',
    projetos: [],
    tambem: ESTE_SITE,
    desde: '2025',
    funcao: {
      pt: 'Framework React para sites: gera as páginas prontas no build, com rotas, fontes e metadados.',
      en: 'A React framework for websites: it builds ready-made pages at build time, with routing, fonts and metadata.',
    },
    beneficio: {
      pt: 'Página estática carrega rápido, o Google lê tudo e hospedar custa pouco — é o que roda este portfólio.',
      en: 'Static pages load fast, Google reads everything and hosting costs little — it is what runs this portfolio.',
    },
  },
  {
    id: 'tauri',
    nome: 'Tauri',
    icone: 'tauri',
    categoria: 'framework',
    projetos: ['ponte'],
    desde: '2026',
    funcao: {
      pt: 'Monta apps de desktop com interface web e núcleo em Rust.',
      en: 'Builds desktop apps with a web interface and a Rust core.',
    },
    beneficio: {
      pt: 'Instalador de poucos megabytes e pouca memória — bem menor que um app Electron —, com acesso nativo ao Windows.',
      en: 'An installer of a few megabytes and low memory use — far smaller than an Electron app — with native access to Windows.',
    },
  },
  {
    id: 'android',
    nome: 'Android',
    icone: 'androidstudio',
    categoria: 'mobile',
    projetos: ['minhas-senhas'],
    desde: '2025',
    funcao: {
      pt: 'O sistema dos celulares: o app roda nativo, com biometria e o cofre de chaves do aparelho.',
      en: 'The phone platform: the app runs natively, with biometrics and the device’s key vault.',
    },
    beneficio: {
      pt: 'Nativo é mais rápido e funciona sem internet; a chave do cofre fica protegida pelo Keystore do próprio aparelho.',
      en: 'Native is faster and works without internet; the vault key is protected by the device’s own Keystore.',
    },
  },
  {
    id: 'docker',
    nome: 'Docker',
    icone: 'docker',
    categoria: 'infra',
    projetos: ['inova-blocos', 'orion', 'qualipt'],
    desde: '2024',
    funcao: {
      pt: 'Empacota o sistema e tudo de que ele precisa em contêineres isolados.',
      en: 'Packs the system and everything it needs into isolated containers.',
    },
    beneficio: {
      pt: 'O mesmo ambiente do desenvolvimento à produção: o que funciona aqui funciona no servidor, e subir tudo de novo leva minutos.',
      en: 'The same environment from development to production: what works here works on the server, and bringing it all back up takes minutes.',
    },
  },
  {
    id: 'mysql',
    nome: 'MySQL',
    icone: 'mysql',
    categoria: 'infra',
    projetos: ['inova-blocos', 'orion', 'qualipt'],
    desde: '2024',
    funcao: {
      pt: 'Banco de dados relacional: guarda os registros em tabelas ligadas, com transações.',
      en: 'A relational database: it stores records in linked tables, with transactions.',
    },
    beneficio: {
      pt: 'Confiável e consistente — no QualiPT, o próprio banco recusa alterar um registro já gravado.',
      en: 'Reliable and consistent — in QualiPT, the database itself refuses to change a record once saved.',
    },
  },
  {
    id: 'redis',
    nome: 'Redis',
    icone: 'redis',
    categoria: 'infra',
    projetos: ['inova-blocos', 'orion'],
    desde: '2025',
    funcao: {
      pt: 'Banco em memória, para filas de tarefas, cache e sessões.',
      en: 'An in-memory store for task queues, caching and sessions.',
    },
    beneficio: {
      pt: 'Responde em microssegundos e tira do caminho do usuário o que é lento: a tarefa roda em segundo plano.',
      en: 'Answers in microseconds and moves slow work out of the user’s way: the task runs in the background.',
    },
  },
  {
    id: 'nginx',
    nome: 'Nginx',
    icone: 'nginx',
    categoria: 'infra',
    projetos: ['inova-blocos', 'orion', 'qualipt'],
    desde: '2024',
    funcao: {
      pt: 'Servidor web na frente do sistema: entrega os arquivos e repassa os pedidos à aplicação.',
      en: 'The web server in front of the system: it serves files and forwards requests to the application.',
    },
    beneficio: {
      pt: 'Aguenta muitas conexões com pouca memória e entrega imagens e scripts direto, sem ocupar a aplicação.',
      en: 'Handles many connections with little memory and serves images and scripts directly, without tying up the application.',
    },
  },
  {
    id: 'tailwind',
    nome: 'Tailwind',
    icone: 'tailwind',
    categoria: 'framework',
    projetos: ['inova-blocos', 'orion', 'qualipt', 'ponte'],
    desde: '2024',
    funcao: {
      pt: 'Framework de CSS com classes prontas para montar o visual direto na tela.',
      en: 'A CSS framework with ready-made classes to build the look right on the screen.',
    },
    beneficio: {
      pt: 'Interface consistente e rápida de construir; no build, só o CSS usado vai para o usuário — página mais leve.',
      en: 'A consistent interface that is fast to build; at build time only the CSS in use ships to the user — a lighter page.',
    },
  },
  {
    id: 'svelte',
    nome: 'Svelte',
    icone: 'svelte',
    categoria: 'framework',
    projetos: ['minhas-senhas'],
    desde: '2026',
    funcao: {
      pt: 'Framework de interface que vira JavaScript puro na compilação.',
      en: 'An interface framework that compiles down to plain JavaScript.',
    },
    beneficio: {
      pt: 'Sem framework pesado no navegador: a demonstração do Minhas Senhas carrega rápido e roda inteira no navegador.',
      en: 'No heavy framework in the browser: the Minhas Senhas demo loads fast and runs entirely in the browser.',
    },
  },
  {
    id: 'astro',
    nome: 'Astro',
    icone: 'astro',
    categoria: 'framework',
    projetos: ['minhas-senhas'],
    desde: '2026',
    funcao: {
      pt: 'Gerador de sites que entrega HTML pronto e só carrega JavaScript onde precisa.',
      en: 'A site generator that ships ready HTML and only loads JavaScript where it is needed.',
    },
    beneficio: {
      pt: 'Página pública leve e rápida, com o JavaScript só na parte interativa da demonstração.',
      en: 'A light, fast public page, with JavaScript only in the interactive part of the demo.',
    },
  },
  {
    id: 'git',
    nome: 'Git',
    icone: 'git',
    categoria: 'infra',
    projetos: ['inova-blocos', 'orion', 'minhas-senhas', 'qualipt', 'ponte'],
    desde: '2022',
    funcao: {
      pt: 'Controle de versão: registra cada mudança do código, quem fez e por quê.',
      en: 'Version control: it records every code change, who made it and why.',
    },
    beneficio: {
      pt: 'Histórico completo e volta segura a qualquer versão — em todos os projetos, ao lado dos registros de decisão.',
      en: 'Full history and a safe way back to any version — in every project, alongside the decision records.',
    },
  },
];

/** Total de linhas autorais, somado a partir da própria lista. */
export const totalLinhas = tecnologias.reduce((soma, t) => soma + (t.linhas ?? 0), 0);

export const categorias: { id: Categoria; rotulo: Texto }[] = [
  { id: 'linguagem', rotulo: { pt: 'Linguagens', en: 'Languages' } },
  { id: 'framework', rotulo: { pt: 'Frameworks', en: 'Frameworks' } },
  { id: 'mobile', rotulo: { pt: 'Mobile', en: 'Mobile' } },
  { id: 'infra', rotulo: { pt: 'Infra', en: 'Infra' } },
];
