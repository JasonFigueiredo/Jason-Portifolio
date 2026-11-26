# JSON Technologies — portfólio de Jason Figueiredo

Site onde reúno os sistemas que construí, sob a marca **JSON Technologies**: cada produto
com o problema que resolve, as decisões técnicas por trás dele, as telas reais e o volume
de código que escrevi em cada tecnologia. Em português e em inglês.

## A ideia

Currículo em PDF não mostra trabalho — mostra uma lista. Queria um lugar único para
apontar quando alguém pergunta o que eu faço, com provas que dá para conferir no lugar de
adjetivos: quantos testes, quantas decisões registradas, o que roda em produção hoje.

Por isso o site é a vitrine e, ao mesmo tempo, um projeto em si: foi reescrito de
HTML/CSS/JS puro para Next.js e ganhou uma identidade própria, com animação e interação
feitas à mão, justamente para ser exemplo do que descreve.

## Tecnologias

| | |
| --- | --- |
| **Next.js 16** | App Router, exportado como site estático; um layout raiz por idioma |
| **React 19** | componentes de interface |
| **TypeScript** | tipos para os dados, com cada texto obrigado a ter as duas línguas |
| **CSS Modules** | estilo isolado por componente, sem framework de CSS |
| **Canvas 2D** | o cubo de rede 3D da abertura, sem biblioteca 3D |
| **Cloudflare Workers** | publicação dos arquivos estáticos a partir do repositório |

As dependências do projeto são Next, React e ReactDOM. Não há biblioteca de animação, de
interface ou de ícones: os SVGs da interface são inline, e só os logotipos das tecnologias
vêm do skillicons.dev.

## Decisões que valem citar

- **Conteúdo separado da marcação.** Projetos, serviços, tecnologias e textos vivem em
  arquivos de dados tipados; os componentes só desenham. Adicionar um projeto é adicionar
  um objeto — a página se remonta sozinha, nas duas línguas.
- **Bilíngue sem duplicar.** Cada texto mora nos dados como `{ pt, en }`, ao lado de
  números, imagens e endereços, que existem uma vez só. O TypeScript recusa texto sem
  tradução.
- **Movimento com propósito, e opcional.** Fundo vivo, cubo de rede, contadores,
  carrossel e entradas ao rolar respeitam quem pediu menos movimento no sistema, e o
  canvas para quando sai da tela.
- **Gravações reais, não imagens geradas.** As demonstrações em vídeo são gravações de
  tela dos próprios sistemas, com dados fictícios, feitas por script em navegador sem
  interface.
- **Tema claro e escuro** guiados por um único atributo no `<html>`, aplicado antes da
  primeira pintura para não haver flash de tema errado.
- **Uma página por projeto**, gerada estática no build: tem endereço para mandar a quem
  interessar, volta pelo histórico e o Google lê. Como os repositórios são privados, é ela
  que prova o trabalho — problema, decisões com a alternativa descartada, arquitetura e o
  que deu errado.
- **Números honestos.** As estatísticas de linhas de código são contadas por script que
  descarta dependências e bibliotecas de terceiros commitadas, e cada serviço anunciado
  aponta para o projeto que o comprova.
