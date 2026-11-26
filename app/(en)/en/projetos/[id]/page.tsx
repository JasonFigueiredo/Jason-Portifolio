import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projetos } from '@/data/projetos';
import EstudoDeCaso from '@/components/EstudoDeCaso';
import { metadadosDoProjeto, parametrosDosProjetos } from '@/components/metadados';

// O mesmo estudo de caso em inglês. O endereço guarda o id em português de
// propósito: é o mesmo projeto, e trocar de idioma só acrescenta o /en.
export const generateStaticParams = parametrosDosProjetos;

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<'/en/projetos/[id]'>): Promise<Metadata> {
  const { id } = await props.params;
  return metadadosDoProjeto('en', id);
}

export default async function Pagina(props: PageProps<'/en/projetos/[id]'>) {
  const { id } = await props.params;
  const projeto = projetos.find((p) => p.id === id);
  if (!projeto) notFound();
  return <EstudoDeCaso projeto={projeto} idioma="en" />;
}
