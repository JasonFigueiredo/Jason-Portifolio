import type { Metadata } from 'next';
import Documento from '@/components/Documento';
import Simbolo from '@/components/Simbolo';
import { textos } from '@/data/textos';
import { caminho, idiomas } from '@/data/idioma';
import styles from './nao-encontrada.module.css';
import './globals.css';

// O 404 do site inteiro. Com um layout raiz por idioma, não existe um layout
// comum de onde montar um not-found; este arquivo monta o próprio documento.
// Como não dá para saber em que língua estava quem chegou aqui, fala as duas.
// No Cloudflare, o wrangler.jsonc serve o 404.html gerado daqui com status 404.

export const metadata: Metadata = {
  title: `404 — ${textos.naoEncontrada.titulo.pt} · ${textos.naoEncontrada.titulo.en}`,
};

export default function NaoEncontrada() {
  return (
    <Documento idioma="pt">
      <main className={styles.pagina}>
        <Simbolo tamanho={72} animado />
        <p className={styles.codigo}>404</p>
        {idiomas.map((idioma) => (
          <section key={idioma} lang={idioma === 'pt' ? 'pt-BR' : 'en'} className={styles.bloco}>
            <h1>{textos.naoEncontrada.titulo[idioma]}</h1>
            <p>{textos.naoEncontrada.texto[idioma]}</p>
            <a href={caminho(idioma, '/')}>{textos.naoEncontrada.voltar[idioma]} →</a>
          </section>
        ))}
      </main>
    </Documento>
  );
}
