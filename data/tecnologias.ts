// Tecnologias com que já trabalhei.
// Para adicionar uma nova, basta acrescentar um objeto aqui — a grade se monta sozinha.
//
// `linhas` e `percentual` saem da contagem de código autoral nos meus repositórios,
// já descontados dependências, builds e templates de terceiros.
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
  percentual?: number;
  /** ids de projetos em data/projetos.ts */
  projetos: string[];
  desde: string;
};

export const tecnologias: Tecnologia[] = [
  {
    id: 'php',
    nome: 'PHP',
    icone: 'php',
    categoria: 'linguagem',
    linhas: 37742,
    percentual: 33.6,
    projetos: ['orion', 'inova-blocos'],
    desde: '2024',
  },
  {
    id: 'vue',
    nome: 'Vue',
    icone: 'vue',
    categoria: 'framework',
    linhas: 25872,
    percentual: 23.0,
    projetos: ['orion', 'inova-blocos'],
    desde: '2024',
  },
  {
    id: 'kotlin',
    nome: 'Kotlin',
    icone: 'kotlin',
    categoria: 'mobile',
    linhas: 16167,
    percentual: 14.4,
    projetos: ['ecotrack'],
    desde: '2025',
  },
  {
    id: 'javascript',
    nome: 'JavaScript',
    icone: 'js',
    categoria: 'linguagem',
    linhas: 15173,
    percentual: 13.5,
    projetos: ['orion', 'inova-blocos', 'letssing', 'portfolio'],
    desde: '2022',
  },
  {
    id: 'typescript',
    nome: 'TypeScript',
    icone: 'ts',
    categoria: 'linguagem',
    linhas: 9807,
    percentual: 8.7,
    projetos: ['orion', 'portfolio'],
    desde: '2025',
  },
  {
    id: 'css',
    nome: 'CSS',
    icone: 'css',
    categoria: 'linguagem',
    linhas: 3917,
    percentual: 3.5,
    projetos: ['orion', 'inova-blocos', 'letssing', 'portfolio'],
    desde: '2022',
  },
  {
    id: 'html',
    nome: 'HTML',
    icone: 'html',
    categoria: 'linguagem',
    linhas: 3157,
    percentual: 2.8,
    projetos: ['inova-blocos', 'letssing', 'portfolio'],
    desde: '2022',
  },
  {
    id: 'java',
    nome: 'Java',
    icone: 'java',
    categoria: 'linguagem',
    linhas: 569,
    percentual: 0.5,
    projetos: ['fiap-poo'],
    desde: '2023',
  },
  // Ferramentas e plataformas — sem contagem de linhas, mas parte do dia a dia.
  { id: 'laravel', nome: 'Laravel', icone: 'laravel', categoria: 'framework', projetos: ['orion', 'inova-blocos'], desde: '2024' },
  { id: 'react', nome: 'React', icone: 'react', categoria: 'framework', projetos: ['portfolio'], desde: '2025' },
  { id: 'nextjs', nome: 'Next.js', icone: 'nextjs', categoria: 'framework', projetos: ['portfolio'], desde: '2025' },
  { id: 'android', nome: 'Android', icone: 'androidstudio', categoria: 'mobile', projetos: ['ecotrack'], desde: '2025' },
  { id: 'docker', nome: 'Docker', icone: 'docker', categoria: 'infra', projetos: ['orion', 'inova-blocos'], desde: '2024' },
  { id: 'mysql', nome: 'MySQL', icone: 'mysql', categoria: 'infra', projetos: ['orion', 'inova-blocos'], desde: '2024' },
  { id: 'redis', nome: 'Redis', icone: 'redis', categoria: 'infra', projetos: ['orion', 'inova-blocos'], desde: '2025' },
  { id: 'nginx', nome: 'Nginx', icone: 'nginx', categoria: 'infra', projetos: ['orion', 'inova-blocos'], desde: '2024' },
  { id: 'tailwind', nome: 'Tailwind', icone: 'tailwind', categoria: 'framework', projetos: ['orion', 'inova-blocos'], desde: '2024' },
  { id: 'git', nome: 'Git', icone: 'git', categoria: 'infra', projetos: ['orion', 'inova-blocos', 'ecotrack', 'portfolio'], desde: '2022' },
];

/** Total de linhas autorais, somado a partir da própria lista. */
export const totalLinhas = tecnologias.reduce((soma, t) => soma + (t.linhas ?? 0), 0);

export const categorias: { id: Categoria; rotulo: string }[] = [
  { id: 'linguagem', rotulo: 'Linguagens' },
  { id: 'framework', rotulo: 'Frameworks' },
  { id: 'mobile', rotulo: 'Mobile' },
  { id: 'infra', rotulo: 'Infra' },
];
