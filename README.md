# Portfólio — Jason Figueiredo

Site pessoal onde reúno os projetos que construí, as tecnologias que uso no dia a dia
e o volume real de código que já escrevi em cada uma delas.

## A ideia

Currículo em PDF não mostra trabalho — mostra uma lista. Queria um lugar único para
apontar quando alguém pergunta o que eu faço: cada projeto com o problema que resolve,
as decisões técnicas por trás dele e as telas do que foi entregue.

Por isso o site é a vitrine e, ao mesmo tempo, um projeto em si: foi reescrito de
HTML/CSS/JS puro para Next.js justamente para ser exemplo do que ele descreve.

## Tecnologias

| | |
|---|---|
| **Next.js 16** | App Router, Server Components e `next/font` |
| **React 19** | componentes de interface |
| **TypeScript** | tipos para os dados de projetos e tecnologias |
| **CSS Modules** | estilo isolado por componente, sem framework de CSS |
| **Vercel** | deploy contínuo a partir do repositório |

Sem bibliotecas de UI, sem framework de CSS e sem ícones por CDN: os SVGs são inline
e o layout é grid e flexbox. As três dependências do projeto são Next, React e ReactDOM.

## Decisões que valem citar

- **Conteúdo separado da marcação.** Projetos e tecnologias vivem em arquivos de dados
  tipados; os componentes só desenham. Adicionar um projeto é adicionar um objeto —
  a página se remonta sozinha.
- **Tema claro e escuro** guiados por um único atributo no `<html>`, aplicado antes da
  primeira pintura para não haver flash de tema errado.
- **Modal com `<dialog>` nativo**, que já entrega Esc, foco preso e página inerte sem
  reimplementar acessibilidade.
- **Números honestos.** As estatísticas de linhas de código são contadas por script que
  descarta dependências e bibliotecas de terceiros commitadas.
