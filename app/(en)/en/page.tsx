import type { Metadata } from 'next';
import PaginaInicial from '@/components/PaginaInicial';
import { alternativas } from '@/components/metadados';

export const metadata: Metadata = { alternates: alternativas('en', '/') };

export default function Pagina() {
  return <PaginaInicial idioma="en" />;
}
