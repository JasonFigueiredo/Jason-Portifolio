// Projetos que desenvolvi.
// Para adicionar um novo, acrescente um objeto aqui — as seções se montam sozinhas.
// A ordem do array é a ordem que aparece na página.
//
// Textos curtos de propósito: o modal é uma pré-apresentação, não a documentação.
// Quem quiser o detalhe abre o repositório.

export type Situacao = 'producao' | 'ativo' | 'concluido';

export type Imagem = {
  src: string;
  legenda: string;
  /** 'tela' ocupa a largura toda; 'celular' aparece inteira, mais estreita */
  formato: 'tela' | 'celular';
};

/** Um traço marcante da plataforma. Duas ou três palavras no rótulo. */
export type Traco = { rotulo: string; nota: string };

export type Projeto = {
  id: string;
  titulo: string;
  /** uma frase, aparece no card */
  resumo: string;
  /** parágrafo curto, ao lado do card */
  descricao: string;
  /** o que foi construído — frases de 3 a 7 palavras */
  destaques: string[];
  tags: string[];
  /** ids de tecnologias em data/tecnologias.ts */
  tecnologias: string[];
  situacao: Situacao;
  privado: boolean;
  repo?: string;
  /** endereço público onde dá para usar o projeto de verdade */
  site?: { url: string; rotulo: string };
  periodo: string;
  destaque?: boolean;

  /* --- conteúdo do modal --- */

  /** telas do projeto; os SVG em public/projetos são provisórios */
  imagens: Imagem[];
  /** como a plataforma funciona, em 2 ou 3 frases */
  comoFunciona: string;
  /** o que a define — de 3 a 4 traços */
  personalidade: Traco[];
  stack?: { camada: string; ferramenta: string }[];
};

export const projetos: Projeto[] = [
  {
    id: 'orion',
    titulo: 'Orion',
    resumo: 'Plataforma privada de comunicação — texto, voz e compartilhamento de tela.',
    descricao:
      'Comunicação em tempo real para pequenos grupos, rodando em servidor próprio. ' +
      'Chat, salas de voz e compartilhamento de tela numa aplicação só, sem depender de terceiros.',
    destaques: [
      'Voz e tela por WebRTC',
      'Chat em tempo real com busca',
      'PWA instalável no celular',
      'Convites por link e permissões',
    ],
    tags: ['Tempo real', 'WebRTC', 'PWA', 'Full Stack'],
    tecnologias: ['php', 'laravel', 'vue', 'typescript', 'tailwind', 'docker', 'mysql', 'redis', 'nginx'],
    situacao: 'ativo',
    privado: true,
    site: { url: 'https://orionlive.duckdns.org', rotulo: 'Acessar plataforma' },
    periodo: '2026',
    destaque: true,
    imagens: [
      { src: '/projetos/orion-chat.svg', legenda: 'Canais de texto e voz', formato: 'tela' },
      { src: '/projetos/orion-voz.svg', legenda: 'Chamada com tela compartilhada', formato: 'tela' },
    ],
    comoFunciona:
      'O usuário entra num servidor, escolhe um canal e conversa. Canais de texto trocam mensagens ' +
      'por WebSocket; canais de voz abrem uma conexão direta entre os participantes, com um servidor ' +
      'próprio apenas para atravessar redes fechadas. Tudo roda numa máquina doméstica, alcançável ' +
      'por nome e com TLS.',
    personalidade: [
      { rotulo: 'Privado por natureza', nota: 'As conversas não saem do seu servidor.' },
      { rotulo: 'Instantâneo', nota: 'Mensagem, presença e digitação aparecem na hora.' },
      { rotulo: 'Cabe no bolso', nota: 'PWA instalável, pensada para o celular.' },
      { rotulo: 'Documentado', nota: '27 documentos e 13 decisões registradas.' },
    ],
    stack: [
      { camada: 'Backend', ferramenta: 'Laravel 13 · PHP 8.4' },
      { camada: 'Tempo real', ferramenta: 'Laravel Reverb (WebSocket)' },
      { camada: 'Frontend', ferramenta: 'Vue 3 · TypeScript · Tailwind' },
      { camada: 'Mídia', ferramenta: 'WebRTC · Coturn' },
      { camada: 'Dados', ferramenta: 'MySQL 8.4 · Redis 7' },
      { camada: 'Infra', ferramenta: 'Docker · Nginx' },
    ],
  },
  {
    id: 'inova-blocos',
    titulo: 'Inova Blocos',
    resumo: 'Gestão de produção, estoque e entregas de uma fábrica de blocos de concreto.',
    descricao:
      'Software em produção numa fábrica real. Controla o diário de produção, o estoque e a fila ' +
      'de entregas — e avisa quando a produção não vai cobrir os pedidos já fechados.',
    destaques: [
      'Funciona sem rede no chão de fábrica',
      'Estoque calculado, nunca digitado',
      'Alerta de ruptura em tempo real',
      'Papéis com visões separadas',
    ],
    tags: ['Produção', 'PWA Offline', 'Gestão', 'Full Stack'],
    tecnologias: ['php', 'laravel', 'vue', 'javascript', 'tailwind', 'docker', 'mysql', 'redis', 'nginx'],
    situacao: 'producao',
    privado: true,
    periodo: '2026',
    imagens: [
      { src: '/projetos/inova-painel.svg', legenda: 'Painel com estoque e linha de ruptura', formato: 'tela' },
      { src: '/projetos/inova-diario.svg', legenda: 'Diário de bordo sem rede', formato: 'celular' },
    ],
    comoFunciona:
      'O encarregado registra cada traço produzido no celular, mesmo sem sinal — o app guarda no ' +
      'aparelho e envia quando a rede volta. O estoque não é digitado: ele nasce da soma dos ' +
      'movimentos. A partir daí o sistema projeta a fila de entregas e mostra em quantos dias o ' +
      'saldo deixa de cobrir os pedidos.',
    personalidade: [
      { rotulo: 'Offline primeiro', nota: 'O galpão não tem sinal, e o trabalho não para.' },
      { rotulo: 'Números confiáveis', nota: 'Estoque derivado dos movimentos, com testes.' },
      { rotulo: 'Avisa antes', nota: 'A linha de ruptura antecipa a falta.' },
      { rotulo: 'Cada um vê o seu', nota: 'O encarregado não enxerga valores de pagamento.' },
    ],
    stack: [
      { camada: 'Backend', ferramenta: 'Laravel 13 · PHP 8.4' },
      { camada: 'Frontend', ferramenta: 'Inertia · Vue 3 · Tailwind' },
      { camada: 'Offline', ferramenta: 'Service Worker · Dexie' },
      { camada: 'Dados', ferramenta: 'MySQL 8 · Redis' },
      { camada: 'Infra', ferramenta: 'Docker · Nginx · Traefik' },
    ],
  },
  {
    id: 'ecotrack',
    titulo: 'EcoTrack',
    resumo: 'App Android nativo para monitorar e reduzir o consumo de CO₂.',
    descricao:
      'Aplicativo Android em Kotlin. Registra hábitos do dia a dia e traduz cada um em quilos ' +
      'de CO₂, mostrando de onde vem a maior parte da pegada.',
    destaques: [
      'Android nativo em Kotlin',
      'Calculadora de emissões',
      'Histórico por mês',
      'Dados só no aparelho',
    ],
    tags: ['Android Nativo', 'Kotlin', 'Mobile'],
    tecnologias: ['kotlin', 'android'],
    situacao: 'concluido',
    privado: false,
    repo: 'https://github.com/JasonFigueiredo/EcoTrack-Android',
    periodo: '2025',
    imagens: [
      { src: '/projetos/ecotrack-inicio.svg', legenda: 'Pegada da semana por categoria', formato: 'celular' },
      { src: '/projetos/ecotrack-historico.svg', legenda: 'Histórico e calculadora', formato: 'celular' },
    ],
    comoFunciona:
      'O usuário registra o que fez no dia — o trajeto de carro, o consumo de energia, a refeição. ' +
      'O app converte cada hábito em emissão estimada, soma por categoria e acompanha a evolução ' +
      'mês a mês. Nada sai do aparelho.',
    personalidade: [
      { rotulo: 'Convence pelo dado', nota: 'Mostra o número, não faz sermão.' },
      { rotulo: 'Nativo de verdade', nota: 'Kotlin e Android SDK, sem camada web.' },
      { rotulo: 'Fica com você', nota: 'Sem servidor: os dados moram no celular.' },
    ],
    stack: [
      { camada: 'Linguagem', ferramenta: 'Kotlin' },
      { camada: 'Plataforma', ferramenta: 'Android SDK' },
      { camada: 'Dados', ferramenta: 'Armazenamento local' },
    ],
  },
  {
    id: 'portfolio',
    titulo: 'Este portfólio',
    resumo: 'O site que você está lendo, reconstruído em Next.js e React.',
    descricao:
      'Começou como HTML e CSS puros e foi reconstruído em Next.js. Projetos e tecnologias ' +
      'agora vivem em arquivos de dados, e a página se monta a partir deles.',
    destaques: [
      'Conteúdo separado da marcação',
      'Tema claro e escuro sem piscar',
      'Responsivo do celular ao desktop',
      'Publicado na Vercel',
    ],
    tags: ['Next.js', 'React', 'TypeScript'],
    tecnologias: ['nextjs', 'react', 'typescript', 'css'],
    situacao: 'ativo',
    privado: false,
    repo: 'https://github.com/JasonFigueiredo/Jason-Portifolio',
    periodo: '2025 — 2026',
    imagens: [
      { src: '/projetos/portfolio-temas.svg', legenda: 'A mesma página nos dois temas', formato: 'tela' },
    ],
    comoFunciona:
      'Cada projeto e cada tecnologia é um objeto num arquivo de dados. Os componentes só sabem ' +
      'desenhar — acrescentar conteúdo é acrescentar um objeto, nunca escrever marcação nova. ' +
      'A página é gerada como HTML estático, então abre rápido e o Google lê tudo.',
    personalidade: [
      { rotulo: 'Cresce sem inchar', nota: 'Projeto novo é uma entrada, não 30 linhas.' },
      { rotulo: 'Dois temas, um lugar', nota: 'Tokens de cor num arquivo só.' },
      { rotulo: 'Números honestos', nota: 'A contagem descarta código de terceiros.' },
    ],
    stack: [
      { camada: 'Framework', ferramenta: 'Next.js 16' },
      { camada: 'Linguagem', ferramenta: 'TypeScript · React' },
      { camada: 'Estilo', ferramenta: 'CSS Modules' },
      { camada: 'Hospedagem', ferramenta: 'Vercel' },
    ],
  },
  {
    id: 'letssing',
    titulo: 'LetsSing',
    resumo: 'Front-end de uma plataforma de assinatura eletrônica.',
    descricao:
      'MVP acadêmico da FIAP em parceria com a empresa LetsSing, simulando o envio e a ' +
      'assinatura eletrônica de documentos.',
    destaques: [
      'Assinatura desenhada em canvas',
      'Envio e modelos de documento',
      'Acompanhamento do progresso',
    ],
    tags: ['Front-end', 'Acadêmico', 'FIAP'],
    tecnologias: ['javascript', 'html', 'css'],
    situacao: 'concluido',
    privado: false,
    repo: 'https://github.com/JasonFigueiredo/LetsSing_FrontEnd_FIAP',
    periodo: '2024',
    imagens: [
      { src: '/projetos/letssing-assinatura.svg', legenda: 'Assinatura desenhada à mão', formato: 'tela' },
    ],
    comoFunciona:
      'O usuário envia um documento ou parte de um modelo pronto, confere os dados e assina ' +
      'desenhando com o dedo ou o mouse. A tela acompanha quantas assinaturas já foram coletadas.',
    personalidade: [
      { rotulo: 'Assinatura de verdade', nota: 'Traço capturado em canvas, não digitado.' },
      { rotulo: 'Passo a passo', nota: 'Cada etapa confirma antes de seguir.' },
    ],
    stack: [
      { camada: 'Interface', ferramenta: 'HTML · CSS · JavaScript' },
      { camada: 'Assinatura', ferramenta: 'Canvas API' },
    ],
  },
  {
    id: 'fiap-poo',
    titulo: 'Herança & Polimorfismo',
    resumo: 'Exercício de orientação a objetos em Java.',
    descricao:
      'Projeto acadêmico da FIAP para praticar os fundamentos de orientação a objetos: ' +
      'herança, polimorfismo, sobrescrita e sobrecarga.',
    destaques: ['Herança entre classes', 'Sobrescrita e sobrecarga', 'Classe base e subclasses'],
    tags: ['Java', 'POO', 'Acadêmico'],
    tecnologias: ['java'],
    situacao: 'concluido',
    privado: false,
    repo: 'https://github.com/JasonFigueiredo/FIAP-heranca_polimorfismo',
    periodo: '2023',
    imagens: [
      { src: '/projetos/fiap-classes.svg', legenda: 'Hierarquia de classes', formato: 'tela' },
    ],
    comoFunciona:
      'Uma classe base define o comportamento geral e as subclasses o especializam. O mesmo ' +
      'método responde de forma diferente conforme o objeto que o recebe.',
    personalidade: [
      { rotulo: 'Fundamento puro', nota: 'Sem framework, só a linguagem.' },
      { rotulo: 'Concluído', nota: 'Exercício fechado, sem novas versões.' },
    ],
    stack: [{ camada: 'Linguagem', ferramenta: 'Java' }],
  },
];

export const rotuloSituacao: Record<Situacao, string> = {
  producao: 'Em produção',
  ativo: 'Em evolução',
  concluido: 'Concluído',
};
