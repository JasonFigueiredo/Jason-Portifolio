import type { Metadata } from 'next';
import PaginaInicial from '@/components/PaginaInicial';
import { alternativas } from '@/components/metadados';

export const metadata: Metadata = { alternates: alternativas('pt', '/') };

export default function Pagina() {
  return <PaginaInicial idioma="pt" />;
}
