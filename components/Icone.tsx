// Ícones em SVG inline. Substituem o Font Awesome, que vinha por CDN:
// menos uma dependência externa e nenhum salto de layout ao carregar.
// Os cinco dos serviços seguem os do manual da marca: traço fino, cantos redondos.

const tracos = {
  casa: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  maleta: ['M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'],
  codigo: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
  email: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 6l-10 7L2 6'],
  lua: ['M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'],
  sol: ['M12 1v2', 'M12 21v2', 'M4.22 4.22l1.42 1.42', 'M18.36 18.36l1.42 1.42', 'M1 12h2', 'M21 12h2', 'M4.22 19.78l1.42-1.42', 'M18.36 5.64l1.42-1.42'],
  setaDireita: ['M5 12h14', 'M12 5l7 7-7 7'],
  setaBaixo: ['M12 5v14', 'M19 12l-7 7-7-7'],
  setaCanto: ['M7 17L17 7', 'M8 7h9v9'],
  externo: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14L21 3'],
  menu: ['M3 12h18', 'M3 6h18', 'M3 18h18'],
  fechar: ['M18 6L6 18', 'M6 6l12 12'],
  cadeado: ['M7 11V7a5 5 0 0 1 10 0v4'],
  mais: ['M12 5v14', 'M5 12h14'],
  globo: ['M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
  play: ['M7 4.5l12 7.5-12 7.5z'],
  pausa: ['M9 5v14', 'M15 5v14'],
  // --- serviços ---
  janelaCodigo: ['M3 9h18', 'M10 13l-2 2 2 2', 'M14 13l2 2-2 2'],
  rede: ['M7.2 6h9.6', 'M6.2 7.9l4.7 9.2', 'M17.8 7.9l-4.7 9.2'],
  chip: ['M9 3v4', 'M15 3v4', 'M9 17v4', 'M15 17v4', 'M3 9h4', 'M3 15h4', 'M17 9h4', 'M17 15h4', 'M10 10h4v4h-4z'],
  nuvem: ['M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z'],
  escudo: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
} as const;

export type NomeIcone = keyof typeof tracos | 'github' | 'linkedin';

/** Ícones que precisam de uma forma além dos traços. */
const extras: Partial<Record<NomeIcone, React.ReactNode>> = {
  maleta: <rect x="2" y="7" width="20" height="14" rx="2" />,
  sol: <circle cx="12" cy="12" r="5" />,
  cadeado: <rect x="3" y="11" width="18" height="11" rx="2" />,
  globo: <circle cx="12" cy="12" r="10" />,
  janelaCodigo: <rect x="3" y="4" width="18" height="16" rx="2" />,
  rede: (
    <>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="12" cy="19" r="2.2" />
    </>
  ),
  chip: <rect x="7" y="7" width="10" height="10" rx="1.5" />,
};

/** Marcas de terceiros: desenho cheio, não traço. */
const cheios: Partial<Record<NomeIcone, string>> = {
  github:
    'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
};

type Props = {
  nome: NomeIcone;
  /** tamanho em pixels; o ícone é sempre quadrado */
  tamanho?: number;
  className?: string;
};

export default function Icone({ nome, tamanho = 20, className }: Props) {
  const cheio = cheios[nome];
  if (cheio) {
    return (
      <svg viewBox="0 0 24 24" width={tamanho} height={tamanho} fill="currentColor" aria-hidden className={className}>
        <path d={cheio} />
      </svg>
    );
  }

  const caminhos = tracos[nome as keyof typeof tracos];

  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {extras[nome]}
      {caminhos.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
