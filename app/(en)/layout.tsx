import type { Metadata } from 'next';
import Documento from '@/components/Documento';
import { metadadosDoLayout } from '@/components/metadados';
import '../globals.css';

// Layout raiz do inglês, para tudo o que mora debaixo de /en.
export const metadata: Metadata = metadadosDoLayout('en');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Documento idioma="en">{children}</Documento>;
}
