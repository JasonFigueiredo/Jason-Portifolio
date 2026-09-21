/** @type {import('next').NextConfig} */
const nextConfig = {
  // Em desenvolvimento, o Next bloqueia os recursos internos (HMR, fontes)
  // quando o pedido vem de um host que não seja localhost. O padrão é bom
  // para quem desenvolve na própria máquina e ruim aqui: este projeto roda
  // num servidor, e quem abre o site sempre chega de outro computador, pelo
  // endereço da rede local ou da tailnet. Sem liberar, o WebSocket do HMR é
  // recusado e a página carrega sem hidratar — nada na tela responde.
  //
  // Os endereços não entram neste arquivo: o repositório é público. Eles vêm
  // de DEV_ORIGINS (em .env.local, que o git ignora), separados por vírgula.
  // Em produção a lista fica vazia, e é exatamente o que se quer.
  allowedDevOrigins: (process.env.DEV_ORIGINS ?? '')
    .split(',')
    .map((origem) => origem.trim())
    .filter(Boolean),
};

export default nextConfig;
