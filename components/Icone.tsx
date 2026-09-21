// Ícones em SVG inline. Substituem o Font Awesome, que vinha por CDN:
// menos uma dependência externa e nenhum salto de layout ao carregar.

export type NomeIcone = keyof typeof tracos | 'github';

const tracos = {
  casa: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  maleta: ['M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'],
  codigo: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
  email: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 6l-10 7L2 6'],
  lua: ['M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'],
  sol: ['M12 1v2', 'M12 21v2', 'M4.22 4.22l1.42 1.42', 'M18.36 18.36l1.42 1.42', 'M1 12h2', 'M21 12h2', 'M4.22 19.78l1.42-1.42', 'M18.36 5.64l1.42-1.42'],
  setaDireita: ['M5 12h14', 'M12 5l7 7-7 7'],
  setaBaixo: ['M12 5v14', 'M19 12l-7 7-7-7'],
  baixar: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  externo: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14L21 3'],
  menu: ['M3 12h18', 'M3 6h18', 'M3 18h18'],
  fechar: ['M18 6L6 18', 'M6 6l12 12'],
  cadeado: ['M7 11V7a5 5 0 0 1 10 0v4'],
  local: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'],
  mais: ['M12 5v14', 'M5 12h14'],
} as const;

/** Ícones que precisam de uma forma além dos traços. */
const extras: Partial<Record<string, React.ReactNode>> = {
  maleta: <rect x="2" y="7" width="20" height="14" rx="2" />,
  sol: <circle cx="12" cy="12" r="5" />,
  cadeado: <rect x="3" y="11" width="18" height="11" rx="2" />,
  local: <circle cx="12" cy="10" r="3" />,
};

const GITHUB =
  'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z';

type Props = {
  nome: NomeIcone;
  /** tamanho em pixels; o ícone é sempre quadrado */
  tamanho?: number;
  className?: string;
};

export default function Icone({ nome, tamanho = 20, className }: Props) {
  if (nome === 'github') {
    return (
      <svg viewBox="0 0 24 24" width={tamanho} height={tamanho} fill="currentColor" aria-hidden className={className}>
        <path d={GITHUB} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {extras[nome]}
      {tracos[nome].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
