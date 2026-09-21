// Tecnologias com que já trabalhei.
// Para adicionar uma nova, basta acrescentar um objeto aqui — a grade se monta sozinha.
//
// `linhas` sai da contagem de código autoral nos meus repositórios, já descontados
// dependências, builds e templates de terceiros. Percentual não aparece: na vitrine,
// quem passa rápido lê uma barra de porcentagem como barra de habilidade.
// Total apurado: 112.404 linhas.

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
  /** uso fora dos projetos listados, ex.: 'este site' */
  tambem?: string;
  desde: string;
};

export const tecnologias: Tecnologia[] = [
  {
    id: 'php',
    nome: 'PHP',
    icone: 'php',
    categoria: 'linguagem',
    linhas: 37742,
    projetos: ['inova-blocos', 'orion'],
    desde: '2024',
  },
  {
    id: 'vue',
    nome: 'Vue',
    icone: 'vue',
    categoria: 'framework',
    linhas: 25872,
    projetos: ['inova-blocos', 'orion'],
    desde: '2024',
  },
  {
    id: 'kotlin',
    nome: 'Kotlin',
    icone: 'kotlin',
    categoria: 'mobile',
    linhas: 16167,
    projetos: ['minhas-senhas'],
    desde: '2025',
  },
  {
    id: 'javascript',
    nome: 'JavaScript',
    icone: 'js',
    categoria: 'linguagem',
    linhas: 15173,
    projetos: ['inova-blocos', 'orion'],
    desde: '2022',
  },
  {
    id: 'typescript',
    nome: 'TypeScript',
    icone: 'ts',
    categoria: 'linguagem',
    linhas: 9807,
    projetos: ['orion'],
    tambem: 'este site',
    desde: '2025',
  },
  {
    id: 'css',
    nome: 'CSS',
    icone: 'css',
    categoria: 'linguagem',
    linhas: 3917,
    projetos: ['inova-blocos', 'orion', 'minhas-senhas'],
    desde: '2022',
  },
  {
    id: 'html',
    nome: 'HTML',
    icone: 'html',
    categoria: 'linguagem',
    linhas: 3157,
    projetos: ['inova-blocos', 'minhas-senhas'],
    desde: '2022',
  },
  {
    id: 'java',
    nome: 'Java',
    icone: 'java',
    categoria: 'linguagem',
    linhas: 569,
    projetos: [],
    desde: '2023',
  },
  // Ferramentas e plataformas — sem contagem de linhas, mas parte do dia a dia.
  { id: 'laravel', nome: 'Laravel', icone: 'laravel', categoria: 'framework', projetos: ['inova-blocos', 'orion'], desde: '2024' },
  { id: 'react', nome: 'React', icone: 'react', categoria: 'framework', projetos: [], tambem: 'este site', desde: '2025' },
  { id: 'nextjs', nome: 'Next.js', icone: 'nextjs', categoria: 'framework', projetos: [], tambem: 'este site', desde: '2025' },
  { id: 'android', nome: 'Android', icone: 'androidstudio', categoria: 'mobile', projetos: ['minhas-senhas'], desde: '2025' },
  { id: 'docker', nome: 'Docker', icone: 'docker', categoria: 'infra', projetos: ['inova-blocos', 'orion'], desde: '2024' },
  { id: 'mysql', nome: 'MySQL', icone: 'mysql', categoria: 'infra', projetos: ['inova-blocos', 'orion'], desde: '2024' },
  { id: 'redis', nome: 'Redis', icone: 'redis', categoria: 'infra', projetos: ['inova-blocos', 'orion'], desde: '2025' },
  { id: 'nginx', nome: 'Nginx', icone: 'nginx', categoria: 'infra', projetos: ['inova-blocos', 'orion'], desde: '2024' },
  { id: 'tailwind', nome: 'Tailwind', icone: 'tailwind', categoria: 'framework', projetos: ['inova-blocos', 'orion'], desde: '2024' },
  { id: 'svelte', nome: 'Svelte', icone: 'svelte', categoria: 'framework', projetos: ['minhas-senhas'], desde: '2026' },
  { id: 'astro', nome: 'Astro', icone: 'astro', categoria: 'framework', projetos: ['minhas-senhas'], desde: '2026' },
  { id: 'git', nome: 'Git', icone: 'git', categoria: 'infra', projetos: ['inova-blocos', 'orion', 'minhas-senhas'], desde: '2022' },
];

/** Total de linhas autorais, somado a partir da própria lista. */
export const totalLinhas = tecnologias.reduce((soma, t) => soma + (t.linhas ?? 0), 0);

export const categorias: { id: Categoria; rotulo: string }[] = [
  { id: 'linguagem', rotulo: 'Linguagens' },
  { id: 'framework', rotulo: 'Frameworks' },
  { id: 'mobile', rotulo: 'Mobile' },
  { id: 'infra', rotulo: 'Infra' },
];
