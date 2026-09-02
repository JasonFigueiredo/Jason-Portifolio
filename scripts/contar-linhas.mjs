#!/usr/bin/env node
// Conta linhas de código autoral nos meus repositórios e imprime os números
// prontos para colar em data/tecnologias.ts.
//
// A diferença para a versão antiga: descarta dependências, saídas de build e
// bibliotecas de terceiros commitadas (Bootstrap, templates de admin). Sem isso
// o portfólio contava 439 mil linhas, das quais a maior parte não era minha.
//
//   node scripts/contar-linhas.mjs ~/repos/orion ~/repos/inova-blocos .

import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const IGNORAR = [
  'node_modules', 'vendor/', '/dist/', '/build/', '.min.', '.map',
  'lock', 'admin/', 'bootstrap_docs/', 'bootstrap', 'jquery', 'popper',
];

const LINGUAGENS = {
  php: 'PHP', kt: 'Kotlin', kts: 'Kotlin', java: 'Java', vue: 'Vue',
  ts: 'TypeScript', tsx: 'TypeScript', js: 'JavaScript', jsx: 'JavaScript',
  mjs: 'JavaScript', css: 'CSS', scss: 'CSS', html: 'HTML',
};

const repos = process.argv.slice(2);
if (repos.length === 0) {
  console.error('Uso: node scripts/contar-linhas.mjs <repo> [repo...]');
  process.exit(1);
}

const total = {};

for (const repo of repos) {
  let arquivos;
  try {
    arquivos = execFileSync('git', ['-C', repo, 'ls-files'], { encoding: 'utf8' }).split('\n');
  } catch {
    console.error(`ignorado (não é repositório git): ${repo}`);
    continue;
  }

  for (const relativo of arquivos) {
    if (!relativo || IGNORAR.some((p) => relativo.includes(p))) continue;

    const linguagem = LINGUAGENS[relativo.split('.').pop()?.toLowerCase() ?? ''];
    if (!linguagem) continue;

    const caminho = join(repo, relativo);
    try {
      if (!statSync(caminho).isFile()) continue;
      const linhas = readFileSync(caminho, 'utf8').split('\n').length;
      total[linguagem] = (total[linguagem] ?? 0) + linhas;
    } catch {
      // arquivo ilegível ou binário: segue o baile
    }
  }
}

const soma = Object.values(total).reduce((a, b) => a + b, 0);

console.log(`\nTotal autoral: ${soma.toLocaleString('pt-BR')} linhas\n`);
for (const [linguagem, linhas] of Object.entries(total).sort((a, b) => b[1] - a[1])) {
  const pct = ((linhas / soma) * 100).toFixed(1);
  console.log(`  ${linguagem.padEnd(12)} ${String(linhas).padStart(7)}  ${pct.padStart(5)}%`);
}
console.log('\nAtualize linhas/percentual em data/tecnologias.ts com esses valores.\n');
