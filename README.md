# Portfólio — Jason Figueiredo

Portfólio pessoal em **Next.js 16 + React + TypeScript**, publicado na Vercel.


## Como o conteúdo é mantido

Não se edita marcação para adicionar conteúdo. Tudo vive em dois arquivos:

| Arquivo | O que guarda |
|---|---|
| `data/projetos.ts` | Cada projeto: resumo, descrição, destaques, tecnologias, situação |
| `data/tecnologias.ts` | Cada tecnologia: ícone, categoria, linhas de código, projetos |

Acrescentar um projeto ou uma tecnologia é acrescentar **um objeto** ao array.
A página se remonta sozinha, na ordem do array.

### Atualizar as estatísticas de código

```bash
node scripts/contar-linhas.mjs /caminho/repo-1 /caminho/repo-2 .
```

O script descarta dependências, saídas de build e bibliotecas de terceiros
commitadas. Copie os números para `linhas` e `percentual` em `data/tecnologias.ts`.

## Estrutura

```
app/
  layout.tsx        fontes, metadados e o script que aplica o tema
  page.tsx          monta as seções
  globals.css       tokens de tema e base
components/         um componente por peça, cada um com seu CSS Module
data/               projetos e tecnologias
scripts/            contagem de linhas
```

## Deploy

Importar o repositório na Vercel. O Next.js é detectado sozinho — nenhuma
configuração necessária.
