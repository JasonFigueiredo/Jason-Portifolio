#!/usr/bin/env node
// Transforma os quadros de gravar.mjs nos arquivos que o site usa, em
// public/projetos/: <id>-demo.mp4 (H.264), <id>-demo.webm (VP9) e o cartaz
// <id>-demo.webp (ver NOME_DO_CARTAZ). Roda no host: o ffmpeg vem de um
// contêiner, e o cartaz sai pelo sharp do próprio portfólio.
//
//   node scripts/capturas/codificar.mjs "$SAIDA" [id...]
//
// $SAIDA é a mesma pasta passada ao gravar.mjs. Sem id, codifica tudo o que
// estiver gravado lá.
//
// Dois formatos porque o <video> escolhe a primeira fonte que sabe tocar: o
// WebM com VP9 onde houver, e o MP4 com H.264 em todo o resto, Safari antigo
// incluído. Cada arquivo tem de caber em 3 MB; se passar, a qualidade desce
// um degrau e o vídeo é refeito.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const IMAGEM_FFMPEG = 'linuxserver/ffmpeg:latest';

// minhas-senhas-demo.webp já existe: é a captura da demonstração que aparece
// em "Telas" no estudo de caso. O cartaz do vídeo não pode tomar o lugar dela.
const NOME_DO_CARTAZ = { 'minhas-senhas': 'minhas-senhas-demo-cartaz.webp' };
const LIMITE = 3 * 1024 * 1024;
const DESTINO = resolve(dirname(fileURLToPath(import.meta.url)), '../../public/projetos');

// Os quadros são JPEG, em faixa cheia e matriz BT.601. Sem converter, o vídeo
// sai marcado como faixa cheia (yuvj420p), que parte dos tocadores lê como
// faixa de TV: preto lavado e branco estourado. Aqui vira o padrão de vídeo
// da web, BT.709 em faixa de TV, com as marcas que dizem isso ao navegador.
const COR = [
  '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
  '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
];

// CRF inicial de cada formato; o degrau, quando o arquivo passa do limite, é
// de 2. Tela de sistema é texto fino sobre fundo liso: acima disso a letra
// pequena começa a borrar.
const FORMATOS = [
  {
    extensao: 'mp4',
    crf: 23,
    args: (crf) => ['-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-movflags', '+faststart'],
  },
  {
    extensao: 'webm',
    crf: 36,
    args: (crf) => ['-c:v', 'libvpx-vp9', '-crf', String(crf), '-b:v', '0', '-deadline', 'good',
      '-cpu-used', '2', '-row-mt', '1'],
  },
];

const [pasta, ...pedidos] = process.argv.slice(2);
if (!pasta) {
  console.error('Uso: node scripts/capturas/codificar.mjs <pasta-das-gravacoes> [id...]');
  process.exit(1);
}
const raiz = resolve(pasta);
const ids = pedidos.length
  ? pedidos
  : readdirSync(raiz).filter((nome) => existsSync(join(raiz, nome, 'gravacao.json')));

const usuario = `${process.getuid()}:${process.getgid()}`;
const megas = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

for (const id of ids) {
  const origem = join(raiz, id);
  const gravacao = JSON.parse(readFileSync(join(origem, 'gravacao.json'), 'utf8'));

  for (const formato of FORMATOS) {
    const arquivo = `${id}-demo.${formato.extensao}`;
    for (let crf = formato.crf; ; crf += 2) {
      execFileSync('docker', [
        // Direto no ffmpeg: o script de entrada da imagem tenta trocar de
        // usuário conforme o dono dos arquivos, e com --user isso falha.
        'run', '--rm', '--user', usuario, '--entrypoint', 'ffmpeg',
        '-v', `${origem}:/entrada:ro`, '-v', `${DESTINO}:/destino`,
        IMAGEM_FFMPEG, '-hide_banner', '-loglevel', 'error', '-y',
        '-framerate', String(gravacao.quadrosPorSegundo), '-i', '/entrada/quadros/%05d.jpg',
        ...COR, ...formato.args(crf), '-an', `/destino/${arquivo}`,
      ], { stdio: 'inherit' });
      const tamanho = statSync(join(DESTINO, arquivo)).size;
      if (tamanho <= LIMITE || crf >= formato.crf + 12) {
        console.log(`${arquivo}: ${gravacao.duracao} s, ${megas(tamanho)} (crf ${crf})`);
        break;
      }
    }
  }

  const cartaz = NOME_DO_CARTAZ[id] ?? `${id}-demo.webp`;
  await sharp(join(origem, gravacao.cartaz))
    .resize(1280, 800, { fit: 'cover', position: 'top' })
    .webp({ quality: 82 })
    .toFile(join(DESTINO, cartaz));
  console.log(`${cartaz}: ${megas(statSync(join(DESTINO, cartaz)).size)}`);
}
