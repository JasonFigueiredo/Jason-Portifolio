import type { Texto } from './idioma';
import type { NomeIcone } from '@/components/Icone';

// Os cinco pilares do manual da marca. Cada um aponta para os projetos que o
// comprovam: serviço sem projeto por trás é autoavaliação, e autoavaliação é o
// sinal mais fácil de falsificar. Um pilar novo só entra com prova.

export type Servico = {
  id: string;
  icone: NomeIcone;
  titulo: Texto;
  texto: Texto;
  /** ids em data/projetos.ts, do que mais prova para o que menos prova */
  projetos: string[];
  /** onde, nesses projetos, está a prova */
  onde: Texto;
};

export const servicos: Servico[] = [
  {
    id: 'software',
    icone: 'janelaCodigo',
    titulo: { pt: 'Desenvolvimento de software', en: 'Software development' },
    texto: {
      pt: 'Sistemas sob medida, do banco de dados à interface, desenhados em volta do problema de quem vai usar.',
      en: 'Custom systems, from the database to the interface, designed around the problem of the people who use them.',
    },
    projetos: ['inova-blocos', 'orion', 'minhas-senhas', 'qualipt', 'ponte'],
    onde: {
      pt: 'Web, Android, desktop e terminal — cada um feito de ponta a ponta.',
      en: 'Web, Android, desktop and terminal — each one built end to end.',
    },
  },
  {
    id: 'integracao',
    icone: 'rede',
    titulo: { pt: 'Integração de sistemas', en: 'Systems integration' },
    texto: {
      pt: 'Peças que conversam: tempo real entre navegadores, aparelhos que se sincronizam sozinhos e serviços externos com fila e plano B.',
      en: 'Parts that talk to each other: real time between browsers, devices that sync on their own, and external services with queues and fallbacks.',
    },
    projetos: ['orion', 'minhas-senhas', 'ponte'],
    onde: {
      pt: 'Voz e tela por WebRTC, sincronismo por mDNS e TLS mútuo, oito serviços de tradução e voz em fila.',
      en: 'Voice and screen over WebRTC, sync over mDNS and mutual TLS, eight translation and speech services in a queue.',
    },
  },
  {
    id: 'automacao',
    icone: 'chip',
    titulo: { pt: 'Automação e IA', en: 'Automation & AI' },
    texto: {
      pt: 'Tradução instantânea e voz reconhecida no próprio computador, com a nuvem só de reserva. E rotinas que rodam sozinhas no servidor.',
      en: 'Instant translation and speech recognized on the computer itself, with the cloud only as a fallback. Plus routines that run on their own on the server.',
    },
    projetos: ['ponte', 'inova-blocos'],
    onde: {
      pt: 'Whisper e detecção de fala locais no Ponte; fila de tarefas e agendador no Inova.',
      en: 'Local Whisper and speech detection in Ponte; task queue and scheduler in Inova.',
    },
  },
  {
    id: 'infraestrutura',
    icone: 'nuvem',
    titulo: { pt: 'Infraestrutura digital', en: 'Digital infrastructure' },
    texto: {
      pt: 'Servidor próprio com contêineres, TLS na borda, backup conferido e o mesmo ambiente do desenvolvimento à produção.',
      en: 'Self-hosted servers with containers, TLS at the edge, verified backups and the same environment from development to production.',
    },
    projetos: ['inova-blocos', 'orion', 'qualipt'],
    onde: {
      pt: 'Docker Compose, Nginx e Traefik nos três; CrowdSec e espelho das fotos no QualiPT.',
      en: 'Docker Compose, Nginx and Traefik in all three; CrowdSec and photo mirroring in QualiPT.',
    },
  },
  {
    id: 'consultoria',
    icone: 'escudo',
    titulo: { pt: 'Consultoria em tecnologia', en: 'Technology consulting' },
    texto: {
      pt: 'Cada decisão técnica registrada com o motivo e a alternativa descartada, para quem vem depois entender o porquê.',
      en: 'Every technical decision recorded with its reason and the alternative left out, so whoever comes next understands why.',
    },
    projetos: ['orion', 'qualipt', 'minhas-senhas', 'ponte'],
    onde: {
      pt: 'Registros de decisão (ADRs) nos repositórios, resumidos em cada estudo de caso.',
      en: 'Architecture decision records (ADRs) in the repositories, summarized in each case study.',
    },
  },
];
