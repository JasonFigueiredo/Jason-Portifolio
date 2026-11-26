import type { Texto } from './idioma';

// Os textos da interface: menus, títulos de seção, botões e rótulos. O
// conteúdo de cada projeto mora em projetos.ts; aqui fica só a moldura.
// Onde aparece {n}, o componente põe um número calculado dos dados.

export const textos = {
  navegacao: {
    rotulo: { pt: 'Navegação principal', en: 'Main navigation' },
    rodape: { pt: 'Navegação do rodapé', en: 'Footer navigation' },
    inicio: { pt: 'Início', en: 'Home' },
    servicos: { pt: 'Serviços', en: 'Services' },
    produtos: { pt: 'Produtos', en: 'Products' },
    processo: { pt: 'Processo', en: 'Process' },
    tecnologias: { pt: 'Tecnologias', en: 'Technologies' },
    fundador: { pt: 'Fundador', en: 'Founder' },
    contato: { pt: 'Contato', en: 'Contact' },
    conversar: { pt: 'Vamos conversar', en: "Let's talk" },
    abrirMenu: { pt: 'Abrir menu', en: 'Open menu' },
    fecharMenu: { pt: 'Fechar menu', en: 'Close menu' },
    pularParaConteudo: { pt: 'Pular para o conteúdo', en: 'Skip to content' },
  },

  tema: {
    paraClaro: { pt: 'Mudar para tema claro', en: 'Switch to light theme' },
    paraEscuro: { pt: 'Mudar para tema escuro', en: 'Switch to dark theme' },
  },

  idioma: {
    /** o rótulo do botão aponta para o outro idioma, escrito nele */
    outro: { pt: 'Read in English', en: 'Ler em português' },
    sigla: { pt: 'EN', en: 'PT' },
  },

  abertura: {
    olho: { pt: 'Sistemas sob medida · do banco à interface', en: 'Custom systems · from database to interface' },
    verProdutos: { pt: 'Ver produtos', en: 'See products' },
    noAr: { pt: '{n} sistemas em produção agora', en: '{n} systems in production right now' },
    rolar: { pt: 'Rolar para ver mais', en: 'Scroll for more' },
  },

  numeros: {
    rotulo: { pt: 'Em números', en: 'By the numbers' },
    sistemas: { pt: 'sistemas construídos de ponta a ponta', en: 'systems built end to end' },
    producao: { pt: 'em produção, em servidor próprio', en: 'in production, on self-hosted servers' },
    linhas: { pt: 'linhas de código autoral', en: 'lines of original code' },
    decisoes: { pt: 'decisões técnicas registradas', en: 'technical decisions on record' },
    tecnologias: { pt: 'tecnologias em uso', en: 'technologies in use' },
    nota: {
      pt: 'Contados nos repositórios, não estimados. Dependências e código de terceiros ficam de fora.',
      en: 'Counted in the repositories, not estimated. Dependencies and third-party code are left out.',
    },
  },

  servicos: {
    titulo: { pt: 'Cinco frentes, cada uma com prova', en: 'Five fronts, each one with proof' },
    chamada: {
      pt: 'O que a JSON Technologies entrega — e onde dá para conferir cada coisa.',
      en: 'What JSON Technologies delivers — and where you can check each one.',
    },
    provadoEm: { pt: 'Provado em', en: 'Proven in' },
  },

  produtos: {
    titulo: { pt: 'Sistemas que rodam de verdade', en: 'Systems that actually run' },
    chamada: {
      pt: 'Sistemas construídos do banco de dados à interface. {n} rodam em produção hoje.',
      en: 'Systems built from the database to the interface. {n} run in production today.',
    },
    decisaoChave: { pt: 'Decisão-chave', en: 'Key decision' },
    lerCaso: { pt: 'Ler estudo de caso', en: 'Read the case study' },
    outros: { pt: 'Outros projetos', en: 'Other projects' },
    ano: { pt: 'Ano', en: 'Year' },
    projeto: { pt: 'Projeto', en: 'Project' },
    oQueE: { pt: 'O que é', en: 'What it is' },
    feitoCom: { pt: 'Feito com', en: 'Built with' },
    demo: { pt: 'Gravação real, com dados de demonstração', en: 'Real recording, with demo data' },
    pausar: { pt: 'Pausar demonstração', en: 'Pause demo' },
    tocar: { pt: 'Tocar demonstração', en: 'Play demo' },
  },

  processo: {
    titulo: { pt: 'Do problema ao sistema no ar', en: 'From problem to live system' },
    chamada: {
      pt: 'O mesmo caminho em todo projeto, e cada etapa deixa uma prova que dá para conferir.',
      en: 'The same path on every project, and each step leaves proof you can check.',
    },
    passos: [
      {
        titulo: { pt: 'Entender o problema', en: 'Understand the problem' },
        texto: {
          pt: 'Antes do código, os limites reais: galpão sem sinal, uma planilha que já era a verdade, dois papéis que não podem ver o mesmo dado.',
          en: 'Before any code, the real limits: a warehouse with no signal, a spreadsheet that was already the source of truth, two roles that must not see the same data.',
        },
        rotulo: { pt: 'restrições mapeadas nos estudos de caso', en: 'constraints mapped in the case studies' },
      },
      {
        titulo: { pt: 'Decidir por escrito', en: 'Decide in writing' },
        texto: {
          pt: 'Cada escolha de arquitetura vira um registro: o motivo, o que ficou de fora e por quê.',
          en: 'Every architecture choice becomes a record: the reason, what was left out and why.',
        },
        rotulo: { pt: 'decisões registradas', en: 'decisions on record' },
      },
      {
        titulo: { pt: 'Provar com testes', en: 'Prove it with tests' },
        texto: {
          pt: 'Testes no mesmo banco da produção e roteiros que abrem um navegador de verdade.',
          en: 'Tests against the same database as production, and scripts that drive a real browser.',
        },
        rotulo: { pt: 'testes automatizados', en: 'automated tests' },
      },
      {
        titulo: { pt: 'Pôr no ar e cuidar', en: 'Ship it and look after it' },
        texto: {
          pt: 'Servidor próprio, TLS, backup e o mesmo ambiente do desenvolvimento à produção.',
          en: 'Self-hosted server, TLS, backups and the same environment from development to production.',
        },
        rotulo: { pt: 'sistemas em produção', en: 'systems in production' },
      },
    ],
  },

  tecnologias: {
    titulo: { pt: 'Ferramentas, medidas em código', en: 'Tools, measured in code' },
    chamada: {
      pt: 'Com o que eu trabalho — e o quanto. São {n} linhas de código autoral nos meus repositórios, já descontadas dependências e bibliotecas de terceiros.',
      en: 'What I work with — and how much. {n} lines of original code across my repositories, excluding dependencies and third-party libraries.',
    },
    projeto: { pt: 'projeto', en: 'project' },
    projetos: { pt: 'projetos', en: 'projects' },
    desde: { pt: 'desde', en: 'since' },
    linhas: { pt: 'linhas', en: 'lines' },
    linhasDeCodigo: { pt: 'Linhas', en: 'Lines' },
    desdeRotulo: { pt: 'Desde', en: 'Since' },
    projetosRotulo: { pt: 'Projetos', en: 'Projects' },
    paraQueServe: { pt: 'Para que serve', en: 'What it does' },
    porQueUso: { pt: 'Por que uso', en: 'Why I use it' },
    dica: {
      pt: 'Passe o mouse sobre uma tecnologia para parar e ver os detalhes.',
      en: 'Hover over a technology to pause and see the details.',
    },
    verTodas: { pt: 'Ver todas', en: 'See all' },
    emMovimento: { pt: 'Pôr em movimento', en: 'Back to motion' },
  },

  fundador: {
    titulo: { pt: 'Quem está por trás', en: "Who's behind it" },
    bio: [
      {
        pt:
          'Desenvolvedor full stack. Construo sistemas que rodam em produção — Laravel e Vue na ' +
          'web, Kotlin no Android, Rust no desktop — e cuido deles do servidor à tela.',
        en:
          'Full-stack developer. I build systems that run in production — Laravel and Vue on the ' +
          'web, Kotlin on Android, Rust on the desktop — and look after them from server to screen.',
      },
      {
        pt:
          'A JSON Technologies é a marca que reúne esse trabalho: cada produto aqui foi pensado, ' +
          'escrito, testado e publicado por mim.',
        en:
          'JSON Technologies is the brand that brings this work together: every product here was ' +
          'designed, written, tested and shipped by me.',
      },
    ],
    formacao: { pt: 'Formação', en: 'Education' },
    curso: {
      pt: 'Tecnólogo em Análise e Desenvolvimento de Sistemas — FIAP',
      en: 'Associate degree in Systems Analysis and Development — FIAP',
    },
    ondeMeAchar: { pt: 'Onde me achar', en: 'Find me' },
  },

  contato: {
    titulo: { pt: 'Vamos construir o seu sistema?', en: "Let's build your system" },
    texto: {
      pt: 'Conte o problema. Eu volto com o caminho, o prazo e o que dá para provar no fim.',
      en: "Tell me the problem. I'll come back with the path, the timeline and what can be proven at the end.",
    },
    linkedin: { pt: 'Falar no LinkedIn', en: 'Message on LinkedIn' },
    github: { pt: 'Ver GitHub', en: 'See GitHub' },
    feitoCom: { pt: 'Feito com Next.js, sem biblioteca de animação', en: 'Built with Next.js, no animation library' },
  },

  caso: {
    produtos: { pt: 'Produtos', en: 'Products' },
    proximo: { pt: 'Próximo', en: 'Next' },
    privado: {
      pt: 'Código privado — o que foi construído e por quê está abaixo',
      en: 'Private code — what was built and why is below',
    },
    verGithub: { pt: 'Ver no GitHub', en: 'See on GitHub' },
    papel: { pt: 'Papel', en: 'Role' },
    paraQuem: { pt: 'Para quem', en: 'For whom' },
    ondeRoda: { pt: 'Onde roda', en: 'Where it runs' },
    problema: { pt: 'O problema', en: 'The problem' },
    oQueFaz: { pt: 'O que faz', en: 'What it does' },
    oQueFazNota: { pt: 'Do ponto de vista de quem usa', en: 'From the user’s point of view' },
    demo: { pt: 'Em movimento', en: 'In motion' },
    decisoes: { pt: 'Decisões', en: 'Decisions' },
    decisoesNota: {
      pt: 'Cada uma com a alternativa descartada',
      en: 'Each with the alternative left out',
    },
    decisoesDeTotal: {
      pt: '{n} das {total} registradas, cada uma com a alternativa descartada',
      en: '{n} of {total} on record, each with the alternative left out',
    },
    porque: { pt: 'Por quê', en: 'Why' },
    descartado: { pt: 'Descartado', en: 'Left out' },
    comoSeEncaixa: { pt: 'Como se encaixa', en: 'How it fits together' },
    comOQue: { pt: 'Com o quê', en: 'Built with' },
    comOQueNota: { pt: 'Cada peça com o trabalho que faz aqui', en: 'Each piece and the job it does here' },
    telas: { pt: 'Telas', en: 'Screens' },
    abrirTela: { pt: 'Abrir no tamanho real', en: 'Open full size' },
    deuErrado: { pt: 'O que deu errado', en: 'What went wrong' },
    proximosPassos: { pt: 'Próximos passos', en: 'Next steps' },
    todos: { pt: 'Todos os produtos', en: 'All products' },
    proximoProjeto: { pt: 'Próximo produto', en: 'Next product' },
    arquitetura: { pt: 'Arquitetura', en: 'Architecture' },
    arraste: {
      pt: 'Arraste para o lado para ver o diagrama inteiro.',
      en: 'Swipe sideways to see the whole diagram.',
    },
  },

  naoEncontrada: {
    titulo: { pt: 'Página não encontrada', en: 'Page not found' },
    texto: { pt: 'Este endereço não existe — ou mudou de lugar.', en: 'This address does not exist — or it moved.' },
    voltar: { pt: 'Voltar ao início', en: 'Back to home' },
  },
} satisfies Record<string, Record<string, Texto | Texto[] | { [k: string]: Texto }[]>>;

/** Troca {chave} pelos valores, depois de escolher o idioma. */
export function preencher(texto: string, valores: Record<string, string | number>): string {
  return texto.replace(/\{(\w+)\}/g, (_, chave: string) => String(valores[chave] ?? `{${chave}}`));
}
