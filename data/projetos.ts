// Projetos que desenvolvi.
// Para adicionar um novo, acrescente um objeto aqui — a home e a página
// /projetos/<id> se montam sozinhas. A ordem do array é a ordem da página.
//
// Só entra o que roda em produção. Trabalho de faculdade ficou de fora.
//
// Orion, Inova Blocos e Minhas Senhas são repositórios privados: tudo aqui
// descreve o que foi construído e por quê, nunca o código. Os números vêm da
// contagem nos próprios repositórios e das medições que eles documentam.

export type Situacao = 'producao' | 'ativo' | 'concluido';

export type Imagem = {
  src: string;
  legenda: string;
  /**
   * 'tela' ocupa a largura toda; 'celular' aparece inteira, mais estreita;
   * 'cartaz' é peça de apresentação já composta — inteira e sem a moldura de
   * janela, que ela já desenha por dentro
   */
  formato: 'tela' | 'celular' | 'cartaz';
  /** o que a tela mostra, para quem não vai abrir a imagem; a legenda vira título */
  texto?: string;
};

/** O que o produto faz, do ponto de vista de quem usa. */
export type Recurso = { titulo: string; texto: string };

/** Um número que qualquer um pode conferir. Os três primeiros vão para a home. */
export type Prova = { valor: string; rotulo: string };

/** Um limite que moldou o projeto. */
export type Restricao = { rotulo: string; nota: string };

/** Uma decisão técnica, com o motivo e a alternativa que ficou de fora. */
export type Decisao = {
  titulo: string;
  /** número do registro de decisão (ADR), quando existe */
  adr?: string;
  porque: string;
  descartado: string;
};

/** Uma caixa do diagrama, posicionada numa grade de colunas e linhas. */
export type Caixa = {
  id: string;
  titulo: string;
  nota: string;
  coluna: number;
  linha: number;
  /** contorno forte: as pontas que o usuário toca e o coração do sistema */
  forte?: boolean;
};

export type Ligacao = {
  de: string;
  para: string;
  rotulo?: string;
  /** tracejada: o caminho que não passa pelo servidor, ou que só vale sem rede */
  tracejada?: boolean;
  /** seta nas duas pontas */
  dupla?: boolean;
  /** entre caixas em linha e coluna diferentes: anda primeiro na vertical (padrão) ou na horizontal */
  rota?: 'vh' | 'hv';
};

export type Arquitetura = {
  legenda: string;
  caixas: Caixa[];
  ligacoes: Ligacao[];
};

/** Uma camada da stack e o trabalho que ela faz neste projeto. */
export type Camada = { camada: string; ferramenta: string; papel: string };

export type Projeto = {
  id: string;
  titulo: string;
  /** uma frase: abre o destaque da home e a página do projeto */
  resumo: string;
  papel: string;
  paraQuem: string;
  ondeRoda: string;
  /** ids de tecnologias em data/tecnologias.ts */
  tecnologias: string[];
  situacao: Situacao;
  privado: boolean;
  repo?: string;
  /** endereço público onde dá para usar ou experimentar o projeto */
  site?: { url: string; rotulo: string };
  periodo: string;
  /** vai para a vitrine da home; os demais entram no índice abaixo dela */
  destaque?: boolean;
  /** a imagem da vitrine, quando não é a capa do estudo de caso (imagens[0]) */
  vitrine?: Imagem;

  provas: Prova[];
  /** a decisão que resume o projeto, em duas frases, para a home */
  decisaoChave: { texto: string; adr?: string };

  /* --- página do projeto --- */

  problema: string;
  restricoes: Restricao[];
  recursos?: Recurso[];
  decisoes: Decisao[];
  /** quantas decisões o repositório registra ao todo, quando há ADRs */
  adrs?: number;
  arquitetura: Arquitetura;
  stack: Camada[];
  /** o problema mais difícil e como foi resolvido, em parágrafos */
  dificil: { titulo: string; texto: string[] };
  proximos?: string;
  /**
   * a primeira é a capa; as demais vão para "Telas". Os SVG em public/projetos
   * são mockups provisórios; os WebP, capturas reais
   */
  imagens: Imagem[];
};

export const projetos: Projeto[] = [
  {
    id: 'inova-blocos',
    titulo: 'Inova Blocos',
    resumo:
      'Produção, estoque e entregas de uma fábrica de blocos de concreto — e o aviso de quando ' +
      'a produção não vai cobrir os pedidos já fechados.',
    papel: 'Tudo: banco, API, interface e servidor',
    paraQuem: 'O dono da fábrica e o encarregado da produção',
    ondeRoda: 'Servidor próprio; o diário, no celular do galpão',
    tecnologias: ['php', 'laravel', 'vue', 'javascript', 'tailwind', 'docker', 'mysql', 'redis', 'nginx'],
    situacao: 'producao',
    privado: true,
    site: { url: 'https://inovablocos.duckdns.org/conheca', rotulo: 'Conhecer a plataforma' },
    periodo: '2026',
    destaque: true,

    provas: [
      { valor: '0', rotulo: 'campos de estoque digitados — o saldo é calculado' },
      { valor: '330+', rotulo: 'testes, no servidor e na interface' },
      { valor: '11', rotulo: 'telas, do diário ao financeiro' },
    ],
    decisaoChave: {
      texto:
        'O diário grava no próprio celular e envia quando a rede volta. Cada lançamento leva ' +
        'um identificador único, então reenviar nunca duplica.',
    },

    problema:
      'A fábrica controlava a produção e a fila de entregas numa planilha de Excel. O sistema ' +
      'substitui a planilha: registra cada etapa da produção, calcula o estoque a partir dos ' +
      'movimentos e projeta a fila de entregas — mostrando em quantos dias o saldo deixa de ' +
      'cobrir os pedidos já fechados.',
    restricoes: [
      { rotulo: 'Galpão sem sinal', nota: 'O diário é preenchido no celular, no chão de fábrica, com rede instável.' },
      { rotulo: 'Dois papéis', nota: 'O encarregado registra a produção, mas não pode ver valores de pagamento.' },
      { rotulo: 'A planilha era a verdade', nota: 'A fila nova tinha que bater, linha por linha, com a conta que a fábrica já fazia.' },
    ],
    decisoes: [
      {
        titulo: 'Estoque calculado, nunca digitado',
        porque:
          'O saldo nasce da soma dos movimentos: só a desforma entra no estoque, e peça quebrada ' +
          'não conta. Não existe campo de saldo para ficar desatualizado, e qualquer número pode ' +
          'ser refeito a partir da origem.',
        descartado: 'Guardar o saldo num campo e atualizá-lo a cada lançamento.',
      },
      {
        titulo: 'Offline primeiro, sem duplicar',
        porque:
          'O lançamento vai para uma fila no próprio aparelho (IndexedDB, via Dexie) e sobe quando ' +
          'a rede volta. Cada um leva um identificador gerado no celular, então reenviar o mesmo ' +
          'lançamento não cria outro.',
        descartado: 'Exigir conexão para registrar — o galpão não tem.',
      },
      {
        titulo: 'O valor nem chega ao celular do encarregado',
        porque:
          'Esconder os valores de pagamento só na tela ainda os mandaria junto com os dados da ' +
          'página. Eles são retirados da resposta no servidor, antes de viajar.',
        descartado: 'Ocultar os campos apenas na interface.',
      },
      {
        titulo: 'A projeção não chuta',
        porque:
          'O ritmo de produção só é calculado com pelo menos três dias de desforma nos últimos 30. ' +
          'Com menos que isso, o sistema assume zero em vez de inventar uma taxa, e cada linha da ' +
          'projeção pode ser conferida sozinha.',
        descartado: 'Extrapolar a partir de um único dia registrado — era o que o primeiro cálculo fazia.',
      },
    ],
    arquitetura: {
      legenda: 'Tracejado: o caminho quando o galpão está sem rede',
      caixas: [
        { id: 'app', titulo: 'Celular e desktop', nota: 'Inertia · Vue 3 · PWA', coluna: 0, linha: 0, forte: true },
        { id: 'fila', titulo: 'Fila no aparelho', nota: 'Dexie · IndexedDB', coluna: 0, linha: 1 },
        { id: 'borda', titulo: 'Traefik + Nginx', nota: 'TLS · roteamento', coluna: 1, linha: 0 },
        { id: 'laravel', titulo: 'Laravel 13', nota: 'ações e 10 serviços', coluna: 2, linha: 0, forte: true },
        { id: 'redis', titulo: 'Redis', nota: 'fila · agendador', coluna: 2, linha: 1 },
        { id: 'mysql', titulo: 'MySQL 8', nota: 'movimentos', coluna: 3, linha: 0 },
      ],
      ligacoes: [
        { de: 'app', para: 'borda', rotulo: 'HTTPS' },
        { de: 'app', para: 'fila', rotulo: 'sem rede', tracejada: true },
        { de: 'fila', para: 'borda', rotulo: 'quando a rede volta', tracejada: true, rota: 'hv' },
        { de: 'borda', para: 'laravel', rotulo: 'API' },
        { de: 'laravel', para: 'mysql' },
        { de: 'laravel', para: 'redis', rotulo: 'tarefas' },
      ],
    },
    stack: [
      { camada: 'Backend', ferramenta: 'Laravel 13 · PHP 8.4', papel: 'Regras de produção em ações e serviços; papéis e permissões por usuário' },
      { camada: 'Interface', ferramenta: 'Inertia · Vue 3 · Tailwind', papel: '11 telas, do diário ao financeiro, sem uma API separada para manter' },
      { camada: 'Offline', ferramenta: 'Service Worker · Dexie', papel: 'O diário abre e grava sem rede; a fila sobe sozinha depois' },
      { camada: 'Dados', ferramenta: 'MySQL 8 · Redis', papel: 'Movimentos no MySQL; fila de tarefas e agendador no Redis' },
      { camada: 'Infra', ferramenta: 'Docker Compose · Nginx · Traefik', papel: 'Seis serviços, do app ao agendador, com TLS na borda' },
      { camada: 'Qualidade', ferramenta: 'PHPUnit · Vitest', papel: 'Testes no servidor e na interface; a fila tem teste de aceitação contra a planilha' },
    ],
    dificil: {
      titulo: 'A projeção que andava para trás',
      texto: [
        'A coluna “produz até lá” da fila de entregas era calculada a partir de um único dia de ' +
          'desforma registrado — um dia bom virava promessa. E havia uma contagem dobrada: em ' +
          'cargas atrasadas, a linha do tempo recuava.',
        'A correção veio em três partes: amostra mínima de três dias para calcular o ritmo, uma ' +
          'linha do tempo que nunca anda para trás e invariantes conferidas linha a linha, com ' +
          'testes novos só para a projeção.',
      ],
    },
    imagens: [
      // Capturas da página de apresentação do próprio Inova (/conheca), que
      // reproduz as telas do sistema com dados fictícios.
      {
        src: '/projetos/inova-capa.webp',
        legenda: 'A página de apresentação do Inova Blocos, com o Painel em dados de exemplo',
        formato: 'tela',
      },
      {
        src: '/projetos/inova-painel.webp',
        legenda: 'Painel',
        texto:
          'O dia da fábrica numa tela: entregas prometidas sem material, blocos prontos para ' +
          'desforma, saldo por espessura e o resumo financeiro, que só o gestor vê.',
        formato: 'cartaz',
      },
      {
        src: '/projetos/inova-fila.webp',
        legenda: 'Fila de entrega',
        texto:
          'Cada entrega confirmada contra o que existe no pátio. Onde o saldo projetado fica ' +
          'negativo, a linha de ruptura mostra a OS e quantas peças faltam.',
        formato: 'cartaz',
      },
      {
        src: '/projetos/inova-diario.webp',
        legenda: 'Diário de bordo',
        texto: 'No celular do galpão, sem sinal: os lançamentos ficam no aparelho e sobem depois.',
        formato: 'celular',
      },
    ],
  },
  {
    id: 'orion',
    titulo: 'Orion',
    resumo:
      'Comunicação em tempo real para pequenos grupos — chat, voz e tela compartilhada — ' +
      'rodando em servidor próprio, sem depender de terceiros.',
    papel: 'Tudo: banco, API, interface e servidor',
    paraQuem: 'Grupos de 5 a 10 pessoas que já se conhecem',
    ondeRoda: 'Máquina doméstica, sem GPU, com TLS',
    tecnologias: ['php', 'laravel', 'vue', 'typescript', 'tailwind', 'docker', 'mysql', 'redis', 'nginx'],
    situacao: 'producao',
    privado: true,
    site: { url: 'https://orionlive.duckdns.org', rotulo: 'Acessar plataforma' },
    periodo: '2026',
    destaque: true,
    // Na home, a marca: o nome é o que precisa ficar. As telas estão no estudo de caso.
    vitrine: {
      src: '/projetos/orion-marca.webp',
      legenda: 'A marca do Orion: o símbolo, o nome e o mote “Conecte. Comunique.”',
      formato: 'cartaz',
    },

    provas: [
      { valor: '13', rotulo: 'decisões de arquitetura registradas' },
      { valor: '330+', rotulo: 'testes automatizados no backend' },
      { valor: '31', rotulo: 'roteiros de teste no navegador' },
    ],
    decisaoChave: {
      adr: 'ADR-002',
      texto:
        'Voz e tela vão direto de um navegador ao outro, por WebRTC. O servidor não carrega ' +
        'o áudio de ninguém.',
    },

    problema:
      'Texto, voz e tela compartilhada costumam morar em serviços de terceiros, com as conversas ' +
      'no servidor de outra empresa. O Orion junta os três numa aplicação que o próprio grupo ' +
      'hospeda — as mensagens não saem da máquina de casa.',
    restricoes: [
      { rotulo: 'Servidor doméstico', nota: 'Sem GPU e com o upload de uma conexão residencial.' },
      { rotulo: 'Pouca gente para manter', nota: 'Cada peça a mais é uma peça a vigiar de madrugada.' },
      { rotulo: 'Celular pelo navegador', nota: 'No Android se entra pela web — por isso PWA desde a primeira versão.' },
    ],
    recursos: [
      { titulo: 'Tempo real', texto: 'Mensagens, presença e “digitando…” chegam por WebSocket no instante em que acontecem.' },
      { titulo: 'Voz ponta a ponta', texto: 'O áudio vai direto entre os participantes, por WebRTC, sem servidor de mídia no caminho.' },
      { titulo: 'Tela até 4K', texto: 'A tela inteira ou uma janela, de 720p a 4K, na qualidade que quem assiste escolher.' },
      { titulo: 'Ruído fora', texto: 'Uma rede neural roda no próprio navegador e limpa o microfone antes de a voz sair.' },
      { titulo: 'Conversas diretas', texto: 'Texto e chamada com uma pessoa só, fora dos canais do servidor.' },
      {
        titulo: 'Convite por link',
        texto:
          'Com validade e limite de usos. Quem chega diz só como quer ser chamado; a conta fica ' +
          'para depois, criada de dentro.',
      },
      { titulo: 'Instalável, com avisos', texto: 'App no celular e no computador; avisa quando alguém chama ou menciona você.' },
      { titulo: 'Cargos e auditoria', texto: 'Cada servidor tem cargos, permissões e o registro do que cada um mudou.' },
    ],
    adrs: 13,
    decisoes: [
      {
        titulo: 'A mídia não passa pelo servidor',
        adr: 'ADR-002',
        porque:
          'Voz e tela vão direto entre os navegadores, por WebRTC. O Coturn só entra quando uma ' +
          'rede fechada bloqueia a conexão direta. Medido: zero byte retransmitido por ele em 36 horas.',
        descartado: 'Um servidor de mídia (LiveKit, mediasoup) — adiado até que a medição peça, não antes.',
      },
      {
        titulo: 'A chamada se combina pelo canal de presença',
        adr: 'ADR-011',
        porque:
          'A rajada de mensagens que abre uma chamada viaja pelo WebSocket, de cliente para ' +
          'cliente. Passar por HTTP, fila e broadcast somaria atraso bem antes do primeiro som. ' +
          'O servidor segue dono da autorização e das credenciais que expiram.',
        descartado: 'Sinalização pela API REST e pela fila de eventos.',
      },
      {
        titulo: 'Sessão em cookie, não token no JavaScript',
        adr: 'ADR-008',
        porque:
          'Um ataque de XSS não consegue levar uma credencial de longa duração que o JavaScript ' +
          'nunca enxerga. CSRF cobre o outro lado.',
        descartado: 'Token de API guardado no navegador.',
      },
      {
        titulo: 'Busca por varredura, com gatilho de troca',
        adr: 'ADR-013',
        porque:
          'O índice FULLTEXT do MySQL ignora palavras com menos de três letras — justo “oi” e ' +
          '“ok”, as mais comuns num chat — e só conhece stopwords em inglês. O ADR já diz quando ' +
          'trocar: acima de uns 300 ms.',
        descartado: 'MySQL FULLTEXT, por enquanto.',
      },
    ],
    arquitetura: {
      legenda: 'Linha contínua passa pelo servidor; tracejada vai direto entre navegadores',
      caixas: [
        { id: 'a', titulo: 'Participante A', nota: 'Vue 3 · PWA', coluna: 0, linha: 0, forte: true },
        { id: 'borda', titulo: 'Traefik + Nginx', nota: 'TLS · roteamento', coluna: 1, linha: 0 },
        { id: 'laravel', titulo: 'Laravel 13', nota: 'API · autorização', coluna: 2, linha: 0, forte: true },
        { id: 'mysql', titulo: 'MySQL 8.4', nota: 'histórico', coluna: 3, linha: 0 },
        { id: 'reverb', titulo: 'Reverb', nota: 'WebSocket · presença', coluna: 1, linha: 1 },
        { id: 'redis', titulo: 'Redis 7', nota: 'fila · cache · sessão', coluna: 2, linha: 1 },
        { id: 'b', titulo: 'Participante B', nota: 'Vue 3 · PWA', coluna: 0, linha: 2, forte: true },
        { id: 'coturn', titulo: 'Coturn', nota: 'só se a rede bloquear', coluna: 1, linha: 2 },
      ],
      ligacoes: [
        { de: 'a', para: 'borda', rotulo: 'HTTPS · WSS' },
        { de: 'borda', para: 'laravel', rotulo: 'API' },
        { de: 'borda', para: 'reverb', rotulo: 'WebSocket' },
        { de: 'laravel', para: 'mysql' },
        { de: 'laravel', para: 'redis', rotulo: 'eventos na fila' },
        { de: 'redis', para: 'reverb', rotulo: 'difusão' },
        { de: 'a', para: 'b', rotulo: 'voz e tela, direto', tracejada: true, dupla: true },
        { de: 'b', para: 'coturn', tracejada: true },
      ],
    },
    stack: [
      { camada: 'Backend', ferramenta: 'Laravel 13 · PHP 8.4', papel: 'API, autorização e as credenciais de TURN que expiram' },
      { camada: 'Tempo real', ferramenta: 'Laravel Reverb', papel: 'Mensagens, presença, “digitando…” e a combinação das chamadas' },
      { camada: 'Mídia', ferramenta: 'WebRTC · Coturn', papel: 'Voz e tela entre navegadores; o TURN só para redes fechadas' },
      { camada: 'Interface', ferramenta: 'Vue 3 · TypeScript · Pinia · Tailwind', papel: '64 componentes em 13 módulos, instalável como app' },
      { camada: 'Dados', ferramenta: 'MySQL 8.4 · Redis 7', papel: 'Histórico no MySQL; fila, cache, sessão e travas no Redis' },
      { camada: 'Infra', ferramenta: 'Docker Compose · Nginx · Traefik', papel: 'O mesmo ambiente do desenvolvimento à produção' },
      { camada: 'Qualidade', ferramenta: 'PHPUnit · Puppeteer · GitHub Actions', papel: 'Testes em MySQL, o mesmo motor da produção; roteiros que abrem o navegador de verdade' },
    ],
    dificil: {
      titulo: 'Rápido para mim, lento para os outros',
      texto: [
        'Na rede de casa o Orion respondia na hora; para quem entrava de fora, arrastava. Duas ' +
          'hipóteses caíram no teste — cascata de requisições (o HTTP/2 já multiplexa) e o modo ' +
          'de execução do Laravel (nenhum ganho medido). A causa real: a forma de publicação fazia ' +
          'todo o tráfego externo dar a volta por um ponto de entrada em Nova York, cerca de 143 ms ' +
          'a cada perna, e o servidor de TURN nem era alcançável de fora.',
        'A correção foi publicar direto, com certificado próprio, e marcar a decisão antiga como ' +
          'substituída (ADR-007). De brinde, ajustar o nível de log baixou a mediana do backend ' +
          'de 34 ms para 23 ms.',
      ],
    },
    proximos:
      'Os gatilhos já estão escritos: servidor de mídia quando a medição mostrar que a conexão ' +
      'direta não aguenta; busca indexada quando a varredura passar de uns 300 ms. Nada entra ' +
      'antes de o número pedir.',
    imagens: [
      // Capturas reais do servidor de demonstração que o próprio Orion monta
      // para a página de apresentação dele; a capa é o mosaico de abertura.
      {
        src: '/projetos/orion-capa.webp',
        legenda:
          'A apresentação do Orion, montada com capturas reais: o canal de texto ao centro, a sala ' +
          'de voz, o celular, o tema claro e um servidor com a cor do cliente',
        formato: 'cartaz',
      },
      {
        src: '/projetos/orion-canal.webp',
        legenda: 'Canal de texto',
        texto:
          'Um canal por assunto, com respostas, reações, anexos e busca. Mensagem nova, presença ' +
          'e “digitando…” aparecem sem recarregar a página.',
        formato: 'tela',
      },
      {
        src: '/projetos/orion-voz.webp',
        legenda: 'Sala de voz',
        texto:
          'Quem está na sala e há quanto tempo. No rodapé, microfone, som, remoção de ruído, ' +
          'compartilhamento de tela e a qualidade da imagem.',
        formato: 'tela',
      },
      {
        src: '/projetos/orion-plano-de-fundo.webp',
        legenda: 'A cor do cliente',
        texto:
          'O dono do servidor sobe uma imagem de fundo, e a interface inteira passa a usar a cor ' +
          'dela — botões, avatares e destaques.',
        formato: 'tela',
      },
      {
        src: '/projetos/orion-tema-claro.webp',
        legenda: 'Tema claro',
        texto: 'Claro, escuro ou o mesmo do sistema operacional.',
        formato: 'tela',
      },
      {
        src: '/projetos/orion-novidades.webp',
        legenda: 'Novidades',
        texto:
          'Na tela inicial, cada melhoria e correção com data e hora. Quando sai versão nova, a ' +
          'marca avisa e o primeiro cartão traz o botão de atualizar.',
        formato: 'tela',
      },
      {
        src: '/projetos/orion-celular-gaveta.webp',
        legenda: 'Servidores e canais',
        texto: 'No celular, tudo numa gaveta, a um toque do menu.',
        formato: 'celular',
      },
      {
        src: '/projetos/orion-celular-canal.webp',
        legenda: 'A conversa',
        texto: 'Mensagens, respostas e reações na tela toda.',
        formato: 'celular',
      },
      {
        src: '/projetos/orion-celular-voz.webp',
        legenda: 'A chamada',
        texto: 'Quem está na sala, e os controles ao alcance do polegar.',
        formato: 'celular',
      },
    ],
  },
  {
    id: 'minhas-senhas',
    titulo: 'Minhas Senhas',
    resumo:
      'Gerenciador de senhas offline para Android, desktop e terminal — sem conta, sem nuvem, ' +
      'num formato aberto que abre no KeePassXC.',
    papel: 'Tudo: núcleo, criptografia, apps e site',
    paraQuem: 'Quem quer as senhas só no próprio aparelho',
    ondeRoda: 'No aparelho — não existe servidor',
    tecnologias: ['kotlin', 'android', 'svelte', 'astro'],
    situacao: 'producao',
    privado: true,
    site: { url: 'https://minhasenha.duckdns.org/#demonstracao', rotulo: 'Experimentar o cofre' },
    periodo: '2026',
    destaque: true,

    provas: [
      { valor: '9', rotulo: 'decisões de arquitetura registradas' },
      { valor: '3', rotulo: 'apps sobre um núcleo só: Android, desktop e terminal' },
      { valor: '0', rotulo: 'servidores — nada sai dos seus aparelhos' },
    ],
    decisaoChave: {
      adr: 'ADR-001',
      texto:
        'O cofre é um arquivo KDBX 4.1 sem alterações, que abre no KeePassXC e no KeePassDX. ' +
        'Se o app sumir amanhã, as senhas continuam suas.',
    },

    problema:
      'A maioria dos gerenciadores de senha pede uma conta e guarda o cofre num servidor. O Minhas ' +
      'Senhas faz o contrário: o cofre fica cifrado no aparelho, sem conta nem nuvem, e os ' +
      'aparelhos sincronizam direto entre si, pela rede local.',
    restricoes: [
      { rotulo: 'Sem nuvem', nota: 'A única rede usada é a local, entre os seus próprios aparelhos.' },
      { rotulo: 'Modelo de ameaça formal', nota: 'Inclui o que sobra na memória depois que o cofre trava.' },
      { rotulo: 'Memória do celular', nota: 'O limite de memória do Android define os parâmetros do Argon2.' },
    ],
    adrs: 9,
    decisoes: [
      {
        titulo: 'Formato aberto, sem prisão',
        adr: 'ADR-001',
        porque:
          'O cofre é KDBX 4.1 sem alterações, o mesmo do KeePassXC e do KeePassDX. As limitações ' +
          'da biblioteca usada estão documentadas, e as brechas que ela deixava foram fechadas do ' +
          'lado do projeto.',
        descartado: 'Um formato próprio.',
      },
      {
        titulo: 'O sincronismo mora dentro do arquivo',
        adr: 'ADR-003',
        porque:
          'Relógios de Lamport, vetor de versões e lápides vão dentro do próprio KDBX, então até ' +
          'uma cópia do arquivo pode ser mesclada. Só edições simultâneas que o outro lado nunca ' +
          'viu viram conflito — nenhuma senha some em silêncio.',
        descartado: 'Um servidor de sincronismo, que contradiz a proposta.',
      },
      {
        titulo: 'O preenchimento automático desconfia do app',
        adr: 'ADR-008',
        porque:
          'Qualquer app pode declarar o domínio que quiser. O domínio só vale quando vem de uma ' +
          'lista fixa de navegadores, e a comparação é pelo domínio registrável — uma página falsa ' +
          'parecida com a do banco não recebe a senha.',
        descartado: 'Confiar no domínio que o app declara.',
      },
      {
        titulo: 'O segundo fator fica fora do cofre',
        adr: 'ADR-006',
        porque:
          'Guardar os códigos TOTP junto das senhas colocaria os dois fatores no mesmo lugar: ' +
          'quem abre um, abre os dois.',
        descartado: 'Guardar os códigos TOTP no próprio cofre.',
      },
    ],
    arquitetura: {
      legenda: 'Tracejado: sincronismo direto entre aparelhos, sem servidor no meio',
      caixas: [
        { id: 'cli', titulo: 'Terminal', nota: 'Clikt', coluna: 0, linha: 0 },
        { id: 'desktop', titulo: 'Desktop', nota: 'Compose Desktop', coluna: 1, linha: 0, forte: true },
        { id: 'android', titulo: 'Android', nota: 'Compose · biometria', coluna: 2, linha: 0, forte: true },
        { id: 'outro', titulo: 'Outro aparelho', nota: 'o mesmo cofre', coluna: 3, linha: 0 },
        { id: 'nucleo', titulo: 'Núcleo', nota: 'Kotlin Multiplatform', coluna: 1, linha: 1, forte: true },
        { id: 'arquivo', titulo: 'Arquivo KDBX 4.1', nota: 'abre no KeePassXC', coluna: 1, linha: 2 },
      ],
      ligacoes: [
        { de: 'cli', para: 'nucleo' },
        { de: 'desktop', para: 'nucleo' },
        { de: 'android', para: 'nucleo' },
        { de: 'nucleo', para: 'arquivo', rotulo: 'Argon2id · AES-256' },
        { de: 'android', para: 'outro', rotulo: 'rede local', tracejada: true, dupla: true },
      ],
    },
    stack: [
      { camada: 'Núcleo', ferramenta: 'Kotlin Multiplatform', papel: 'Formato KDBX, criptografia e o motor de mesclagem, os mesmos nos três apps' },
      { camada: 'Criptografia', ferramenta: 'Argon2id · AES-256 · XChaCha20-Poly1305', papel: 'KDBX no arquivo; no banco local, cada cifra amarrada ao registro, ao campo e à versão' },
      { camada: 'Dados', ferramenta: 'SQLDelight · SQLite', papel: 'Banco local comum, cifrado pela aplicação — o SQLCipher exigiria duas configurações diferentes' },
      { camada: 'Interface', ferramenta: 'Compose Multiplatform', papel: 'Desktop e Android com o mesmo código de interface; biometria pelo Keystore' },
      { camada: 'Sincronismo', ferramenta: 'mDNS · TLS mútuo · QR code', papel: 'Os aparelhos se acham na rede local e se autenticam por QR e código de 6 dígitos' },
      { camada: 'Qualidade', ferramenta: 'Kotest · Jazzer · Roborazzi', papel: 'Testes de propriedade, fuzzing, capturas de tela e interoperabilidade com o KeePassXC' },
      { camada: 'Site', ferramenta: 'Astro · Svelte', papel: 'Página pública com uma demonstração que roda inteira no navegador' },
    ],
    dificil: {
      titulo: 'O teste que passava quebrado',
      texto: [
        'O plano previa um teste que tira um retrato da memória depois de travar o cofre e procura ' +
          'segredos lá dentro. Ele falhou, como previsto — e a caça achou três culpados: o cofre ' +
          'travado ainda segurando o banco, o reaproveitamento de buffers de uma biblioteca de E/S ' +
          'e um buffer do leitor de XML do próprio Java.',
        'A correção: travar passou a liberar o banco, e uma rotina de higiene sobrescreve esses ' +
          'buffers depois de cada leitura e escrita. E o próprio teste, que tinha chegado a passar ' +
          'mesmo quebrado, ganhou um controle positivo: um vazamento plantado de propósito que ele ' +
          'é obrigado a encontrar.',
      ],
    },
    proximos: 'Publicação na Play Store e para Windows.',
    imagens: [
      { src: '/projetos/minhas-senhas-demo.webp', legenda: 'A demonstração do site: o cofre com dados fictícios', formato: 'tela' },
      { src: '/projetos/minhas-senhas-site.webp', legenda: 'A página pública do projeto', formato: 'tela' },
    ],
  },
  {
    id: 'qualipt',
    titulo: 'QualiPT',
    resumo:
      'Inspeção visual do pré-tratamento de uma montadora, com foto, no celular — funciona sem ' +
      'internet e abre sozinho a não conformidade quando algo está errado.',
    papel: 'Tudo: banco, API, interface e servidor',
    paraQuem: 'Operadores e supervisores da inspeção',
    ondeRoda: 'Servidor próprio; o registro, no celular e no tablet da linha',
    tecnologias: ['php', 'laravel', 'vue', 'typescript', 'tailwind', 'docker', 'mysql', 'nginx'],
    situacao: 'ativo',
    privado: true,
    periodo: '2026',
    destaque: true,

    provas: [
      { valor: '300+', rotulo: 'testes, no servidor e na interface' },
      { valor: '13', rotulo: 'decisões de arquitetura registradas' },
      { valor: '11', rotulo: 'tabelas guardadas por triggers contra alteração' },
    ],
    decisaoChave: {
      adr: 'ADR-006',
      texto:
        'Registro de inspeção é evidência: depois de gravado, o próprio banco recusa alterá-lo. ' +
        'Errou? O registro é anulado com motivo e continua visível, riscado.',
    },

    problema:
      'A inspeção visual do pré-tratamento precisa de evidência que não muda depois: foto, ' +
      'checklist, resultado e uma hora em que se possa confiar — e cada não conformidade ' +
      'acompanhada até ser validada. O QualiPT põe isso num app de celular que registra sem ' +
      'internet, abre a não conformidade sozinho e substitui também a planilha de medição dos banhos.',
    restricoes: [
      { rotulo: 'Perder registro é inaceitável', nota: 'A rede da fábrica é incerta, e o iPhone não sincroniza em segundo plano.' },
      { rotulo: 'Um IP para a fábrica toda', nota: 'O firewall bane um IP por 4 horas: um ban tiraria todo mundo do ar.' },
      { rotulo: 'Servidor modesto', nota: 'CPU fraca, sem armazenamento de objetos, e o proxy corta requisições acima de 60 s.' },
    ],
    recursos: [
      { titulo: 'Registro em dois toques', texto: 'Tocar na etapa já abre a câmera; “Conforme” marca “Aparência normal” sozinho.' },
      {
        titulo: 'Sem internet',
        texto:
          'Registro e fotos ficam no aparelho e sobem quando a rede volta. O rascunho sobrevive até ' +
          'ao app fechar com a câmera aberta.',
      },
      {
        titulo: 'Não conformidade automática',
        texto: '“Não conforme” abre a NC, e o supervisor a conduz até validada, com fotos da tratativa e linha do tempo.',
      },
      { titulo: 'Hora confiável', texto: 'Cada registro leva um selo — confirmado, offline ou divergente — calculado pelo servidor.' },
      {
        titulo: 'Painel do supervisor',
        texto: 'NCs por etapa, Pareto por defeito e evolução diária. Tocar numa barra abre os registros; todo gráfico tem tabela.',
      },
      {
        titulo: 'Análise do banho',
        texto: 'Medições por horário contra a faixa de controle, com gráficos que exportam PNG e CSV.',
      },
      { titulo: 'Nada se apaga', texto: 'Registro errado é anulado com motivo e continua visível; toda mudança fica na trilha.' },
      {
        titulo: 'Configurável e bilíngue',
        texto: 'O administrador ajusta etapas e checklists pelo próprio app, em português e inglês.',
      },
    ],
    adrs: 13,
    decisoes: [
      {
        titulo: 'Offline primeiro, sem repetir',
        adr: 'ADR-002',
        porque:
          'Registro e foto vão para o IndexedDB e sobem um por requisição. O identificador nasce no ' +
          'aparelho: reenviar devolve “já existia”, e o mesmo identificador com outro conteúdo é ' +
          'recusado. Com a sessão vencida, a fila para em vez de insistir.',
        descartado: 'Exigir conexão, ou depender do Background Sync, que o iPhone não tem.',
      },
      {
        titulo: 'A hora oficial é do servidor',
        adr: 'ADR-004',
        porque:
          'O relógio do celular não é confiável, e sem rede não há a quem perguntar. Cada resposta ' +
          'traz a hora do servidor; o app guarda a diferença junto da captura, e o servidor calcula ' +
          'a hora oficial e marca o registro como confirmado, offline ou divergente.',
        descartado: 'Recusar o registro quando o relógio está errado — o selo fica para o supervisor ver.',
      },
      {
        titulo: 'O banco recusa a alteração',
        adr: 'ADR-006',
        porque:
          'Triggers do MySQL, gerados a partir das colunas reais, barram UPDATE e DELETE; um teste ' +
          'confere que nenhuma tabela ficou de fora. A única mudança permitida é anular, uma vez. ' +
          'Isso barra bug do próprio código e edição manual no banco — não quem tem a senha dele.',
        descartado: 'Proteger só no código da aplicação, que não barra nem um bug nem uma edição direta.',
      },
      {
        titulo: 'Uma API que não provoca o firewall',
        adr: 'ADR-008',
        porque:
          'Uma rajada de erros 401, 403 ou 404 bane o IP da fábrica por 4 horas. A API foi desenhada ' +
          'para não gerá-la: listas que já trazem o detalhe, busca vazia que responde 200 e uma ' +
          'consulta leve que confirma a sessão antes de cada rodada de envio.',
        descartado: 'Respostas REST “de manual”, que disparam o ban em uso normal.',
      },
    ],
    arquitetura: {
      legenda: 'Tracejado: o caminho quando a linha está sem rede',
      caixas: [
        { id: 'app', titulo: 'Celular e tablet', nota: 'Vue 3 · PWA', coluna: 0, linha: 0, forte: true },
        { id: 'fila', titulo: 'Fila no aparelho', nota: 'Dexie · fotos em Blob', coluna: 0, linha: 1 },
        { id: 'borda', titulo: 'Traefik + Nginx', nota: 'TLS · CrowdSec', coluna: 1, linha: 0 },
        { id: 'laravel', titulo: 'Laravel 13', nota: 'API · Sanctum', coluna: 2, linha: 0, forte: true },
        { id: 'fotos', titulo: 'Fotos em disco', nota: 'rota privada', coluna: 2, linha: 1 },
        { id: 'mysql', titulo: 'MySQL 8.4', nota: 'triggers imutáveis', coluna: 3, linha: 0 },
        { id: 'backup', titulo: 'Backups', nota: 'dump a cada 15 min', coluna: 3, linha: 1 },
      ],
      ligacoes: [
        { de: 'app', para: 'borda', rotulo: 'HTTPS' },
        { de: 'app', para: 'fila', rotulo: 'sem rede', tracejada: true },
        { de: 'fila', para: 'borda', rotulo: 'quando a rede volta', tracejada: true, rota: 'hv' },
        { de: 'borda', para: 'laravel', rotulo: 'API' },
        { de: 'laravel', para: 'mysql' },
        { de: 'laravel', para: 'fotos' },
        { de: 'mysql', para: 'backup' },
      ],
    },
    stack: [
      { camada: 'Backend', ferramenta: 'Laravel 13 · PHP 8.4 · Sanctum', papel: 'API em módulos por domínio; sessão em cookie com CSRF' },
      { camada: 'Interface', ferramenta: 'Vue 3 · TypeScript · Pinia · Tailwind', papel: '16 telas em português e inglês; os gráficos só carregam onde aparecem' },
      { camada: 'Offline', ferramenta: 'Service Worker · Dexie', papel: 'Registro e fotos no aparelho; a foto é comprimida e tem o hash calculado ali mesmo' },
      { camada: 'Dados', ferramenta: 'MySQL 8.4', papel: 'Triggers de imutabilidade, tudo em UTC; sessão e cache no próprio banco' },
      { camada: 'Infra', ferramenta: 'Docker · Nginx · Traefik · CrowdSec', papel: 'Imagens de produção versionadas; backup conferido e espelho das fotos' },
      { camada: 'Qualidade', ferramenta: 'Pest · Vitest · Puppeteer · Larastan', papel: 'Testes no mesmo MySQL da produção; 5 roteiros num Chrome de verdade' },
    ],
    dificil: {
      titulo: 'A foto que o app aceitava e o servidor recusava',
      texto: [
        'O servidor exigia 480 px nos dois lados da foto e recusava uma imagem larga e baixa — um ' +
          'print de planilha de 1081 × 423, por exemplo — que o app já tinha aceitado e guardado. ' +
          'Num sistema que grava primeiro no aparelho, a recusa chega tarde: o registro ficava ' +
          'parado no celular.',
        'Agora vale qualquer proporção, só com um teto de 2560 px. Os registros recusados apenas ' +
          'pela foto voltam sozinhos para a fila uma vez, quando o app atualiza; como a recusa guarda ' +
          'a versão do app, não há laço de reenvio. O print de 1081 × 423 virou caso de teste.',
      ],
    },
    proximos:
      'A entrada em produção: ligar o domínio, testar a rede no Wi-Fi da fábrica e nos dados ' +
      'móveis, instalar nos aparelhos e acompanhar o primeiro dia. Depois, uma cópia cifrada dos ' +
      'backups fora da máquina.',
    imagens: [
      // Capturas reais, tiradas pelos roteiros de teste do próprio QualiPT com dados de
      // demonstração: as fotos das peças são ruído sintético.
      {
        src: '/projetos/qualipt-graficos.webp',
        legenda: 'Gráficos de controle do banho no tablet, com as faixas de mínimo e máximo',
        formato: 'tela',
      },
      {
        src: '/projetos/qualipt-painel.webp',
        legenda: 'Painel do supervisor',
        texto: 'Registros, conformes e NCs do período; as não conformidades por etapa e por tipo de defeito.',
        formato: 'tela',
      },
      {
        src: '/projetos/qualipt-analise.webp',
        legenda: 'Análise do banho',
        texto:
          'As medições do dia por horário, com a faixa de controle de cada parâmetro. O valor fora ' +
          'dela aparece em vermelho, com a direção do desvio.',
        formato: 'tela',
      },
      {
        src: '/projetos/qualipt-registro.webp',
        legenda: 'O registro',
        texto: 'Foto, resultado e checklist da etapa.',
        formato: 'celular',
      },
      {
        src: '/projetos/qualipt-sem-rede.webp',
        legenda: 'Salvo sem rede',
        texto: 'A NC é aberta quando o registro chegar ao servidor.',
        formato: 'celular',
      },
      {
        src: '/projetos/qualipt-nc.webp',
        legenda: 'A não conformidade',
        texto: 'Da abertura à validação, com a linha do tempo da tratativa.',
        formato: 'celular',
      },
    ],
  },
  {
    id: 'ponte',
    titulo: 'Ponte Tradutor',
    resumo:
      'Tradutor que mora na bandeja do Windows: traduz o que você seleciona ou copia, responde no ' +
      'idioma da conversa, digita o que você fala e legenda uma chamada ao vivo.',
    papel: 'Tudo: núcleo em Rust, interface e instalador',
    paraQuem: 'Uso próprio, em conversas com gente de outros países',
    ondeRoda: 'Windows 10 e 11, na bandeja; a voz é reconhecida no próprio PC',
    tecnologias: ['rust', 'tauri', 'react', 'typescript', 'tailwind'],
    situacao: 'ativo',
    privado: true,
    periodo: '2026',
    // Sem capturas ainda: o app só roda no Windows. Vai para o índice até ter telas.
    destaque: false,

    provas: [
      { valor: '160+', rotulo: 'testes automatizados no núcleo em Rust' },
      { valor: '103', rotulo: 'decisões técnicas registradas' },
      { valor: '8', rotulo: 'serviços de tradução e voz em fila — se um falha, o próximo assume' },
    ],
    decisaoChave: {
      texto:
        'Cinco tradutores e três motores de voz numa fila que o usuário ordena. Se um falha, esgota ' +
        'a cota ou está sem chave, o próximo assume — e funciona até sem chave nenhuma.',
    },

    problema:
      'Conversar com gente de outros países no WhatsApp, no Discord ou por e-mail costuma ser um ' +
      'vaivém de copiar, colar num site de tradução e copiar de volta — e para de funcionar quando ' +
      'a cota da API acaba. O Ponte faz isso de dentro de qualquer app, com um atalho, e troca de ' +
      'serviço sozinho quando um deles falha.',
    restricoes: [
      { rotulo: 'As regras do Windows', nota: 'App em segundo plano não pode roubar o foco, e o sistema bloqueia teclas simuladas em apps de administrador.' },
      { rotulo: 'Cotas gratuitas', nota: 'Cada API tem limite por dia ou por mês. Nenhuma chave pode ser obrigatória.' },
      { rotulo: 'Não atrapalhar', nota: 'Não sujar a área de transferência nem o histórico do Win+V; nos logs, nada de texto nem de áudio.' },
    ],
    recursos: [
      {
        titulo: 'Traduzir a seleção',
        texto: 'Um atalho, e a tradução aparece perto do cursor. A área de transferência volta como estava, até com imagem.',
      },
      {
        titulo: 'Traduzir o que você copia',
        texto: 'Ignora o que já está no seu idioma, links, números, e-mails e o que os gerenciadores de senha marcam.',
      },
      {
        titulo: 'Responder no idioma da conversa',
        texto: 'Você escreve em português, vê a prévia enquanto digita, e o Enter cola a tradução no app de onde veio.',
      },
      {
        titulo: 'Ditado em qualquer app',
        texto: 'Digita no campo em foco a cada pausa, com comandos como “nova linha” e “enviar” — ou já traduzido.',
      },
      {
        titulo: 'Conversa ao vivo',
        texto: 'Ouve o som do computador e o microfone e mostra a tradução fala por fala. Nada é gravado.',
      },
      {
        titulo: 'Nunca para',
        texto: 'Cinco tradutores e três motores de voz numa ordem ajustável; quando um cai, o próximo assume.',
      },
      {
        titulo: 'Painel de uso',
        texto: 'Quanto foi usado e quanto resta de cada API, com o número oficial onde o serviço informa.',
      },
    ],
    adrs: 103,
    decisoes: [
      {
        titulo: 'O motor fica no Rust; as janelas só exibem',
        adr: 'Nº 010',
        porque:
          'As chaves de API e a área de transferência nunca chegam ao WebView, e o motor funciona com ' +
          'todas as janelas fechadas. Cada janela recebe só os comandos que usa.',
        descartado: 'Chamar os plugins de área de transferência e configuração direto do JavaScript das janelas.',
      },
      {
        titulo: 'A área de transferência volta inteira',
        adr: 'Nº 013',
        porque:
          'Para ler a seleção, o app precisa copiar. Antes, ele guarda todos os formatos pela API do ' +
          'Windows e os devolve depois, fora do histórico. A mudança é detectada pelo número de ' +
          'sequência, que muda mesmo quando o texto copiado é igual ao anterior.',
        descartado: 'Guardar só o texto, e comparar o conteúdo para saber se mudou.',
      },
      {
        titulo: 'O som do computador, sem driver',
        adr: 'Nº 092',
        porque:
          'A saída de som é aberta como entrada, em modo loopback, sem instalar nada. Com caixas de ' +
          'som, o trecho do microfone coberto pela fala do computador é descartado, para a mesma fala ' +
          'não aparecer duas vezes.',
        descartado: 'Driver virtual de áudio, “Mixagem estéreo” ou cancelamento de eco.',
      },
      {
        titulo: 'GPU quando houver, sem depender dela',
        adr: 'Nº 031',
        porque:
          'O Whisper usa a placa de vídeo pelo Vulkan, mas a biblioteca só é carregada na hora do uso. ' +
          'Sem driver, ele cai para o processador ou para a nuvem — o app abre em qualquer Windows.',
        descartado: 'Ligar o executável direto ao Vulkan, que impediria o app de abrir sem driver de vídeo.',
      },
    ],
    arquitetura: {
      legenda: 'Tudo passa pelo núcleo: as janelas só exibem, e as chaves nunca chegam a elas',
      caixas: [
        { id: 'janelas', titulo: 'Janelas React', nota: 'React · 5 WebViews', coluna: 1, linha: 0, forte: true },
        { id: 'apps', titulo: 'Apps do Windows', nota: 'WhatsApp · chamadas', coluna: 0, linha: 1, forte: true },
        { id: 'nucleo', titulo: 'Núcleo Rust', nota: 'Tauri 2 · Win32', coluna: 1, linha: 1, forte: true },
        { id: 'traducao', titulo: 'Cadeia de tradução', nota: 'fila · pausa por cota', coluna: 2, linha: 1 },
        { id: 'tradutores', titulo: '5 tradutores', nota: 'nuvem · LibreTranslate', coluna: 3, linha: 1 },
        { id: 'voz', titulo: 'Cadeia de voz', nota: 'Silero VAD · fila', coluna: 2, linha: 2 },
        { id: 'motores', titulo: 'Motores de voz', nota: 'Whisper local · nuvem', coluna: 3, linha: 2 },
      ],
      ligacoes: [
        { de: 'apps', para: 'nucleo', rotulo: 'texto, áudio', dupla: true },
        { de: 'janelas', para: 'nucleo', rotulo: 'comandos', dupla: true },
        { de: 'nucleo', para: 'traducao', rotulo: 'texto' },
        { de: 'traducao', para: 'tradutores', rotulo: 'HTTPS · 4 s' },
        { de: 'nucleo', para: 'voz', rotulo: 'áudio' },
        { de: 'voz', para: 'motores', rotulo: 'áudio 16 kHz' },
      ],
    },
    stack: [
      { camada: 'Núcleo', ferramenta: 'Rust · Tauri 2', papel: 'Bandeja, atalhos globais, 48 comandos e as filas de tradução e voz' },
      { camada: 'Interface', ferramenta: 'React · TypeScript · Tailwind', papel: 'Cinco janelas, da tradução ao lado do cursor às configurações' },
      { camada: 'Windows', ferramenta: 'API Win32 · Gerenciador de Credenciais', papel: 'Área de transferência, foco e teclas; as chaves ficam no cofre do sistema' },
      { camada: 'Tradução', ferramenta: 'DeepL · Azure · Google · LibreTranslate · MyMemory', papel: 'Em fila, com pausa automática quando a cota acaba; idioma detectado localmente' },
      { camada: 'Voz', ferramenta: 'Whisper · Silero VAD · Deepgram · Groq', papel: 'Reconhecimento no próprio PC, com a nuvem de reserva' },
      { camada: 'Qualidade', ferramenta: 'cargo test · wiremock · clippy', papel: 'Um servidor falso por tradutor; unwrap proibido fora dos testes' },
    ],
    dificil: {
      titulo: 'Cada fala aparecia duas vezes',
      texto: [
        'No primeiro teste de ponta a ponta da conversa ao vivo, cada fala da outra pessoa saía ' +
          'duas vezes: o microfone ouvia as caixas de som. E um “Hello.” sozinho era detectado como ' +
          'soto, enquanto o Whisper tinha ouvido inglês.',
        'A correção: o trecho do microfone com pelo menos metade coberta por fala do computador é ' +
          'descartado na hora, pelos intervalos do detector de fala, sem esperar a transcrição — ' +
          'ao custo documentado de perder o que se fala por cima do outro. Nas frases curtas, quem ' +
          'decide o idioma passou a ser o áudio; o texto só o desmente a partir de quatro palavras.',
      ],
    },
    proximos:
      'Ouvir só o app da chamada, em vez do som inteiro do computador, e testar com monitores de ' +
      'escalas diferentes.',
    imagens: [],
  },
];

export const rotuloSituacao: Record<Situacao, string> = {
  producao: 'Em produção',
  ativo: 'Em evolução',
  concluido: 'Concluído',
};
