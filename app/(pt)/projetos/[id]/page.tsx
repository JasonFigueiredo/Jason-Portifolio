import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projetos } from '@/data/projetos';
import EstudoDeCaso from '@/components/EstudoDeCaso';
import { metadadosDoProjeto, parametrosDosProjetos } from '@/components/metadados';

// Uma página por projeto, gerada no build. Substituiu o modal da home: modal não
// tem endereço para mandar a um cliente, não volta pelo histórico e o Google não lê.
export const generateStaticParams = parametrosDosProjetos;

// Endereço que não saiu do array é 404, não uma página montada na hora.
export const dynamicParams = false;

export async function generateMetadata(props: PageProps<'/projetos/[id]'>): Promise<Metadata> {
  const { id } = await props.params;
  return metadadosDoProjeto('pt', id);
}

export default async function Pagina(props: PageProps<'/projetos/[id]'>) {
  const { id } = await props.params;
  const projeto = projetos.find((p) => p.id === id);
  if (!projeto) notFound();
  return <EstudoDeCaso projeto={projeto} idioma="pt" />;
}
