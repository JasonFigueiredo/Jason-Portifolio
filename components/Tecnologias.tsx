import { tecnologias, categorias, totalLinhas, type Tecnologia } from '@/data/tecnologias';
import { textos, preencher } from '@/data/textos';
import { formatar, type Idioma } from '@/data/idioma';
import Secao from './Secao';
import Carrossel, { type ItemTecnologia } from './Carrossel';

// As ferramentas num carrossel infinito, em duas fileiras que correm em
// sentidos opostos. Aqui só se preparam os dados, já no idioma da página: o
// carrossel é componente de cliente e recebe texto pronto, nada de dados crus.
//
// O detalhe de cada uma explica a ferramenta — para que serve e por que está
// nos meus sistemas —, com quantos projetos e desde quando. Sem barra de
// percentual: quem passa rápido a lê como nota de habilidade.

/** "3", "1 + este site" ou só "este site". */
function emQuantos(tec: Tecnologia, idioma: Idioma): string {
  const n = tec.projetos.length;
  if (!tec.tambem) return String(n);
  return n > 0 ? `${n} + ${tec.tambem[idioma]}` : tec.tambem[idioma];
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
    projetos: emQuantos(tec, idioma),
    funcao: tec.funcao[idioma],
    beneficio: tec.beneficio[idioma],
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
          paraQueServe: tx.paraQueServe[idioma],
          porQueUso: tx.porQueUso[idioma],
          dica: tx.dica[idioma],
          verTodas: tx.verTodas[idioma],
          emMovimento: tx.emMovimento[idioma],
        }}
      />
    </Secao>
  );
}
