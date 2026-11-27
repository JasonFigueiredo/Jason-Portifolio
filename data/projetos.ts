// Projetos que desenvolvi.
// Para adicionar um novo, acrescente um objeto aqui — a home e a página
// /projetos/<id> se montam sozinhas. A ordem do array é a ordem da página.
//
// Cada texto que alguém lê traz as duas línguas lado a lado, { pt, en } (ver
// data/idioma.ts): o tipo recusa um texto novo sem tradução. Nome de
// ferramenta, número e sigla iguais nos dois idiomas ficam como string simples.
//
// Só entra o que roda em produção. Trabalho de faculdade ficou de fora.
//
// Orion, Inova Blocos e Minhas Senhas são repositórios privados: tudo aqui
// descreve o que foi construído e por quê, nunca o código. Os números vêm da
// contagem nos próprios repositórios e das medições que eles documentam.

import type { Texto, Rotulo } from './idioma';

export type Situacao = 'producao' | 'ativo' | 'concluido';

export type Imagem = {
  src: string;
  legenda: Texto;
  /**
   * 'tela' ocupa a largura toda; 'celular' aparece inteira, mais estreita;
   * 'cartaz' é peça de apresentação já composta — inteira e sem a moldura de
   * janela, que ela já desenha por dentro
   */
  formato: 'tela' | 'celular' | 'cartaz';
  /** o que a tela mostra, para quem não vai abrir a imagem; a legenda vira título */
  texto?: Texto;
};

/**
 * Uma gravação de tela do sistema de verdade, com dados de demonstração —
 * gerada por scripts/capturas, nunca por IA. Dois formatos porque nem todo
 * navegador toca WebM; o pôster aparece antes de carregar e para quem pediu
 * menos movimento.
 */
export type Demo = { webm: string; mp4: string; poster: string };

/** O que o produto faz, do ponto de vista de quem usa. */
export type Recurso = { titulo: Texto; texto: Texto };

/**
 * Um número que qualquer um pode conferir. Os três primeiros vão para a home.
 * O valor é string simples quando é só número ou símbolo, como '330+'.
 */
export type Prova = { valor: Rotulo; rotulo: Texto };

/** Um limite que moldou o projeto. */
export type Restricao = { rotulo: Texto; nota: Texto };

/** Uma decisão técnica, com o motivo e a alternativa que ficou de fora. */
export type Decisao = {
  titulo: Texto;
  /**
   * número do registro de decisão (ADR), quando existe. 'ADR-007' é igual nos
   * dois idiomas; o selo do Ponte ('Nº 010') muda e vai como Texto
   */
  adr?: Rotulo;
  porque: Texto;
  descartado: Texto;
};

/**
 * Uma caixa do diagrama, posicionada numa grade de colunas e linhas. Título e
 * nota são string simples quando são nome de ferramenta, iguais nos dois idiomas.
 */
export type Caixa = {
  id: string;
  titulo: Rotulo;
  nota: Rotulo;
  coluna: number;
  linha: number;
  /** contorno forte: as pontas que o usuário toca e o coração do sistema */
  forte?: boolean;
};

export type Ligacao = {
  de: string;
  para: string;
  rotulo?: Rotulo;
  /** tracejada: o caminho que não passa pelo servidor, ou que só vale sem rede */
  tracejada?: boolean;
  /** seta nas duas pontas */
  dupla?: boolean;
  /** entre caixas em linha e coluna diferentes: anda primeiro na vertical (padrão) ou na horizontal */
  rota?: 'vh' | 'hv';
};

export type Arquitetura = {
  legenda: Texto;
  caixas: Caixa[];
  ligacoes: Ligacao[];
};

/** Uma camada da stack e o trabalho que ela faz neste projeto. */
export type Camada = { camada: Rotulo; ferramenta: Rotulo; papel: Texto };

export type Projeto = {
  id: string;
  /** nome do produto: não se traduz */
  titulo: string;
  /** uma frase: abre o destaque da home e a página do projeto */
  resumo: Texto;
  papel: Texto;
  paraQuem: Texto;
  ondeRoda: Texto;
  /** ids de tecnologias em data/tecnologias.ts */
  tecnologias: string[];
  situacao: Situacao;
  privado: boolean;
  repo?: string;
  /** endereço público onde dá para usar ou experimentar o projeto */
  site?: { url: string; rotulo: Texto };
  periodo: string;
  /** vai para a vitrine da home; os demais entram no índice abaixo dela */
  destaque?: boolean;
  /** a imagem da vitrine, quando não é a capa do estudo de caso (imagens[0]) */
  vitrine?: Imagem;

  provas: Prova[];
  /** a decisão que resume o projeto, em duas frases, para a home */
  decisaoChave: { texto: Texto; adr?: Rotulo };

  /* --- página do projeto --- */

  problema: Texto;
  restricoes: Restricao[];
  recursos?: Recurso[];
  decisoes: Decisao[];
  /** quantas decisões o repositório registra ao todo, quando há ADRs */
  adrs?: number;
  /**
   * testes automatizados contados no repositório — o número exato, não o
   * arredondado das provas. A home soma os de todos os projetos.
   */
  testes?: number;
  arquitetura: Arquitetura;
  stack: Camada[];
  /** o problema mais difícil e como foi resolvido, em parágrafos */
  dificil: { titulo: Texto; texto: Texto[] };
  proximos?: Texto;
  /**
   * a primeira é a capa; as demais vão para "Telas". Os SVG em public/projetos
   * são mockups provisórios; os WebP, capturas reais
   */
  imagens: Imagem[];
  /**
   * gravação real do sistema, com dados de demonstração. Na vitrine da home
   * toma o lugar da capa — a não ser que o projeto declare `vitrine`, que é
   * escolha explícita e vence. No estudo de caso, vira o bloco "Em movimento".
   */
  demo?: Demo;
};

export const projetos: Projeto[] = [
  {
    id: 'inova-blocos',
    titulo: 'Inova Blocos',
    resumo: {
      pt:
        'Produção, estoque e entregas de uma fábrica de blocos de concreto — e o aviso de quando ' +
        'a produção não vai cobrir os pedidos já fechados.',
      en:
        'Production, inventory and deliveries for a concrete block factory — and a warning when ' +
        'production won’t cover the orders already booked.',
    },
    papel: { pt: 'Tudo: banco, API, interface e servidor', en: 'Everything: database, API, interface and server' },
    paraQuem: { pt: 'O dono da fábrica e o encarregado da produção', en: 'The factory owner and the production foreman' },
    ondeRoda: {
      pt: 'Servidor próprio; o diário, no celular do galpão',
      en: 'Self-hosted server; the daily log runs on the shop-floor phone',
    },
    tecnologias: ['php', 'laravel', 'vue', 'javascript', 'tailwind', 'docker', 'mysql', 'redis', 'nginx'],
    situacao: 'producao',
    privado: true,
    site: {
      url: 'https://inovablocos.jasonfigueiredo.com.br/conheca',
      rotulo: { pt: 'Conhecer a plataforma', en: 'Explore the platform' },
    },
    periodo: '2026',
    destaque: true,
    testes: 336,
    demo: {
      webm: '/projetos/inova-demo.webm',
      mp4: '/projetos/inova-demo.mp4',
      poster: '/projetos/inova-demo.webp',
    },

    provas: [
      {
        valor: '0',
        rotulo: {
          pt: 'campos de estoque digitados — o saldo é calculado',
          en: 'inventory fields typed in by hand — the balance is calculated',
        },
      },
      { valor: '330+', rotulo: { pt: 'testes, no servidor e na interface', en: 'tests, on the server and in the interface' } },
      { valor: '11', rotulo: { pt: 'telas, do diário ao financeiro', en: 'screens, from the daily log to finance' } },
    ],
    decisaoChave: {
      texto: {
        pt:
          'O diário grava no próprio celular e envia quando a rede volta. Cada lançamento leva ' +
          'um identificador único, então reenviar nunca duplica.',
        en:
          'The daily log saves on the phone itself and sends when the network comes back. Each ' +
          'entry carries a unique ID, so resending never creates a duplicate.',
      },
    },

    problema: {
      pt:
        'A fábrica controlava a produção e a fila de entregas numa planilha de Excel. O sistema ' +
        'substitui a planilha: registra cada etapa da produção, calcula o estoque a partir dos ' +
        'movimentos e projeta a fila de entregas — mostrando em quantos dias o saldo deixa de ' +
        'cobrir os pedidos já fechados.',
      en:
        'The factory tracked production and the delivery queue in an Excel spreadsheet. The system ' +
        'replaces the spreadsheet: it records each production step, calculates inventory from stock ' +
        'movements and projects the delivery queue — showing how many days until the balance stops ' +
        'covering the orders already booked.',
    },
    restricoes: [
      {
        rotulo: { pt: 'Galpão sem sinal', en: 'No signal on the shop floor' },
        nota: {
          pt: 'O diário é preenchido no celular, no chão de fábrica, com rede instável.',
          en: 'The daily log is filled in on a phone, right on the factory floor, with a spotty connection.',
        },
      },
      {
        rotulo: { pt: 'Dois papéis', en: 'Two roles' },
        nota: {
          pt: 'O encarregado registra a produção, mas não pode ver valores de pagamento.',
          en: 'The foreman logs production but must not see payment amounts.',
        },
      },
      {
        rotulo: { pt: 'A planilha era a verdade', en: 'The spreadsheet was the source of truth' },
        nota: {
          pt: 'A fila nova tinha que bater, linha por linha, com a conta que a fábrica já fazia.',
          en: 'The new queue had to match, line by line, the math the factory already did.',
        },
      },
    ],
    decisoes: [
      {
        titulo: { pt: 'Estoque calculado, nunca digitado', en: 'Inventory calculated, never typed in' },
        porque: {
          pt:
            'O saldo nasce da soma dos movimentos: só a desforma entra no estoque, e peça quebrada ' +
            'não conta. Não existe campo de saldo para ficar desatualizado, e qualquer número pode ' +
            'ser refeito a partir da origem.',
          en:
            'The balance is the sum of the movements: only demolding adds to inventory, and broken ' +
            'pieces don’t count. There is no balance field to go stale, and any number can be ' +
            'rebuilt from its source.',
        },
        descartado: {
          pt: 'Guardar o saldo num campo e atualizá-lo a cada lançamento.',
          en: 'Storing the balance in a field and updating it with every entry.',
        },
      },
      {
        titulo: { pt: 'Offline primeiro, sem duplicar', en: 'Offline first, no duplicates' },
        porque: {
          pt:
            'O lançamento vai para uma fila no próprio aparelho (IndexedDB, via Dexie) e sobe quando ' +
            'a rede volta. Cada um leva um identificador gerado no celular, então reenviar o mesmo ' +
            'lançamento não cria outro.',
          en:
            'Each entry goes into a queue on the device itself (IndexedDB, via Dexie) and uploads when ' +
            'the network comes back. Each one carries an ID generated on the phone, so resending the ' +
            'same entry doesn’t create another.',
        },
        descartado: {
          pt: 'Exigir conexão para registrar — o galpão não tem.',
          en: 'Requiring a connection to log anything — the shop floor doesn’t have one.',
        },
      },
      {
        titulo: {
          pt: 'O valor nem chega ao celular do encarregado',
          en: 'Payment amounts never even reach the foreman’s phone',
        },
        porque: {
          pt:
            'Esconder os valores de pagamento só na tela ainda os mandaria junto com os dados da ' +
            'página. Eles são retirados da resposta no servidor, antes de viajar.',
          en:
            'Hiding payment amounts only on screen would still send them along with the page data. ' +
            'They are stripped from the response on the server, before they travel.',
        },
        descartado: {
          pt: 'Ocultar os campos apenas na interface.',
          en: 'Hiding the fields in the interface only.',
        },
      },
      {
        titulo: { pt: 'A projeção não chuta', en: 'The projection doesn’t guess' },
        porque: {
          pt:
            'O ritmo de produção só é calculado com pelo menos três dias de desforma nos últimos 30. ' +
            'Com menos que isso, o sistema assume zero em vez de inventar uma taxa, e cada linha da ' +
            'projeção pode ser conferida sozinha.',
          en:
            'The production rate is only calculated with at least three days of demolding in the last ' +
            '30. With fewer, the system assumes zero instead of inventing a rate, and each line of the ' +
            'projection can be checked on its own.',
        },
        descartado: {
          pt: 'Extrapolar a partir de um único dia registrado — era o que o primeiro cálculo fazia.',
          en: 'Extrapolating from a single recorded day — which is what the first version of the calculation did.',
        },
      },
    ],
    arquitetura: {
      legenda: {
        pt: 'Tracejado: o caminho quando o galpão está sem rede',
        en: 'Dashed: the path when the shop floor has no network',
      },
      caixas: [
        {
          id: 'app',
          titulo: { pt: 'Celular e desktop', en: 'Phone and desktop' },
          nota: 'Inertia · Vue 3 · PWA',
          coluna: 0,
          linha: 0,
          forte: true,
        },
        { id: 'fila', titulo: { pt: 'Fila no aparelho', en: 'On-device queue' }, nota: 'Dexie · IndexedDB', coluna: 0, linha: 1 },
        { id: 'borda', titulo: 'Traefik + Nginx', nota: { pt: 'TLS · roteamento', en: 'TLS · routing' }, coluna: 1, linha: 0 },
        {
          id: 'laravel',
          titulo: 'Laravel 13',
          nota: { pt: 'ações e 10 serviços', en: 'actions and 10 services' },
          coluna: 2,
          linha: 0,
          forte: true,
        },
        { id: 'redis', titulo: 'Redis', nota: { pt: 'fila · agendador', en: 'queue · scheduler' }, coluna: 2, linha: 1 },
        { id: 'mysql', titulo: 'MySQL 8', nota: { pt: 'movimentos', en: 'stock movements' }, coluna: 3, linha: 0 },
      ],
      ligacoes: [
        { de: 'app', para: 'borda', rotulo: 'HTTPS' },
        { de: 'app', para: 'fila', rotulo: { pt: 'sem rede', en: 'offline' }, tracejada: true },
        {
          de: 'fila',
          para: 'borda',
          rotulo: { pt: 'quando a rede volta', en: 'when back online' },
          tracejada: true,
          rota: 'hv',
        },
        { de: 'borda', para: 'laravel', rotulo: 'API' },
        { de: 'laravel', para: 'mysql' },
        { de: 'laravel', para: 'redis', rotulo: { pt: 'tarefas', en: 'jobs' } },
      ],
    },
    stack: [
      {
        camada: 'Backend',
        ferramenta: 'Laravel 13 · PHP 8.4',
        papel: {
          pt: 'Regras de produção em ações e serviços; papéis e permissões por usuário',
          en: 'Production rules in actions and services; per-user roles and permissions',
        },
      },
      {
        camada: 'Interface',
        ferramenta: 'Inertia · Vue 3 · Tailwind',
        papel: {
          pt: '11 telas, do diário ao financeiro, sem uma API separada para manter',
          en: '11 screens, from the daily log to finance, with no separate API to maintain',
        },
      },
      {
        camada: 'Offline',
        ferramenta: 'Service Worker · Dexie',
        papel: {
          pt: 'O diário abre e grava sem rede; a fila sobe sozinha depois',
          en: 'The daily log opens and saves without a network; the queue uploads on its own later',
        },
      },
      {
        camada: { pt: 'Dados', en: 'Data' },
        ferramenta: 'MySQL 8 · Redis',
        papel: {
          pt: 'Movimentos no MySQL; fila de tarefas e agendador no Redis',
          en: 'Stock movements in MySQL; job queue and scheduler in Redis',
        },
      },
      {
        camada: 'Infra',
        ferramenta: 'Docker Compose · Nginx · Traefik',
        papel: {
          pt: 'Seis serviços, do app ao agendador, com TLS na borda',
          en: 'Six services, from the app to the scheduler, with TLS at the edge',
        },
      },
      {
        camada: { pt: 'Qualidade', en: 'Quality' },
        ferramenta: 'PHPUnit · Vitest',
        papel: {
          pt: 'Testes no servidor e na interface; a fila tem teste de aceitação contra a planilha',
          en: 'Tests on the server and in the interface; the queue has an acceptance test against the spreadsheet',
        },
      },
    ],
    dificil: {
      titulo: { pt: 'A projeção que andava para trás', en: 'The projection that went backward' },
      texto: [
        {
          pt:
            'A coluna “produz até lá” da fila de entregas era calculada a partir de um único dia de ' +
            'desforma registrado — um dia bom virava promessa. E havia uma contagem dobrada: em ' +
            'cargas atrasadas, a linha do tempo recuava.',
          en:
            'The “will produce by then” column in the delivery queue was calculated from a single ' +
            'recorded day of demolding — one good day became a promise. And there was double ' +
            'counting: for late loads, the timeline moved backward.',
        },
        {
          pt:
            'A correção veio em três partes: amostra mínima de três dias para calcular o ritmo, uma ' +
            'linha do tempo que nunca anda para trás e invariantes conferidas linha a linha, com ' +
            'testes novos só para a projeção.',
          en:
            'The fix came in three parts: a minimum three-day sample to calculate the rate, a timeline ' +
            'that never moves backward and invariants checked line by line, with new tests just for ' +
            'the projection.',
        },
      ],
    },
    imagens: [
      // Capturas da página de apresentação do próprio Inova (/conheca), que
      // reproduz as telas do sistema com dados fictícios.
      {
        src: '/projetos/inova-capa.webp',
        legenda: {
          pt: 'A página de apresentação do Inova Blocos, com o Painel em dados de exemplo',
          en: 'The Inova Blocos showcase page, with the Dashboard on sample data',
        },
        formato: 'tela',
      },
      {
        src: '/projetos/inova-painel.webp',
        legenda: { pt: 'Painel', en: 'Dashboard' },
        texto: {
          pt:
            'O dia da fábrica numa tela: entregas prometidas sem material, blocos prontos para ' +
            'desforma, saldo por espessura e o resumo financeiro, que só o gestor vê.',
          en:
            'The factory’s day on one screen: promised deliveries without stock, blocks ready for ' +
            'demolding, balance by thickness and the financial summary, which only the manager sees.',
        },
        formato: 'cartaz',
      },
      {
        src: '/projetos/inova-fila.webp',
        legenda: { pt: 'Fila de entrega', en: 'Delivery queue' },
        texto: {
          pt:
            'Cada entrega confirmada contra o que existe no pátio. Onde o saldo projetado fica ' +
            'negativo, a linha de ruptura mostra a OS e quantas peças faltam.',
          en:
            'Each delivery checked against what is in the yard. Where the projected balance goes ' +
            'negative, the stockout line shows the work order and how many pieces are short.',
        },
        formato: 'cartaz',
      },
      {
        src: '/projetos/inova-diario.webp',
        legenda: { pt: 'Diário de bordo', en: 'Daily log' },
        texto: {
          pt: 'No celular do galpão, sem sinal: os lançamentos ficam no aparelho e sobem depois.',
          en: 'On the shop-floor phone, with no signal: entries stay on the device and upload later.',
        },
        formato: 'celular',
      },
    ],
  },
  {
    id: 'orion',
    titulo: 'Orion',
    resumo: {
      pt:
        'Comunicação em tempo real para pequenos grupos — chat, voz e tela compartilhada — ' +
        'rodando em servidor próprio, sem depender de terceiros.',
      en:
        'Real-time communication for small groups — chat, voice and screen sharing — ' +
        'running on a self-hosted server, without relying on third parties.',
    },
    papel: { pt: 'Tudo: banco, API, interface e servidor', en: 'Everything: database, API, interface and server' },
    paraQuem: {
      pt: 'Grupos de 5 a 10 pessoas que já se conhecem',
      en: 'Groups of 5 to 10 people who already know each other',
    },
    ondeRoda: { pt: 'Máquina doméstica, sem GPU, com TLS', en: 'Home machine, no GPU, with TLS' },
    tecnologias: ['php', 'laravel', 'vue', 'typescript', 'tailwind', 'docker', 'mysql', 'redis', 'nginx'],
    situacao: 'producao',
    privado: true,
    site: { url: 'https://orion.jasonfigueiredo.com.br', rotulo: { pt: 'Acessar plataforma', en: 'Open the platform' } },
    periodo: '2026',
    destaque: true,
    testes: 333,
    demo: {
      webm: '/projetos/orion-demo.webm',
      mp4: '/projetos/orion-demo.mp4',
      poster: '/projetos/orion-demo.webp',
    },

    provas: [
      { valor: '13', rotulo: { pt: 'decisões de arquitetura registradas', en: 'recorded architecture decisions' } },
      { valor: '330+', rotulo: { pt: 'testes automatizados no backend', en: 'automated backend tests' } },
      { valor: '31', rotulo: { pt: 'roteiros de teste no navegador', en: 'browser test scripts' } },
    ],
    decisaoChave: {
      adr: 'ADR-002',
      texto: {
        pt:
          'Voz e tela vão direto de um navegador ao outro, por WebRTC. O servidor não carrega ' +
          'o áudio de ninguém.',
        en:
          'Voice and screen go straight from one browser to the other over WebRTC. The server ' +
          'carries no one’s audio.',
      },
    },

    problema: {
      pt:
        'Texto, voz e tela compartilhada costumam morar em serviços de terceiros, com as conversas ' +
        'no servidor de outra empresa. O Orion junta os três numa aplicação que o próprio grupo ' +
        'hospeda — as mensagens não saem da máquina de casa.',
      en:
        'Text, voice and screen sharing usually live on third-party services, with conversations ' +
        'sitting on another company’s servers. Orion brings all three into one application the ' +
        'group hosts itself — messages never leave the home machine.',
    },
    restricoes: [
      {
        rotulo: { pt: 'Servidor doméstico', en: 'Home server' },
        nota: {
          pt: 'Sem GPU e com o upload de uma conexão residencial.',
          en: 'No GPU, and the upload speed of a residential connection.',
        },
      },
      {
        rotulo: { pt: 'Pouca gente para manter', en: 'Few hands to maintain it' },
        nota: {
          pt: 'Cada peça a mais é uma peça a vigiar de madrugada.',
          en: 'Every extra component is one more to watch in the middle of the night.',
        },
      },
      {
        rotulo: { pt: 'Celular pelo navegador', en: 'Mobile through the browser' },
        nota: {
          pt: 'No Android se entra pela web — por isso PWA desde a primeira versão.',
          en: 'On Android, people join through the web — hence a PWA from the very first version.',
        },
      },
    ],
    recursos: [
      {
        titulo: { pt: 'Tempo real', en: 'Real time' },
        texto: {
          pt: 'Mensagens, presença e “digitando…” chegam por WebSocket no instante em que acontecem.',
          en: 'Messages, presence and “typing…” arrive over WebSocket the moment they happen.',
        },
      },
      {
        titulo: { pt: 'Voz ponta a ponta', en: 'Peer-to-peer voice' },
        texto: {
          pt: 'O áudio vai direto entre os participantes, por WebRTC, sem servidor de mídia no caminho.',
          en: 'Audio goes straight between participants over WebRTC, with no media server in the path.',
        },
      },
      {
        titulo: { pt: 'Tela até 4K', en: 'Screen sharing up to 4K' },
        texto: {
          pt: 'A tela inteira ou uma janela, de 720p a 4K, na qualidade que quem assiste escolher.',
          en: 'The whole screen or a single window, from 720p to 4K, at the quality the viewer chooses.',
        },
      },
      {
        titulo: { pt: 'Ruído fora', en: 'Noise removal' },
        texto: {
          pt: 'Uma rede neural roda no próprio navegador e limpa o microfone antes de a voz sair.',
          en: 'A neural network runs right in the browser and cleans up the microphone before the voice goes out.',
        },
      },
      {
        titulo: { pt: 'Conversas diretas', en: 'Direct messages' },
        texto: {
          pt: 'Texto e chamada com uma pessoa só, fora dos canais do servidor.',
          en: 'Text and calls with a single person, outside the server’s channels.',
        },
      },
      {
        titulo: { pt: 'Convite por link', en: 'Invite by link' },
        texto: {
          pt:
            'Com validade e limite de usos. Quem chega diz só como quer ser chamado; a conta fica ' +
            'para depois, criada de dentro.',
          en:
            'With an expiry date and a usage limit. Newcomers only say what they want to be called; ' +
            'the account comes later, created from inside.',
        },
      },
      {
        titulo: { pt: 'Instalável, com avisos', en: 'Installable, with notifications' },
        texto: {
          pt: 'App no celular e no computador; avisa quando alguém chama ou menciona você.',
          en: 'An app on phone and computer; it notifies you when someone calls or mentions you.',
        },
      },
      {
        titulo: { pt: 'Cargos e auditoria', en: 'Roles and audit log' },
        texto: {
          pt: 'Cada servidor tem cargos, permissões e o registro do que cada um mudou.',
          en: 'Each server has roles, permissions and a record of what each person changed.',
        },
      },
    ],
    adrs: 13,
    decisoes: [
      {
        titulo: { pt: 'A mídia não passa pelo servidor', en: 'Media doesn’t go through the server' },
        adr: 'ADR-002',
        porque: {
          pt:
            'Voz e tela vão direto entre os navegadores, por WebRTC. O Coturn só entra quando uma ' +
            'rede fechada bloqueia a conexão direta. Medido: zero byte retransmitido por ele em 36 horas.',
          en:
            'Voice and screen go directly between browsers over WebRTC. Coturn only steps in when a ' +
            'locked-down network blocks the direct connection. Measured: zero bytes relayed through it in 36 hours.',
        },
        descartado: {
          pt: 'Um servidor de mídia (LiveKit, mediasoup) — adiado até que a medição peça, não antes.',
          en: 'A media server (LiveKit, mediasoup) — deferred until measurements call for it, not before.',
        },
      },
      {
        titulo: {
          pt: 'A chamada se combina pelo canal de presença',
          en: 'Calls are negotiated over the presence channel',
        },
        adr: 'ADR-011',
        porque: {
          pt:
            'A rajada de mensagens que abre uma chamada viaja pelo WebSocket, de cliente para ' +
            'cliente. Passar por HTTP, fila e broadcast somaria atraso bem antes do primeiro som. ' +
            'O servidor segue dono da autorização e das credenciais que expiram.',
          en:
            'The burst of messages that sets up a call travels over the WebSocket, client to client. ' +
            'Going through HTTP, a queue and a broadcast would add delay well before the first sound. ' +
            'The server still owns authorization and the expiring credentials.',
        },
        descartado: {
          pt: 'Sinalização pela API REST e pela fila de eventos.',
          en: 'Signaling through the REST API and the event queue.',
        },
      },
      {
        titulo: {
          pt: 'Sessão em cookie, não token no JavaScript',
          en: 'Session in a cookie, not a token in JavaScript',
        },
        adr: 'ADR-008',
        porque: {
          pt:
            'Um ataque de XSS não consegue levar uma credencial de longa duração que o JavaScript ' +
            'nunca enxerga. CSRF cobre o outro lado.',
          en:
            'An XSS attack can’t steal a long-lived credential that JavaScript never sees. CSRF ' +
            'protection covers the other side.',
        },
        descartado: {
          pt: 'Token de API guardado no navegador.',
          en: 'An API token stored in the browser.',
        },
      },
      {
        titulo: {
          pt: 'Busca por varredura, com gatilho de troca',
          en: 'Scan-based search, with a trigger for switching',
        },
        adr: 'ADR-013',
        porque: {
          pt:
            'O índice FULLTEXT do MySQL ignora palavras com menos de três letras — justo “oi” e ' +
            '“ok”, as mais comuns num chat — e só conhece stopwords em inglês. O ADR já diz quando ' +
            'trocar: acima de uns 300 ms.',
          en:
            'MySQL’s FULLTEXT index ignores words shorter than three letters — exactly “oi” ' +
            '(Portuguese for “hi”) and “ok”, the most common in a chat — and only knows English ' +
            'stopwords. The ADR already says when to switch: above roughly 300 ms.',
        },
        descartado: {
          pt: 'MySQL FULLTEXT, por enquanto.',
          en: 'MySQL FULLTEXT, for now.',
        },
      },
    ],
    arquitetura: {
      legenda: {
        pt: 'Linha contínua passa pelo servidor; tracejada vai direto entre navegadores',
        en: 'Solid lines go through the server; dashed lines go directly between browsers',
      },
      caixas: [
        {
          id: 'a',
          titulo: { pt: 'Participante A', en: 'Participant A' },
          nota: 'Vue 3 · PWA',
          coluna: 0,
          linha: 0,
          forte: true,
        },
        { id: 'borda', titulo: 'Traefik + Nginx', nota: { pt: 'TLS · roteamento', en: 'TLS · routing' }, coluna: 1, linha: 0 },
        {
          id: 'laravel',
          titulo: 'Laravel 13',
          nota: { pt: 'API · autorização', en: 'API · authorization' },
          coluna: 2,
          linha: 0,
          forte: true,
        },
        { id: 'mysql', titulo: 'MySQL 8.4', nota: { pt: 'histórico', en: 'message history' }, coluna: 3, linha: 0 },
        { id: 'reverb', titulo: 'Reverb', nota: { pt: 'WebSocket · presença', en: 'WebSocket · presence' }, coluna: 1, linha: 1 },
        { id: 'redis', titulo: 'Redis 7', nota: { pt: 'fila · cache · sessão', en: 'queue · cache · session' }, coluna: 2, linha: 1 },
        {
          id: 'b',
          titulo: { pt: 'Participante B', en: 'Participant B' },
          nota: 'Vue 3 · PWA',
          coluna: 0,
          linha: 2,
          forte: true,
        },
        { id: 'coturn', titulo: 'Coturn', nota: { pt: 'só se a rede bloquear', en: 'only when blocked' }, coluna: 1, linha: 2 },
      ],
      ligacoes: [
        { de: 'a', para: 'borda', rotulo: 'HTTPS · WSS' },
        { de: 'borda', para: 'laravel', rotulo: 'API' },
        { de: 'borda', para: 'reverb', rotulo: 'WebSocket' },
        { de: 'laravel', para: 'mysql' },
        { de: 'laravel', para: 'redis', rotulo: { pt: 'eventos na fila', en: 'queued events' } },
        { de: 'redis', para: 'reverb', rotulo: { pt: 'difusão', en: 'broadcast' } },
        {
          de: 'a',
          para: 'b',
          rotulo: { pt: 'voz e tela, direto', en: 'voice and screen, direct' },
          tracejada: true,
          dupla: true,
        },
        { de: 'b', para: 'coturn', tracejada: true },
      ],
    },
    stack: [
      {
        camada: 'Backend',
        ferramenta: 'Laravel 13 · PHP 8.4',
        papel: {
          pt: 'API, autorização e as credenciais de TURN que expiram',
          en: 'API, authorization and the expiring TURN credentials',
        },
      },
      {
        camada: { pt: 'Tempo real', en: 'Real time' },
        ferramenta: 'Laravel Reverb',
        papel: {
          pt: 'Mensagens, presença, “digitando…” e a combinação das chamadas',
          en: 'Messages, presence, “typing…” and call setup',
        },
      },
      {
        camada: { pt: 'Mídia', en: 'Media' },
        ferramenta: 'WebRTC · Coturn',
        papel: {
          pt: 'Voz e tela entre navegadores; o TURN só para redes fechadas',
          en: 'Voice and screen between browsers; TURN only for locked-down networks',
        },
      },
      {
        camada: 'Interface',
        ferramenta: 'Vue 3 · TypeScript · Pinia · Tailwind',
        papel: {
          pt: '64 componentes em 13 módulos, instalável como app',
          en: '64 components in 13 modules, installable as an app',
        },
      },
      {
        camada: { pt: 'Dados', en: 'Data' },
        ferramenta: 'MySQL 8.4 · Redis 7',
        papel: {
          pt: 'Histórico no MySQL; fila, cache, sessão e travas no Redis',
          en: 'History in MySQL; queue, cache, sessions and locks in Redis',
        },
      },
      {
        camada: 'Infra',
        ferramenta: 'Docker Compose · Nginx · Traefik',
        papel: {
          pt: 'O mesmo ambiente do desenvolvimento à produção',
          en: 'The same environment from development to production',
        },
      },
      {
        camada: { pt: 'Qualidade', en: 'Quality' },
        ferramenta: 'PHPUnit · Puppeteer · GitHub Actions',
        papel: {
          pt: 'Testes em MySQL, o mesmo motor da produção; roteiros que abrem o navegador de verdade',
          en: 'Tests on MySQL, the same engine as production; scripts that drive a real browser',
        },
      },
    ],
    dificil: {
      titulo: { pt: 'Rápido para mim, lento para os outros', en: 'Fast for me, slow for everyone else' },
      texto: [
        {
          pt:
            'Na rede de casa o Orion respondia na hora; para quem entrava de fora, arrastava. Duas ' +
            'hipóteses caíram no teste — cascata de requisições (o HTTP/2 já multiplexa) e o modo ' +
            'de execução do Laravel (nenhum ganho medido). A causa real: a forma de publicação fazia ' +
            'todo o tráfego externo dar a volta por um ponto de entrada em Nova York, cerca de 143 ms ' +
            'a cada perna, e o servidor de TURN nem era alcançável de fora.',
          en:
            'On the home network Orion responded instantly; for anyone connecting from outside, it ' +
            'crawled. Two hypotheses failed under testing — a request waterfall (HTTP/2 already ' +
            'multiplexes) and Laravel’s execution mode (no measured gain). The real cause: the way it ' +
            'was published routed all external traffic through an entry point in New York, about 143 ms ' +
            'each leg, and the TURN server wasn’t even reachable from outside.',
        },
        {
          pt:
            'A correção foi publicar direto, com certificado próprio, e marcar a decisão antiga como ' +
            'substituída (ADR-007). De brinde, ajustar o nível de log baixou a mediana do backend ' +
            'de 34 ms para 23 ms.',
          en:
            'The fix was to publish directly, with its own certificate, and mark the old decision as ' +
            'superseded (ADR-007). As a bonus, tuning the log level cut the backend median ' +
            'from 34 ms to 23 ms.',
        },
      ],
    },
    proximos: {
      pt:
        'Os gatilhos já estão escritos: servidor de mídia quando a medição mostrar que a conexão ' +
        'direta não aguenta; busca indexada quando a varredura passar de uns 300 ms. Nada entra ' +
        'antes de o número pedir.',
      en:
        'The triggers are already written down: a media server when measurements show the direct ' +
        'connection can’t keep up; indexed search when scanning goes past roughly 300 ms. Nothing ' +
        'goes in before the numbers call for it.',
    },
    imagens: [
      // Capturas reais do servidor de demonstração que o próprio Orion monta
      // para a página de apresentação dele; a capa é o mosaico de abertura.
      {
        src: '/projetos/orion-capa.webp',
        legenda: {
          pt:
            'A apresentação do Orion, montada com capturas reais: o canal de texto ao centro, a sala ' +
            'de voz, o celular, o tema claro e um servidor com a cor do cliente',
          en:
            'The Orion showcase, built from real screenshots: the text channel in the center, the ' +
            'voice room, the phone, the light theme and a server in the customer’s color',
        },
        formato: 'cartaz',
      },
      {
        src: '/projetos/orion-canal.webp',
        legenda: { pt: 'Canal de texto', en: 'Text channel' },
        texto: {
          pt:
            'Um canal por assunto, com respostas, reações, anexos e busca. Mensagem nova, presença ' +
            'e “digitando…” aparecem sem recarregar a página.',
          en:
            'One channel per topic, with replies, reactions, attachments and search. New messages, ' +
            'presence and “typing…” show up without reloading the page.',
        },
        formato: 'tela',
      },
      {
        src: '/projetos/orion-voz.webp',
        legenda: { pt: 'Sala de voz', en: 'Voice room' },
        texto: {
          pt:
            'Quem está na sala e há quanto tempo. No rodapé, microfone, som, remoção de ruído, ' +
            'compartilhamento de tela e a qualidade da imagem.',
          en:
            'Who is in the room and for how long. In the footer: microphone, sound, noise removal, ' +
            'screen sharing and image quality.',
        },
        formato: 'tela',
      },
      {
        src: '/projetos/orion-plano-de-fundo.webp',
        legenda: { pt: 'A cor do cliente', en: 'The customer’s color' },
        texto: {
          pt:
            'O dono do servidor sobe uma imagem de fundo, e a interface inteira passa a usar a cor ' +
            'dela — botões, avatares e destaques.',
          en:
            'The server owner uploads a background image, and the whole interface takes on its ' +
            'color — buttons, avatars and highlights.',
        },
        formato: 'tela',
      },
      {
        src: '/projetos/orion-tema-claro.webp',
        legenda: { pt: 'Tema claro', en: 'Light theme' },
        texto: {
          pt: 'Claro, escuro ou o mesmo do sistema operacional.',
          en: 'Light, dark or matching the operating system.',
        },
        formato: 'tela',
      },
      {
        src: '/projetos/orion-novidades.webp',
        legenda: { pt: 'Novidades', en: 'What’s new' },
        texto: {
          pt:
            'Na tela inicial, cada melhoria e correção com data e hora. Quando sai versão nova, a ' +
            'marca avisa e o primeiro cartão traz o botão de atualizar.',
          en:
            'On the home screen, every improvement and fix with date and time. When a new version ' +
            'ships, the logo signals it and the first card carries the update button.',
        },
        formato: 'tela',
      },
      {
        src: '/projetos/orion-celular-gaveta.webp',
        legenda: { pt: 'Servidores e canais', en: 'Servers and channels' },
        texto: {
          pt: 'No celular, tudo numa gaveta, a um toque do menu.',
          en: 'On the phone, everything in a drawer, one tap from the menu.',
        },
        formato: 'celular',
      },
      {
        src: '/projetos/orion-celular-canal.webp',
        legenda: { pt: 'A conversa', en: 'The conversation' },
        texto: {
          pt: 'Mensagens, respostas e reações na tela toda.',
          en: 'Messages, replies and reactions, full screen.',
        },
        formato: 'celular',
      },
      {
        src: '/projetos/orion-celular-voz.webp',
        legenda: { pt: 'A chamada', en: 'The call' },
        texto: {
          pt: 'Quem está na sala, e os controles ao alcance do polegar.',
          en: 'Who is in the room, and the controls within thumb’s reach.',
        },
        formato: 'celular',
      },
    ],
  },
  {
    id: 'minhas-senhas',
    titulo: 'Minhas Senhas',
    resumo: {
      pt:
        'Gerenciador de senhas offline para Android, desktop e terminal — sem conta, sem nuvem, ' +
        'num formato aberto que abre no KeePassXC.',
      en:
        'An offline password manager for Android, desktop and the terminal — no account, no cloud, ' +
        'in an open format that opens in KeePassXC.',
    },
    papel: {
      pt: 'Tudo: núcleo, criptografia, apps e site',
      en: 'Everything: core, cryptography, apps and website',
    },
    paraQuem: {
      pt: 'Quem quer as senhas só no próprio aparelho',
      en: 'People who want their passwords only on their own device',
    },
    ondeRoda: { pt: 'No aparelho — não existe servidor', en: 'On the device — there is no server' },
    tecnologias: ['kotlin', 'android', 'svelte', 'astro'],
    situacao: 'producao',
    privado: true,
    site: {
      url: 'https://minhassenhas.jasonfigueiredo.com.br/#demonstracao',
      rotulo: { pt: 'Experimentar o cofre', en: 'Try the vault' },
    },
    periodo: '2026',
    destaque: true,
    demo: {
      webm: '/projetos/minhas-senhas-demo.webm',
      mp4: '/projetos/minhas-senhas-demo.mp4',
      poster: '/projetos/minhas-senhas-demo-cartaz.webp',
    },

    provas: [
      { valor: '9', rotulo: { pt: 'decisões de arquitetura registradas', en: 'recorded architecture decisions' } },
      {
        valor: '3',
        rotulo: {
          pt: 'apps sobre um núcleo só: Android, desktop e terminal',
          en: 'apps on a single core: Android, desktop and terminal',
        },
      },
      {
        valor: '0',
        rotulo: { pt: 'servidores — nada sai dos seus aparelhos', en: 'servers — nothing leaves your devices' },
      },
    ],
    decisaoChave: {
      adr: 'ADR-001',
      texto: {
        pt:
          'O cofre é um arquivo KDBX 4.1 sem alterações, que abre no KeePassXC e no KeePassDX. ' +
          'Se o app sumir amanhã, as senhas continuam suas.',
        en:
          'The vault is an unmodified KDBX 4.1 file that opens in KeePassXC and KeePassDX. ' +
          'If the app disappears tomorrow, the passwords are still yours.',
      },
    },

    problema: {
      pt:
        'A maioria dos gerenciadores de senha pede uma conta e guarda o cofre num servidor. O Minhas ' +
        'Senhas faz o contrário: o cofre fica cifrado no aparelho, sem conta nem nuvem, e os ' +
        'aparelhos sincronizam direto entre si, pela rede local.',
      en:
        'Most password managers ask for an account and keep the vault on a server. Minhas Senhas ' +
        'does the opposite: the vault stays encrypted on the device, with no account and no cloud, ' +
        'and devices sync directly with each other over the local network.',
    },
    restricoes: [
      {
        rotulo: { pt: 'Sem nuvem', en: 'No cloud' },
        nota: {
          pt: 'A única rede usada é a local, entre os seus próprios aparelhos.',
          en: 'The only network used is the local one, between your own devices.',
        },
      },
      {
        rotulo: { pt: 'Modelo de ameaça formal', en: 'Formal threat model' },
        nota: {
          pt: 'Inclui o que sobra na memória depois que o cofre trava.',
          en: 'It covers what remains in memory after the vault locks.',
        },
      },
      {
        rotulo: { pt: 'Memória do celular', en: 'Phone memory' },
        nota: {
          pt: 'O limite de memória do Android define os parâmetros do Argon2.',
          en: 'Android’s memory limit sets the Argon2 parameters.',
        },
      },
    ],
    adrs: 9,
    decisoes: [
      {
        titulo: { pt: 'Formato aberto, sem prisão', en: 'Open format, no lock-in' },
        adr: 'ADR-001',
        porque: {
          pt:
            'O cofre é KDBX 4.1 sem alterações, o mesmo do KeePassXC e do KeePassDX. As limitações ' +
            'da biblioteca usada estão documentadas, e as brechas que ela deixava foram fechadas do ' +
            'lado do projeto.',
          en:
            'The vault is unmodified KDBX 4.1, the same format as KeePassXC and KeePassDX. The ' +
            'limitations of the library in use are documented, and the gaps it left were closed on ' +
            'the project’s side.',
        },
        descartado: { pt: 'Um formato próprio.', en: 'A custom format of its own.' },
      },
      {
        titulo: { pt: 'O sincronismo mora dentro do arquivo', en: 'Sync lives inside the file' },
        adr: 'ADR-003',
        porque: {
          pt:
            'Relógios de Lamport, vetor de versões e lápides vão dentro do próprio KDBX, então até ' +
            'uma cópia do arquivo pode ser mesclada. Só edições simultâneas que o outro lado nunca ' +
            'viu viram conflito — nenhuma senha some em silêncio.',
          en:
            'Lamport clocks, a version vector and tombstones are stored inside the KDBX itself, so ' +
            'even a copy of the file can be merged. Only concurrent edits the other side never saw ' +
            'become conflicts — no password silently disappears.',
        },
        descartado: {
          pt: 'Um servidor de sincronismo, que contradiz a proposta.',
          en: 'A sync server, which contradicts the whole point.',
        },
      },
      {
        titulo: { pt: 'O preenchimento automático desconfia do app', en: 'Autofill doesn’t trust the app' },
        adr: 'ADR-008',
        porque: {
          pt:
            'Qualquer app pode declarar o domínio que quiser. O domínio só vale quando vem de uma ' +
            'lista fixa de navegadores, e a comparação é pelo domínio registrável — uma página falsa ' +
            'parecida com a do banco não recebe a senha.',
          en:
            'Any app can claim whatever domain it wants. A domain only counts when it comes from a ' +
            'fixed list of browsers, and matching is by registrable domain — a fake page that looks ' +
            'like the bank’s doesn’t get the password.',
        },
        descartado: {
          pt: 'Confiar no domínio que o app declara.',
          en: 'Trusting the domain the app declares.',
        },
      },
      {
        titulo: { pt: 'O segundo fator fica fora do cofre', en: 'The second factor stays out of the vault' },
        adr: 'ADR-006',
        porque: {
          pt:
            'Guardar os códigos TOTP junto das senhas colocaria os dois fatores no mesmo lugar: ' +
            'quem abre um, abre os dois.',
          en:
            'Keeping TOTP codes alongside the passwords would put both factors in the same place: ' +
            'whoever opens one opens both.',
        },
        descartado: {
          pt: 'Guardar os códigos TOTP no próprio cofre.',
          en: 'Storing the TOTP codes in the vault itself.',
        },
      },
    ],
    arquitetura: {
      legenda: {
        pt: 'Tracejado: sincronismo direto entre aparelhos, sem servidor no meio',
        en: 'Dashed: direct sync between devices, with no server in between',
      },
      caixas: [
        { id: 'cli', titulo: 'Terminal', nota: 'Clikt', coluna: 0, linha: 0 },
        { id: 'desktop', titulo: 'Desktop', nota: 'Compose Desktop', coluna: 1, linha: 0, forte: true },
        {
          id: 'android',
          titulo: 'Android',
          nota: { pt: 'Compose · biometria', en: 'Compose · biometrics' },
          coluna: 2,
          linha: 0,
          forte: true,
        },
        {
          id: 'outro',
          titulo: { pt: 'Outro aparelho', en: 'Another device' },
          nota: { pt: 'o mesmo cofre', en: 'the same vault' },
          coluna: 3,
          linha: 0,
        },
        {
          id: 'nucleo',
          titulo: { pt: 'Núcleo', en: 'Core' },
          nota: 'Kotlin Multiplatform',
          coluna: 1,
          linha: 1,
          forte: true,
        },
        {
          id: 'arquivo',
          titulo: { pt: 'Arquivo KDBX 4.1', en: 'KDBX 4.1 file' },
          nota: { pt: 'abre no KeePassXC', en: 'opens in KeePassXC' },
          coluna: 1,
          linha: 2,
        },
      ],
      ligacoes: [
        { de: 'cli', para: 'nucleo' },
        { de: 'desktop', para: 'nucleo' },
        { de: 'android', para: 'nucleo' },
        { de: 'nucleo', para: 'arquivo', rotulo: 'Argon2id · AES-256' },
        // Ligação horizontal: o rótulo tem uns 12 caracteres de espaço, por isso LAN em inglês.
        { de: 'android', para: 'outro', rotulo: { pt: 'rede local', en: 'LAN' }, tracejada: true, dupla: true },
      ],
    },
    stack: [
      {
        camada: { pt: 'Núcleo', en: 'Core' },
        ferramenta: 'Kotlin Multiplatform',
        papel: {
          pt: 'Formato KDBX, criptografia e o motor de mesclagem, os mesmos nos três apps',
          en: 'KDBX format, cryptography and the merge engine, the same across all three apps',
        },
      },
      {
        camada: { pt: 'Criptografia', en: 'Cryptography' },
        ferramenta: 'Argon2id · AES-256 · XChaCha20-Poly1305',
        papel: {
          pt: 'KDBX no arquivo; no banco local, cada cifra amarrada ao registro, ao campo e à versão',
          en: 'KDBX for the file; in the local database, each ciphertext bound to the record, the field and the version',
        },
      },
      {
        camada: { pt: 'Dados', en: 'Data' },
        ferramenta: 'SQLDelight · SQLite',
        papel: {
          pt: 'Banco local comum, cifrado pela aplicação — o SQLCipher exigiria duas configurações diferentes',
          en: 'A plain local database, encrypted by the application — SQLCipher would require two different setups',
        },
      },
      {
        camada: 'Interface',
        ferramenta: 'Compose Multiplatform',
        papel: {
          pt: 'Desktop e Android com o mesmo código de interface; biometria pelo Keystore',
          en: 'Desktop and Android on the same interface code; biometrics through the Keystore',
        },
      },
      {
        camada: { pt: 'Sincronismo', en: 'Sync' },
        ferramenta: { pt: 'mDNS · TLS mútuo · QR code', en: 'mDNS · mutual TLS · QR code' },
        papel: {
          pt: 'Os aparelhos se acham na rede local e se autenticam por QR e código de 6 dígitos',
          en: 'Devices find each other on the local network and authenticate with a QR code and a 6-digit code',
        },
      },
      {
        camada: { pt: 'Qualidade', en: 'Quality' },
        ferramenta: 'Kotest · Jazzer · Roborazzi',
        papel: {
          pt: 'Testes de propriedade, fuzzing, capturas de tela e interoperabilidade com o KeePassXC',
          en: 'Property-based tests, fuzzing, screenshot tests and interoperability with KeePassXC',
        },
      },
      {
        camada: { pt: 'Site', en: 'Website' },
        ferramenta: 'Astro · Svelte',
        papel: {
          pt: 'Página pública com uma demonstração que roda inteira no navegador',
          en: 'A public page with a demo that runs entirely in the browser',
        },
      },
    ],
    dificil: {
      titulo: { pt: 'O teste que passava quebrado', en: 'The test that passed while broken' },
      texto: [
        {
          pt:
            'O plano previa um teste que tira um retrato da memória depois de travar o cofre e procura ' +
            'segredos lá dentro. Ele falhou, como previsto — e a caça achou três culpados: o cofre ' +
            'travado ainda segurando o banco, o reaproveitamento de buffers de uma biblioteca de E/S ' +
            'e um buffer do leitor de XML do próprio Java.',
          en:
            'The plan called for a test that takes a memory snapshot after the vault locks and ' +
            'searches it for secrets. It failed, as expected — and the hunt found three culprits: the ' +
            'locked vault still holding the database, buffer reuse in an I/O library and a buffer in ' +
            'Java’s own XML reader.',
        },
        {
          pt:
            'A correção: travar passou a liberar o banco, e uma rotina de higiene sobrescreve esses ' +
            'buffers depois de cada leitura e escrita. E o próprio teste, que tinha chegado a passar ' +
            'mesmo quebrado, ganhou um controle positivo: um vazamento plantado de propósito que ele ' +
            'é obrigado a encontrar.',
          en:
            'The fix: locking now releases the database, and a cleanup routine overwrites those ' +
            'buffers after every read and write. And the test itself, which had at one point passed ' +
            'even while broken, gained a positive control: a deliberately planted leak it is required ' +
            'to find.',
        },
      ],
    },
    proximos: { pt: 'Publicação na Play Store e para Windows.', en: 'Release on the Play Store and for Windows.' },
    imagens: [
      {
        src: '/projetos/minhas-senhas-demo.webp',
        legenda: {
          pt: 'A demonstração do site: o cofre com dados fictícios',
          en: 'The website demo: the vault with fictional data',
        },
        formato: 'tela',
      },
      {
        src: '/projetos/minhas-senhas-site.webp',
        legenda: { pt: 'A página pública do projeto', en: 'The project’s public page' },
        formato: 'tela',
      },
    ],
  },
  {
    id: 'qualipt',
    titulo: 'QualiPT',
    resumo: {
      pt:
        'Inspeção visual do pré-tratamento de uma montadora, com foto, no celular — funciona sem ' +
        'internet e abre sozinho a não conformidade quando algo está errado.',
      en:
        'Photo-based visual inspection for an automaker’s pretreatment line, on a phone — it works ' +
        'without internet and opens a nonconformance on its own when something is wrong.',
    },
    papel: { pt: 'Tudo: banco, API, interface e servidor', en: 'Everything: database, API, interface and server' },
    paraQuem: { pt: 'Operadores e supervisores da inspeção', en: 'Inspection operators and supervisors' },
    ondeRoda: {
      pt: 'Servidor próprio; o registro, no celular e no tablet da linha',
      en: 'Self-hosted server; logging happens on the line’s phone and tablet',
    },
    tecnologias: ['php', 'laravel', 'vue', 'typescript', 'tailwind', 'docker', 'mysql', 'nginx'],
    situacao: 'ativo',
    privado: true,
    periodo: '2026',
    destaque: true,
    testes: 305,
    demo: {
      webm: '/projetos/qualipt-demo.webm',
      mp4: '/projetos/qualipt-demo.mp4',
      poster: '/projetos/qualipt-demo.webp',
    },

    provas: [
      { valor: '300+', rotulo: { pt: 'testes, no servidor e na interface', en: 'tests, on the server and in the interface' } },
      { valor: '13', rotulo: { pt: 'decisões de arquitetura registradas', en: 'recorded architecture decisions' } },
      {
        valor: '11',
        rotulo: {
          pt: 'tabelas guardadas por triggers contra alteração',
          en: 'tables guarded against changes by triggers',
        },
      },
    ],
    decisaoChave: {
      adr: 'ADR-006',
      texto: {
        pt:
          'Registro de inspeção é evidência: depois de gravado, o próprio banco recusa alterá-lo. ' +
          'Errou? O registro é anulado com motivo e continua visível, riscado.',
        en:
          'An inspection record is evidence: once saved, the database itself refuses to change it. ' +
          'Made a mistake? The record is voided with a reason and stays visible, struck through.',
      },
    },

    problema: {
      pt:
        'A inspeção visual do pré-tratamento precisa de evidência que não muda depois: foto, ' +
        'checklist, resultado e uma hora em que se possa confiar — e cada não conformidade ' +
        'acompanhada até ser validada. O QualiPT põe isso num app de celular que registra sem ' +
        'internet, abre a não conformidade sozinho e substitui também a planilha de medição dos banhos.',
      en:
        'Visual inspection of the pretreatment line needs evidence that can’t change afterward: a ' +
        'photo, a checklist, a result and a timestamp you can trust — with every nonconformance ' +
        'tracked until it is validated. QualiPT puts this in a phone app that logs without ' +
        'internet, opens the nonconformance on its own and also replaces the bath measurement spreadsheet.',
    },
    restricoes: [
      {
        rotulo: { pt: 'Perder registro é inaceitável', en: 'Losing a record is unacceptable' },
        nota: {
          pt: 'A rede da fábrica é incerta, e o iPhone não sincroniza em segundo plano.',
          en: 'The plant’s network is unreliable, and the iPhone doesn’t sync in the background.',
        },
      },
      {
        rotulo: { pt: 'Um IP para a fábrica toda', en: 'One IP for the whole plant' },
        nota: {
          pt: 'O firewall bane um IP por 4 horas: um ban tiraria todo mundo do ar.',
          en: 'The firewall bans an IP for 4 hours: a single ban would knock everyone offline.',
        },
      },
      {
        rotulo: { pt: 'Servidor modesto', en: 'Modest server' },
        nota: {
          pt: 'CPU fraca, sem armazenamento de objetos, e o proxy corta requisições acima de 60 s.',
          en: 'A weak CPU, no object storage, and a proxy that cuts off requests over 60 s.',
        },
      },
    ],
    recursos: [
      {
        titulo: { pt: 'Registro em dois toques', en: 'Two-tap logging' },
        texto: {
          pt: 'Tocar na etapa já abre a câmera; “Conforme” marca “Aparência normal” sozinho.',
          en: 'Tapping a step opens the camera right away; “Conforming” checks “Normal appearance” on its own.',
        },
      },
      {
        titulo: { pt: 'Sem internet', en: 'No internet needed' },
        texto: {
          pt:
            'Registro e fotos ficam no aparelho e sobem quando a rede volta. O rascunho sobrevive até ' +
            'ao app fechar com a câmera aberta.',
          en:
            'Records and photos stay on the device and upload when the network comes back. The draft ' +
            'even survives the app closing with the camera open.',
        },
      },
      {
        titulo: { pt: 'Não conformidade automática', en: 'Automatic nonconformance' },
        texto: {
          pt: '“Não conforme” abre a NC, e o supervisor a conduz até validada, com fotos da tratativa e linha do tempo.',
          en:
            '“Nonconforming” opens the NC, and the supervisor follows it through to validation, with ' +
            'photos of the corrective action and a timeline.',
        },
      },
      {
        titulo: { pt: 'Hora confiável', en: 'Trusted timestamps' },
        texto: {
          pt: 'Cada registro leva um selo — confirmado, offline ou divergente — calculado pelo servidor.',
          en: 'Each record carries a stamp — confirmed, offline or mismatched — calculated by the server.',
        },
      },
      {
        titulo: { pt: 'Painel do supervisor', en: 'Supervisor dashboard' },
        texto: {
          pt: 'NCs por etapa, Pareto por defeito e evolução diária. Tocar numa barra abre os registros; todo gráfico tem tabela.',
          en: 'NCs by step, Pareto by defect and daily trend. Tapping a bar opens the records; every chart has a table.',
        },
      },
      {
        titulo: { pt: 'Análise do banho', en: 'Bath analysis' },
        texto: {
          pt: 'Medições por horário contra a faixa de controle, com gráficos que exportam PNG e CSV.',
          en: 'Measurements by time slot against the control range, with charts that export to PNG and CSV.',
        },
      },
      {
        titulo: { pt: 'Nada se apaga', en: 'Nothing is deleted' },
        texto: {
          pt: 'Registro errado é anulado com motivo e continua visível; toda mudança fica na trilha.',
          en: 'A wrong record is voided with a reason and stays visible; every change goes into the audit trail.',
        },
      },
      {
        titulo: { pt: 'Configurável e bilíngue', en: 'Configurable and bilingual' },
        texto: {
          pt: 'O administrador ajusta etapas e checklists pelo próprio app, em português e inglês.',
          en: 'The administrator adjusts steps and checklists from within the app, in Portuguese and English.',
        },
      },
    ],
    adrs: 13,
    decisoes: [
      {
        titulo: { pt: 'Offline primeiro, sem repetir', en: 'Offline first, no repeats' },
        adr: 'ADR-002',
        porque: {
          pt:
            'Registro e foto vão para o IndexedDB e sobem um por requisição. O identificador nasce no ' +
            'aparelho: reenviar devolve “já existia”, e o mesmo identificador com outro conteúdo é ' +
            'recusado. Com a sessão vencida, a fila para em vez de insistir.',
          en:
            'Records and photos go into IndexedDB and upload one per request. The ID is created on the ' +
            'device: resending returns “already exists”, and the same ID with different content is ' +
            'rejected. When the session has expired, the queue stops instead of retrying.',
        },
        descartado: {
          pt: 'Exigir conexão, ou depender do Background Sync, que o iPhone não tem.',
          en: 'Requiring a connection, or relying on Background Sync, which the iPhone doesn’t have.',
        },
      },
      {
        titulo: { pt: 'A hora oficial é do servidor', en: 'The official time comes from the server' },
        adr: 'ADR-004',
        porque: {
          pt:
            'O relógio do celular não é confiável, e sem rede não há a quem perguntar. Cada resposta ' +
            'traz a hora do servidor; o app guarda a diferença junto da captura, e o servidor calcula ' +
            'a hora oficial e marca o registro como confirmado, offline ou divergente.',
          en:
            'The phone’s clock can’t be trusted, and without a network there is no one to ask. Every ' +
            'response carries the server’s time; the app stores the offset with the capture, and the ' +
            'server calculates the official time and marks the record as confirmed, offline or mismatched.',
        },
        descartado: {
          pt: 'Recusar o registro quando o relógio está errado — o selo fica para o supervisor ver.',
          en: 'Rejecting the record when the clock is wrong — the stamp is there for the supervisor to see.',
        },
      },
      {
        titulo: { pt: 'O banco recusa a alteração', en: 'The database refuses the change' },
        adr: 'ADR-006',
        porque: {
          pt:
            'Triggers do MySQL, gerados a partir das colunas reais, barram UPDATE e DELETE; um teste ' +
            'confere que nenhuma tabela ficou de fora. A única mudança permitida é anular, uma vez. ' +
            'Isso barra bug do próprio código e edição manual no banco — não quem tem a senha dele.',
          en:
            'MySQL triggers, generated from the actual columns, block UPDATE and DELETE; a test checks ' +
            'that no table was left out. The only change allowed is voiding, once. This stops bugs in ' +
            'the code itself and manual edits in the database — not someone who has its password.',
        },
        descartado: {
          pt: 'Proteger só no código da aplicação, que não barra nem um bug nem uma edição direta.',
          en: 'Protecting only in application code, which stops neither a bug nor a direct edit.',
        },
      },
      {
        titulo: { pt: 'Uma API que não provoca o firewall', en: 'An API that doesn’t provoke the firewall' },
        adr: 'ADR-008',
        porque: {
          pt:
            'Uma rajada de erros 401, 403 ou 404 bane o IP da fábrica por 4 horas. A API foi desenhada ' +
            'para não gerá-la: listas que já trazem o detalhe, busca vazia que responde 200 e uma ' +
            'consulta leve que confirma a sessão antes de cada rodada de envio.',
          en:
            'A burst of 401, 403 or 404 errors bans the plant’s IP for 4 hours. The API was designed ' +
            'not to produce one: lists that already include the details, empty searches that answer ' +
            '200 and a lightweight request that confirms the session before each upload round.',
        },
        descartado: {
          pt: 'Respostas REST “de manual”, que disparam o ban em uso normal.',
          en: '“Textbook” REST responses, which trigger the ban in normal use.',
        },
      },
    ],
    arquitetura: {
      legenda: {
        pt: 'Tracejado: o caminho quando a linha está sem rede',
        en: 'Dashed: the path when the line has no network',
      },
      caixas: [
        {
          id: 'app',
          titulo: { pt: 'Celular e tablet', en: 'Phone and tablet' },
          nota: 'Vue 3 · PWA',
          coluna: 0,
          linha: 0,
          forte: true,
        },
        {
          id: 'fila',
          titulo: { pt: 'Fila no aparelho', en: 'On-device queue' },
          nota: { pt: 'Dexie · fotos em Blob', en: 'Dexie · photos as Blobs' },
          coluna: 0,
          linha: 1,
        },
        { id: 'borda', titulo: 'Traefik + Nginx', nota: 'TLS · CrowdSec', coluna: 1, linha: 0 },
        { id: 'laravel', titulo: 'Laravel 13', nota: 'API · Sanctum', coluna: 2, linha: 0, forte: true },
        {
          id: 'fotos',
          titulo: { pt: 'Fotos em disco', en: 'Photos on disk' },
          nota: { pt: 'rota privada', en: 'private route' },
          coluna: 2,
          linha: 1,
        },
        {
          id: 'mysql',
          titulo: 'MySQL 8.4',
          nota: { pt: 'triggers imutáveis', en: 'immutability triggers' },
          coluna: 3,
          linha: 0,
        },
        { id: 'backup', titulo: 'Backups', nota: { pt: 'dump a cada 15 min', en: 'dump every 15 min' }, coluna: 3, linha: 1 },
      ],
      ligacoes: [
        { de: 'app', para: 'borda', rotulo: 'HTTPS' },
        { de: 'app', para: 'fila', rotulo: { pt: 'sem rede', en: 'offline' }, tracejada: true },
        {
          de: 'fila',
          para: 'borda',
          rotulo: { pt: 'quando a rede volta', en: 'when back online' },
          tracejada: true,
          rota: 'hv',
        },
        { de: 'borda', para: 'laravel', rotulo: 'API' },
        { de: 'laravel', para: 'mysql' },
        { de: 'laravel', para: 'fotos' },
        { de: 'mysql', para: 'backup' },
      ],
    },
    stack: [
      {
        camada: 'Backend',
        ferramenta: 'Laravel 13 · PHP 8.4 · Sanctum',
        papel: {
          pt: 'API em módulos por domínio; sessão em cookie com CSRF',
          en: 'API split into domain modules; cookie session with CSRF',
        },
      },
      {
        camada: 'Interface',
        ferramenta: 'Vue 3 · TypeScript · Pinia · Tailwind',
        papel: {
          pt: '16 telas em português e inglês; os gráficos só carregam onde aparecem',
          en: '16 screens in Portuguese and English; charts only load where they appear',
        },
      },
      {
        camada: 'Offline',
        ferramenta: 'Service Worker · Dexie',
        papel: {
          pt: 'Registro e fotos no aparelho; a foto é comprimida e tem o hash calculado ali mesmo',
          en: 'Records and photos on the device; each photo is compressed and hashed right there',
        },
      },
      {
        camada: { pt: 'Dados', en: 'Data' },
        ferramenta: 'MySQL 8.4',
        papel: {
          pt: 'Triggers de imutabilidade, tudo em UTC; sessão e cache no próprio banco',
          en: 'Immutability triggers, everything in UTC; sessions and cache in the database itself',
        },
      },
      {
        camada: 'Infra',
        ferramenta: 'Docker · Nginx · Traefik · CrowdSec',
        papel: {
          pt: 'Imagens de produção versionadas; backup conferido e espelho das fotos',
          en: 'Versioned production images; verified backups and a mirror of the photos',
        },
      },
      {
        camada: { pt: 'Qualidade', en: 'Quality' },
        ferramenta: 'Pest · Vitest · Puppeteer · Larastan',
        papel: {
          pt: 'Testes no mesmo MySQL da produção; 5 roteiros num Chrome de verdade',
          en: 'Tests on the same MySQL as production; 5 scripts in a real Chrome',
        },
      },
    ],
    dificil: {
      titulo: {
        pt: 'A foto que o app aceitava e o servidor recusava',
        en: 'The photo the app accepted and the server rejected',
      },
      texto: [
        {
          pt:
            'O servidor exigia 480 px nos dois lados da foto e recusava uma imagem larga e baixa — um ' +
            'print de planilha de 1081 × 423, por exemplo — que o app já tinha aceitado e guardado. ' +
            'Num sistema que grava primeiro no aparelho, a recusa chega tarde: o registro ficava ' +
            'parado no celular.',
          en:
            'The server required 480 px on both sides of the photo and rejected a wide, short image — a ' +
            '1081 × 423 spreadsheet screenshot, for example — that the app had already accepted and ' +
            'stored. In a system that saves to the device first, the rejection arrives too late: the ' +
            'record got stuck on the phone.',
        },
        {
          pt:
            'Agora vale qualquer proporção, só com um teto de 2560 px. Os registros recusados apenas ' +
            'pela foto voltam sozinhos para a fila uma vez, quando o app atualiza; como a recusa guarda ' +
            'a versão do app, não há laço de reenvio. O print de 1081 × 423 virou caso de teste.',
          en:
            'Now any aspect ratio is accepted, with just a 2560 px ceiling. Records rejected only because ' +
            'of the photo go back into the queue on their own, once, when the app updates; since the ' +
            'rejection stores the app version, there is no resend loop. The 1081 × 423 screenshot ' +
            'became a test case.',
        },
      ],
    },
    proximos: {
      pt:
        'A entrada em produção: ligar o domínio, testar a rede no Wi-Fi da fábrica e nos dados ' +
        'móveis, instalar nos aparelhos e acompanhar o primeiro dia. Depois, uma cópia cifrada dos ' +
        'backups fora da máquina.',
      en:
        'Going into production: connect the domain, test the network on the plant’s Wi-Fi and on ' +
        'mobile data, install on the devices and follow the first day. After that, an encrypted ' +
        'off-machine copy of the backups.',
    },
    imagens: [
      // Capturas reais, tiradas pelos roteiros de teste do próprio QualiPT com dados de
      // demonstração: as fotos das peças são ruído sintético.
      {
        src: '/projetos/qualipt-graficos.webp',
        legenda: {
          pt: 'Gráficos de controle do banho no tablet, com as faixas de mínimo e máximo',
          en: 'Bath control charts on the tablet, with the minimum and maximum bands',
        },
        formato: 'tela',
      },
      {
        src: '/projetos/qualipt-painel.webp',
        legenda: { pt: 'Painel do supervisor', en: 'Supervisor dashboard' },
        texto: {
          pt: 'Registros, conformes e NCs do período; as não conformidades por etapa e por tipo de defeito.',
          en: 'Records, conforming results and NCs for the period; nonconformances by step and by defect type.',
        },
        formato: 'tela',
      },
      {
        src: '/projetos/qualipt-analise.webp',
        legenda: { pt: 'Análise do banho', en: 'Bath analysis' },
        texto: {
          pt:
            'As medições do dia por horário, com a faixa de controle de cada parâmetro. O valor fora ' +
            'dela aparece em vermelho, com a direção do desvio.',
          en:
            'The day’s measurements by time slot, with each parameter’s control range. A value outside ' +
            'it shows in red, with the direction of the deviation.',
        },
        formato: 'tela',
      },
      {
        src: '/projetos/qualipt-registro.webp',
        legenda: { pt: 'O registro', en: 'The record' },
        texto: { pt: 'Foto, resultado e checklist da etapa.', en: 'Photo, result and checklist for the step.' },
        formato: 'celular',
      },
      {
        src: '/projetos/qualipt-sem-rede.webp',
        legenda: { pt: 'Salvo sem rede', en: 'Saved offline' },
        texto: {
          pt: 'A NC é aberta quando o registro chegar ao servidor.',
          en: 'The NC is opened once the record reaches the server.',
        },
        formato: 'celular',
      },
      {
        src: '/projetos/qualipt-nc.webp',
        legenda: { pt: 'A não conformidade', en: 'The nonconformance' },
        texto: {
          pt: 'Da abertura à validação, com a linha do tempo da tratativa.',
          en: 'From opening to validation, with the timeline of the corrective action.',
        },
        formato: 'celular',
      },
    ],
  },
  {
    id: 'ponte',
    titulo: 'Ponte Tradutor',
    resumo: {
      pt:
        'Tradutor que mora na bandeja do Windows: traduz o que você seleciona ou copia, responde no ' +
        'idioma da conversa, digita o que você fala e legenda uma chamada ao vivo.',
      en:
        'A translator that lives in the Windows system tray: it translates what you select or copy, ' +
        'replies in the language of the conversation, types what you say and captions a call live.',
    },
    papel: {
      pt: 'Tudo: núcleo em Rust, interface e instalador',
      en: 'Everything: Rust core, interface and installer',
    },
    paraQuem: {
      pt: 'Uso próprio, em conversas com gente de outros países',
      en: 'Personal use, in conversations with people from other countries',
    },
    ondeRoda: {
      pt: 'Windows 10 e 11, na bandeja; a voz é reconhecida no próprio PC',
      en: 'Windows 10 and 11, in the system tray; speech is recognized on the PC itself',
    },
    tecnologias: ['rust', 'tauri', 'react', 'typescript', 'tailwind'],
    situacao: 'ativo',
    privado: true,
    periodo: '2026',
    // Sem capturas ainda: o app só roda no Windows. Vai para o índice até ter telas.
    destaque: false,
    testes: 163,

    provas: [
      { valor: '160+', rotulo: { pt: 'testes automatizados no núcleo em Rust', en: 'automated tests in the Rust core' } },
      { valor: '103', rotulo: { pt: 'decisões técnicas registradas', en: 'recorded technical decisions' } },
      {
        valor: '8',
        rotulo: {
          pt: 'serviços de tradução e voz em fila — se um falha, o próximo assume',
          en: 'translation and speech services lined up — if one fails, the next takes over',
        },
      },
    ],
    decisaoChave: {
      texto: {
        pt:
          'Cinco tradutores e três motores de voz numa fila que o usuário ordena. Se um falha, esgota ' +
          'a cota ou está sem chave, o próximo assume — e funciona até sem chave nenhuma.',
        en:
          'Five translators and three speech engines, in an order the user sets. If one fails, runs ' +
          'out of quota or has no key, the next one takes over — and it works even with no keys at all.',
      },
    },

    problema: {
      pt:
        'Conversar com gente de outros países no WhatsApp, no Discord ou por e-mail costuma ser um ' +
        'vaivém de copiar, colar num site de tradução e copiar de volta — e para de funcionar quando ' +
        'a cota da API acaba. O Ponte faz isso de dentro de qualquer app, com um atalho, e troca de ' +
        'serviço sozinho quando um deles falha.',
      en:
        'Talking with people from other countries on WhatsApp, on Discord or by email is usually a ' +
        'back-and-forth of copying, pasting into a translation site and copying back — and it stops ' +
        'working when the API quota runs out. Ponte does it from inside any app, with a shortcut, and ' +
        'switches services on its own when one of them fails.',
    },
    restricoes: [
      {
        rotulo: { pt: 'As regras do Windows', en: 'Windows rules' },
        nota: {
          pt: 'App em segundo plano não pode roubar o foco, e o sistema bloqueia teclas simuladas em apps de administrador.',
          en: 'A background app can’t steal focus, and the system blocks simulated keystrokes in apps running as administrator.',
        },
      },
      {
        rotulo: { pt: 'Cotas gratuitas', en: 'Free quotas' },
        nota: {
          pt: 'Cada API tem limite por dia ou por mês. Nenhuma chave pode ser obrigatória.',
          en: 'Each API has a daily or monthly limit. No key can be mandatory.',
        },
      },
      {
        rotulo: { pt: 'Não atrapalhar', en: 'Stay out of the way' },
        nota: {
          pt: 'Não sujar a área de transferência nem o histórico do Win+V; nos logs, nada de texto nem de áudio.',
          en: 'Don’t pollute the clipboard or the Win+V history; no text or audio in the logs.',
        },
      },
    ],
    recursos: [
      {
        titulo: { pt: 'Traduzir a seleção', en: 'Translate the selection' },
        texto: {
          pt: 'Um atalho, e a tradução aparece perto do cursor. A área de transferência volta como estava, até com imagem.',
          en:
            'One shortcut, and the translation appears near the cursor. The clipboard goes back to how ' +
            'it was, even if it held an image.',
        },
      },
      {
        titulo: { pt: 'Traduzir o que você copia', en: 'Translate what you copy' },
        texto: {
          pt: 'Ignora o que já está no seu idioma, links, números, e-mails e o que os gerenciadores de senha marcam.',
          en:
            'Skips text already in your language, links, numbers, email addresses and anything password ' +
            'managers flag.',
        },
      },
      {
        titulo: { pt: 'Responder no idioma da conversa', en: 'Reply in the conversation’s language' },
        texto: {
          pt: 'Você escreve em português, vê a prévia enquanto digita, e o Enter cola a tradução no app de onde veio.',
          en:
            'You write in Portuguese, see a preview as you type, and Enter pastes the translation into ' +
            'the app you came from.',
        },
      },
      {
        titulo: { pt: 'Ditado em qualquer app', en: 'Dictation in any app' },
        texto: {
          pt: 'Digita no campo em foco a cada pausa, com comandos como “nova linha” e “enviar” — ou já traduzido.',
          en:
            'Types into the focused field at each pause, with commands like “nova linha” (new line) and ' +
            '“enviar” (send) — or already translated.',
        },
      },
      {
        titulo: { pt: 'Conversa ao vivo', en: 'Live conversation' },
        texto: {
          pt: 'Ouve o som do computador e o microfone e mostra a tradução fala por fala. Nada é gravado.',
          en:
            'Listens to the computer’s audio and the microphone and shows the translation phrase by ' +
            'phrase. Nothing is recorded.',
        },
      },
      {
        titulo: { pt: 'Nunca para', en: 'Never stops' },
        texto: {
          pt: 'Cinco tradutores e três motores de voz numa ordem ajustável; quando um cai, o próximo assume.',
          en:
            'Five translators and three speech engines in an adjustable order; when one goes down, the ' +
            'next takes over.',
        },
      },
      {
        titulo: { pt: 'Painel de uso', en: 'Usage dashboard' },
        texto: {
          pt: 'Quanto foi usado e quanto resta de cada API, com o número oficial onde o serviço informa.',
          en:
            'How much of each API has been used and how much is left, with the official figure where ' +
            'the service reports it.',
        },
      },
    ],
    adrs: 103,
    decisoes: [
      {
        titulo: {
          pt: 'O motor fica no Rust; as janelas só exibem',
          en: 'The engine stays in Rust; the windows only display',
        },
        // As decisões do Ponte não são ADRs: o selo é um número, que em inglês se escreve No.
        adr: { pt: 'Nº 010', en: 'No. 010' },
        porque: {
          pt:
            'As chaves de API e a área de transferência nunca chegam ao WebView, e o motor funciona com ' +
            'todas as janelas fechadas. Cada janela recebe só os comandos que usa.',
          en:
            'API keys and the clipboard never reach the WebView, and the engine works with every ' +
            'window closed. Each window gets only the commands it uses.',
        },
        descartado: {
          pt: 'Chamar os plugins de área de transferência e configuração direto do JavaScript das janelas.',
          en: 'Calling the clipboard and settings plugins directly from the windows’ JavaScript.',
        },
      },
      {
        titulo: { pt: 'A área de transferência volta inteira', en: 'The clipboard comes back intact' },
        adr: { pt: 'Nº 013', en: 'No. 013' },
        porque: {
          pt:
            'Para ler a seleção, o app precisa copiar. Antes, ele guarda todos os formatos pela API do ' +
            'Windows e os devolve depois, fora do histórico. A mudança é detectada pelo número de ' +
            'sequência, que muda mesmo quando o texto copiado é igual ao anterior.',
          en:
            'To read the selection, the app has to copy it. First it saves every format through the ' +
            'Windows API and restores them afterward, outside the history. The change is detected by ' +
            'the sequence number, which changes even when the copied text is the same as before.',
        },
        descartado: {
          pt: 'Guardar só o texto, e comparar o conteúdo para saber se mudou.',
          en: 'Saving only the text, and comparing the contents to tell whether it changed.',
        },
      },
      {
        titulo: { pt: 'O som do computador, sem driver', en: 'The computer’s audio, with no driver' },
        adr: { pt: 'Nº 092', en: 'No. 092' },
        porque: {
          pt:
            'A saída de som é aberta como entrada, em modo loopback, sem instalar nada. Com caixas de ' +
            'som, o trecho do microfone coberto pela fala do computador é descartado, para a mesma fala ' +
            'não aparecer duas vezes.',
          en:
            'The audio output is opened as an input, in loopback mode, with nothing to install. With ' +
            'speakers, the stretch of microphone audio covered by the computer’s speech is discarded, ' +
            'so the same speech doesn’t show up twice.',
        },
        descartado: {
          pt: 'Driver virtual de áudio, “Mixagem estéreo” ou cancelamento de eco.',
          en: 'A virtual audio driver, “Stereo Mix” or echo cancellation.',
        },
      },
      {
        titulo: { pt: 'GPU quando houver, sem depender dela', en: 'GPU when available, without depending on it' },
        adr: { pt: 'Nº 031', en: 'No. 031' },
        porque: {
          pt:
            'O Whisper usa a placa de vídeo pelo Vulkan, mas a biblioteca só é carregada na hora do uso. ' +
            'Sem driver, ele cai para o processador ou para a nuvem — o app abre em qualquer Windows.',
          en:
            'Whisper uses the graphics card through Vulkan, but the library is only loaded when it’s ' +
            'needed. Without a driver, it falls back to the CPU or the cloud — the app opens on any Windows machine.',
        },
        descartado: {
          pt: 'Ligar o executável direto ao Vulkan, que impediria o app de abrir sem driver de vídeo.',
          en: 'Linking the executable directly against Vulkan, which would keep the app from opening without a graphics driver.',
        },
      },
    ],
    arquitetura: {
      legenda: {
        pt: 'Tudo passa pelo núcleo: as janelas só exibem, e as chaves nunca chegam a elas',
        en: 'Everything goes through the core: the windows only display, and the keys never reach them',
      },
      caixas: [
        {
          id: 'janelas',
          titulo: { pt: 'Janelas React', en: 'React windows' },
          nota: 'React · 5 WebViews',
          coluna: 1,
          linha: 0,
          forte: true,
        },
        {
          id: 'apps',
          titulo: { pt: 'Apps do Windows', en: 'Windows apps' },
          nota: { pt: 'WhatsApp · chamadas', en: 'WhatsApp · calls' },
          coluna: 0,
          linha: 1,
          forte: true,
        },
        {
          id: 'nucleo',
          titulo: { pt: 'Núcleo Rust', en: 'Rust core' },
          nota: 'Tauri 2 · Win32',
          coluna: 1,
          linha: 1,
          forte: true,
        },
        {
          id: 'traducao',
          titulo: { pt: 'Cadeia de tradução', en: 'Translation chain' },
          nota: { pt: 'fila · pausa por cota', en: 'fallback · quota pause' },
          coluna: 2,
          linha: 1,
        },
        {
          id: 'tradutores',
          titulo: { pt: '5 tradutores', en: '5 translators' },
          nota: { pt: 'nuvem · LibreTranslate', en: 'cloud · LibreTranslate' },
          coluna: 3,
          linha: 1,
        },
        {
          id: 'voz',
          titulo: { pt: 'Cadeia de voz', en: 'Speech chain' },
          nota: { pt: 'Silero VAD · fila', en: 'Silero VAD · fallback' },
          coluna: 2,
          linha: 2,
        },
        {
          id: 'motores',
          titulo: { pt: 'Motores de voz', en: 'Speech engines' },
          nota: { pt: 'Whisper local · nuvem', en: 'local Whisper · cloud' },
          coluna: 3,
          linha: 2,
        },
      ],
      ligacoes: [
        { de: 'apps', para: 'nucleo', rotulo: { pt: 'texto, áudio', en: 'text, audio' }, dupla: true },
        { de: 'janelas', para: 'nucleo', rotulo: { pt: 'comandos', en: 'commands' }, dupla: true },
        { de: 'nucleo', para: 'traducao', rotulo: { pt: 'texto', en: 'text' } },
        { de: 'traducao', para: 'tradutores', rotulo: 'HTTPS · 4 s' },
        { de: 'nucleo', para: 'voz', rotulo: { pt: 'áudio', en: 'audio' } },
        { de: 'voz', para: 'motores', rotulo: { pt: 'áudio 16 kHz', en: '16 kHz audio' } },
      ],
    },
    stack: [
      {
        camada: { pt: 'Núcleo', en: 'Core' },
        ferramenta: 'Rust · Tauri 2',
        papel: {
          pt: 'Bandeja, atalhos globais, 48 comandos e as filas de tradução e voz',
          en: 'Tray, global shortcuts, 48 commands and the translation and speech chains',
        },
      },
      {
        camada: 'Interface',
        ferramenta: 'React · TypeScript · Tailwind',
        papel: {
          pt: 'Cinco janelas, da tradução ao lado do cursor às configurações',
          en: 'Five windows, from the translation next to the cursor to the settings',
        },
      },
      {
        camada: 'Windows',
        ferramenta: { pt: 'API Win32 · Gerenciador de Credenciais', en: 'Win32 API · Credential Manager' },
        papel: {
          pt: 'Área de transferência, foco e teclas; as chaves ficam no cofre do sistema',
          en: 'Clipboard, focus and keystrokes; the keys live in the system’s credential store',
        },
      },
      {
        camada: { pt: 'Tradução', en: 'Translation' },
        ferramenta: 'DeepL · Azure · Google · LibreTranslate · MyMemory',
        papel: {
          pt: 'Em fila, com pausa automática quando a cota acaba; idioma detectado localmente',
          en: 'Chained, with an automatic pause when a quota runs out; language detected locally',
        },
      },
      {
        camada: { pt: 'Voz', en: 'Speech' },
        ferramenta: 'Whisper · Silero VAD · Deepgram · Groq',
        papel: {
          pt: 'Reconhecimento no próprio PC, com a nuvem de reserva',
          en: 'Recognition on the PC itself, with the cloud as backup',
        },
      },
      {
        camada: { pt: 'Qualidade', en: 'Quality' },
        ferramenta: 'cargo test · wiremock · clippy',
        papel: {
          pt: 'Um servidor falso por tradutor; unwrap proibido fora dos testes',
          en: 'A mock server per translator; unwrap banned outside tests',
        },
      },
    ],
    dificil: {
      titulo: { pt: 'Cada fala aparecia duas vezes', en: 'Every line showed up twice' },
      texto: [
        {
          pt:
            'No primeiro teste de ponta a ponta da conversa ao vivo, cada fala da outra pessoa saía ' +
            'duas vezes: o microfone ouvia as caixas de som. E um “Hello.” sozinho era detectado como ' +
            'soto, enquanto o Whisper tinha ouvido inglês.',
          en:
            'In the first end-to-end test of the live conversation, every line the other person said ' +
            'came out twice: the microphone was picking up the speakers. And a lone “Hello.” was ' +
            'detected as Sotho, while Whisper had heard English.',
        },
        {
          pt:
            'A correção: o trecho do microfone com pelo menos metade coberta por fala do computador é ' +
            'descartado na hora, pelos intervalos do detector de fala, sem esperar a transcrição — ' +
            'ao custo documentado de perder o que se fala por cima do outro. Nas frases curtas, quem ' +
            'decide o idioma passou a ser o áudio; o texto só o desmente a partir de quatro palavras.',
          en:
            'The fix: any stretch of microphone audio at least half covered by the computer’s speech is ' +
            'discarded on the spot, using the speech detector’s intervals, without waiting for the ' +
            'transcription — at the documented cost of losing whatever is said over the other person. ' +
            'For short phrases, the audio now decides the language; the text only overrules it from ' +
            'four words up.',
        },
      ],
    },
    proximos: {
      pt:
        'Ouvir só o app da chamada, em vez do som inteiro do computador, e testar com monitores de ' +
        'escalas diferentes.',
      en:
        'Listen only to the calling app instead of all of the computer’s audio, and test with ' +
        'monitors at different scale settings.',
    },
    imagens: [],
  },
];

export const rotuloSituacao: Record<Situacao, Texto> = {
  producao: { pt: 'Em produção', en: 'In production' },
  ativo: { pt: 'Em evolução', en: 'In development' },
  concluido: { pt: 'Concluído', en: 'Completed' },
};
