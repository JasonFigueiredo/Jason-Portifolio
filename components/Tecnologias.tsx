import { tecnologias, categorias, totalLinhas, type Tecnologia } from '@/data/tecnologias';
import { projetos } from '@/data/projetos';
import { textos, preencher } from '@/data/textos';
import { caminho, formatar, t, type Idioma } from '@/data/idioma';
import Secao from './Secao';
import Carrossel, { type ItemTecnologia } from './Carrossel';

// As ferramentas num carrossel infinito, em duas fileiras que correm em
// sentidos opostos. Aqui só se preparam os dados, já no idioma da página: o
// carrossel é componente de cliente e recebe texto pronto, nada de dados crus.
//
// Sem barra de percentual: quem passa rápido a lê como nota de habilidade.
// No lugar, as linhas contadas e, em cada projeto, o trabalho que a ferramenta
// faz ali — tirado da stack do próprio estudo de caso.

/** "Vue" casa com "Vue 3"; "Java" não casa com "JavaScript". */
function usaNaStack(ferramenta: string, nome: string) {
  return ferramenta.split(' · ').some((parte) => parte === nome || parte.startsWith(`${nome} `));
}

function preparar(tec: Tecnologia, idioma: Idioma): ItemTecnologia {
  const categoria = categorias.find((c) => c.id === tec.categoria);

  return {
    id: tec.id,
    nome: tec.nome,
    icone: `https://skillicons.dev/icons?i=${tec.icone}`,
    categoria: categoria ? categoria.rotulo[idioma] : '',
    linhas: tec.linhas !== undefined ? formatar(tec.linhas, idioma) : undefined,
    desde: tec.desde,
    usos: tec.projetos.flatMap((pid) => {
      const projeto = projetos.find((p) => p.id === pid);
      if (!projeto) return [];
      const camada = projeto.stack.find((c) => usaNaStack(t(c.ferramenta, 'pt'), tec.nome));
      return [
        {
          href: caminho(idioma, `/projetos/${pid}`),
          titulo: projeto.titulo,
          camada: camada ? t(camada.camada, idioma) : undefined,
          papel: camada ? camada.papel[idioma] : undefined,
        },
      ];
    }),
    tambem: tec.tambem?.[idioma],
  };
}

export default function Tecnologias({ idioma }: { idioma: Idioma }) {
  const tx = textos.tecnologias;
  const itens = tecnologias.map((tec) => preparar(tec, idioma));
  // Alternando, as duas fileiras ficam do mesmo tamanho e cada uma mistura
  // linguagens, frameworks e infraestrutura.
  const fileiras = [itens.filter((_, i) => i % 2 === 0), itens.filter((_, i) => i % 2 === 1)];

  return (
    <Secao
      id="tecnologias"
      numero="04"
      olho={textos.navegacao.tecnologias[idioma]}
      titulo={tx.titulo[idioma]}
      chamada={preencher(tx.chamada[idioma], { n: formatar(totalLinhas, idioma) })}
    >
      <Carrossel
        fileiras={fileiras}
        rotulos={{
          linhas: tx.linhasDeCodigo[idioma],
          desde: tx.desdeRotulo[idioma],
          projetos: tx.projetosRotulo[idioma],
          ondeFoiUsada: tx.ondeFoiUsada[idioma],
          tambem: tx.tambem[idioma],
          dica: tx.dica[idioma],
          verTodas: tx.verTodas[idioma],
          emMovimento: tx.emMovimento[idioma],
        }}
      />
    </Secao>
  );
}
