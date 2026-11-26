import type { Metadata } from 'next';
import Documento from '@/components/Documento';
import { metadadosDoLayout } from '@/components/metadados';
import '../globals.css';

// Layout raiz do português, que mora na raiz do site. O do inglês fica em
// app/(en): dois layouts raiz para o <html lang> sair certo em cada um.
export const metadata: Metadata = metadadosDoLayout('pt');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Documento idioma="pt">{children}</Documento>;
}
