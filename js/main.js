// JavaScript do Portfólio - Jason Figueiredo

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfólio carregado com sucesso!');
    
    // Inicializa as funcionalidades
    inicializarScrollSuave();
    inicializarMenuMobile();
    inicializarAnimacoes();
    carregarTemaSalvo();
    atualizarInterfaceTema();
    
    // Simula tempo de carregamento e oculta a tela
    setTimeout(ocultarTelaCarregamento, 3500);
    
    // Carrega estatísticas do GitHub
    carregarEstatisticasGitHub();
    
    // Inicializa sistema de like
    inicializarSistemaLike();
});

// Função para ocultar a tela de carregamento
function ocultarTelaCarregamento() {
    const telaCarregamento = document.getElementById('tela-carregamento');
    
    if (telaCarregamento) {
        telaCarregamento.classList.add('ocultar');
        
        // Remove a tela do DOM após a animação
        setTimeout(() => {
            telaCarregamento.remove();
        }, 500);
    }
}

// Scroll suave para links de navegação
function inicializarScrollSuave() {
    const linksNavegacao = document.querySelectorAll('a[href^="#"]');
    
    linksNavegacao.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const idDestino = this.getAttribute('href');
            const secaoDestino = document.querySelector(idDestino);
            
            if (secaoDestino) {
                secaoDestino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Menu mobile responsivo
function inicializarMenuMobile() {
    const botaoMenuMobile = document.querySelector('.botao-menu-mobile');
    const linksNavegacao = document.querySelector('.links-navegacao');
    
    if (botaoMenuMobile && linksNavegacao) {
        botaoMenuMobile.addEventListener('click', function() {
            linksNavegacao.classList.toggle('ativo');
        });
    }
}

// Animações de entrada
function inicializarAnimacoes() {
    const opcoesObservador = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observador = new IntersectionObserver(function(entradas) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('animar-entrada');
            }
        });
    }, opcoesObservador);
    
    // Observa elementos para animação
    const elementosAnimacao = document.querySelectorAll('.cartao, .apresentacao, section');
    elementosAnimacao.forEach(elemento => {
        observador.observe(elemento);
    });
}

// Função para mostrar/ocultar seções
function alternarSecao(idSecao) {
    const secao = document.getElementById(idSecao);
    if (secao) {
        secao.style.display = secao.style.display === 'none' ? 'block' : 'none';
    }
}

// Função para filtrar projetos
function filtrarProjetos(categoria) {
    const projetos = document.querySelectorAll('.cartao-projeto');
    
    projetos.forEach(projeto => {
        if (categoria === 'todos' || projeto.dataset.categoria === categoria) {
            projeto.style.display = 'block';
        } else {
            projeto.style.display = 'none';
        }
    });
}

// Função para enviar formulário de contato
function enviarFormularioContato(evento) {
    evento.preventDefault();
    
    const dadosFormulario = new FormData(evento.target);
    const nome = dadosFormulario.get('nome');
    const email = dadosFormulario.get('email');
    const mensagem = dadosFormulario.get('mensagem');
    
    // Aqui você pode adicionar lógica para enviar o formulário
    console.log('Dados do formulário:', { nome, email, mensagem });
    
    // Exemplo de feedback para o usuário
    alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
    
    // Limpa o formulário
    evento.target.reset();
}

// Sistema de Gerenciamento de Tema
let temaAtual = 'claro';

// Função para alternar tema (claro/escuro)
function alternarTema() {
    temaAtual = temaAtual === 'claro' ? 'escuro' : 'claro';
    
    // Aplica o tema ao documento
    document.documentElement.setAttribute('data-tema', temaAtual);
    
    // Salva a preferência no localStorage
    localStorage.setItem('temaPreferido', temaAtual);
    
    // Atualiza a interface do botão
    atualizarInterfaceTema();
    
    // Adiciona animação suave
    document.body.style.transition = 'all 0.3s ease';
    
    console.log(`Tema alterado para: ${temaAtual}`);
}

// Carrega tema salvo do localStorage
function carregarTemaSalvo() {
    const temaSalvo = localStorage.getItem('temaPreferido');
    
    if (temaSalvo) {
        temaAtual = temaSalvo;
    } else {
        // Detecta preferência do sistema se não houver tema salvo
        const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        temaAtual = prefereEscuro ? 'escuro' : 'claro';
    }
    
    // Aplica o tema
    document.documentElement.setAttribute('data-tema', temaAtual);
}

// Atualiza a interface do botão de tema
function atualizarInterfaceTema() {
    const checkboxTema = document.getElementById('checkbox-tema');
    
    if (checkboxTema) {
        // Sincroniza o estado do checkbox com o tema atual
        checkboxTema.checked = temaAtual === 'escuro';
    }
}

// Detecta mudanças na preferência do sistema
function detectarMudancaSistema() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', function(e) {
        // Só aplica se não houver preferência salva
        if (!localStorage.getItem('temaPreferido')) {
            temaAtual = e.matches ? 'escuro' : 'claro';
            document.documentElement.setAttribute('data-tema', temaAtual);
            atualizarInterfaceTema();
        }
    });
}

// Inicializa detecção de mudanças do sistema
detectarMudancaSistema();

// Carregar estatísticas do GitHub
async function carregarEstatisticasGitHub() {
    try {
        // Buscar dados das linguagens mais usadas
        const response = await fetch('https://api.github.com/users/JasonFigueiredo/repos?per_page=100');
        const repos = await response.json();
        
        if (!response.ok) {
            throw new Error('Erro ao carregar repositórios');
        }
        
        // Calcular estatísticas das linguagens
        const linguagens = calcularEstatisticasLinguagens(repos);
        
        // Renderizar as estatísticas
        renderizarEstatisticas(linguagens);
        
    } catch (error) {
        console.error('Erro ao carregar estatísticas do GitHub:', error);
        mostrarErroCarregamento();
    }
}

// Calcular estatísticas das linguagens
function calcularEstatisticasLinguagens(repos) {
    const linguagens = {};
    
    // Mapear cores das linguagens (baseado no perfil real)
    const coresLinguagens = {
        'JavaScript': '#f7df1e',
        'CSS': '#1572b6',
        'HTML': '#e34f26',
        'PHP': '#777bb4',
        'Kotlin': '#7f52ff',
        'Java': '#ed8b00',
        'MySQL': '#4479a1'
    };
    
    // CORREÇÃO: Inicializar TODAS as linguagens fixas (mesmo com 0 repositórios)
    const linguagensFixas = ['JavaScript', 'HTML', 'CSS', 'PHP', 'Kotlin', 'Java', 'MySQL'];
    
    linguagensFixas.forEach(lang => {
        linguagens[lang] = {
            repos: 0,           // Começa com 0
            stars: 0,           // Começa com 0
            color: coresLinguagens[lang] || '#6c757d'
        };
    });
    
    // Processar repositórios do GitHub (atualiza os números reais)
    repos.forEach(repo => {
        if (repo.language && linguagens[repo.language]) {
            linguagens[repo.language].repos++;
            linguagens[repo.language].stars += repo.stargazers_count || 0;
        }
    });
    
    // Calcular total de repositórios
    const totalRepos = Object.values(linguagens).reduce((sum, lang) => sum + lang.repos, 0);
    
    // Converter para array e calcular porcentagens
    const linguagensArray = Object.entries(linguagens).map(([nome, dados]) => ({
        nome,
        repos: dados.repos,
        stars: dados.stars,
        porcentagem: totalRepos > 0 ? ((dados.repos / totalRepos) * 100).toFixed(1) : '0.0',
        cor: dados.color
    }));
    
    // CORREÇÃO: Retornar TODAS as linguagens (sem slice)
    return linguagensArray.sort((a, b) => b.repos - a.repos);
}

// Renderizar estatísticas no card
function renderizarEstatisticas(linguagens) {
    const container = document.getElementById('github-stats');
    
    if (linguagens.length === 0) {
        container.innerHTML = `
            <div class="loading-stats">
                <p>Nenhuma linguagem encontrada</p>
            </div>
        `;
        return;
    }
    
    // Criar HTML das estatísticas com efeito hover
    const statsHTML = linguagens.map(lang => `
        <div class="stat-item" data-lang="${lang.nome.toLowerCase()}">
            <div class="front-content">
                <div class="stat-icon ${lang.nome.toLowerCase()}">${obterIconeLinguagem(lang.nome)}</div>
                <p class="stat-label">${lang.nome}</p>
                <p class="stat-value">${lang.porcentagem}%</p>
                <span class="stat-change">${lang.repos} repo${lang.repos > 1 ? 's' : ''}</span>
            </div>
            <div class="content">
                <p class="heading">${lang.nome}</p>
                <p class="repos-list">${obterRepositoriosPorLinguagem(lang.nome)}</p>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = statsHTML;
}

// Função para obter ícones das linguagens usando skillicons.dev
function obterIconeLinguagem(linguagem) {
    const icones = {
        'JavaScript': `<img src="https://skillicons.dev/icons?i=js" alt="JavaScript" width="24" height="24" />`,
        'HTML': `<img src="https://skillicons.dev/icons?i=html" alt="HTML" width="24" height="24" />`,
        'CSS': `<img src="https://skillicons.dev/icons?i=css" alt="CSS" width="24" height="24" />`,
        'PHP': `<img src="https://skillicons.dev/icons?i=php" alt="PHP" width="24" height="24" />`,
        'Kotlin': `<img src="https://skillicons.dev/icons?i=kotlin" alt="Kotlin" width="24" height="24" />`,
        'Java': `<img src="https://skillicons.dev/icons?i=java" alt="Java" width="24" height="24" />`,
        'MySQL': `<img src="https://skillicons.dev/icons?i=mysql" alt="MySQL" width="24" height="24" />`
    };
    
    return icones[linguagem] || `<div class="stat-color" style="background-color: #6c757d; width: 24px; height: 24px; border-radius: 50%;"></div>`;
}

// Função para obter repositórios por linguagem
function obterRepositoriosPorLinguagem(linguagem) {
    const repositorios = {
        'JavaScript': 'Easy-Bank, Projeto-API, ControleFinanceiro',
        'HTML': 'Jason-Portifolio, Portfolio Pessoal',
        'CSS': 'Portfolio, Estilos e Layouts',
        'PHP': 'Desenvolvimento WEB, Sistemas Backend',
        'Kotlin': 'Apps Android, Desenvolvimento Mobile',
        'Java': 'Sistemas Enterprise, Aplicações Backend',
        'MySQL': 'Bancos de Dados, Sistemas de Gestão'
    };
    
    return repositorios[linguagem] || 'Projetos em desenvolvimento';
}

// Mostrar erro de carregamento
function mostrarErroCarregamento() {
    const container = document.getElementById('github-stats');
    container.innerHTML = `
        <div class="loading-stats">
            <p>Erro ao carregar estatísticas do GitHub</p>
            <button onclick="carregarEstatisticasGitHub()" class="analytics-button" style="margin-top: 1rem;">
                Tentar Novamente
            </button>
        </div>
    `;
}

// Sistema de Like com controle por IP
let likeCount = 0;
let userLiked = false;
let userIP = '';

// Inicializar sistema de like online
function inicializarSistemaLike() {
    // Detectar IP do usuário (simulado)
    userIP = gerarIPSimulado();
    
    // Carregar contador online
    carregarLikesOnline();
    
    // Verificar se usuário já deu like (usando localStorage local)
    const likedIPs = JSON.parse(localStorage.getItem('portfolioLikedIPs') || '[]');
    userLiked = likedIPs.includes(userIP);
    
    // Atualizar interface
    atualizarInterfaceLike();
    
    // Atualizar contador automaticamente a cada 30 segundos
    setInterval(() => {
        carregarLikesOnline();
    }, 30000); // 30 segundos
}

// Carregar likes do servidor online
async function carregarLikesOnline() {
    try {
        // Usar CountAPI - API gratuita para contadores
        const response = await fetch('https://api.countapi.xyz/get/jason-portfolio/likes');
        
        if (response.ok) {
            const data = await response.json();
            likeCount = data.value || 0;
            console.log('Likes carregados online:', likeCount);
        } else {
            // Fallback para localStorage se API falhar
            const savedCount = localStorage.getItem('portfolioLikeCount');
            likeCount = savedCount ? parseInt(savedCount) : 0;
            console.log('Usando contador local como fallback');
        }
    } catch (error) {
        console.log('Usando contador local como fallback');
        // Fallback para localStorage se API não estiver disponível
        const savedCount = localStorage.getItem('portfolioLikeCount');
        likeCount = savedCount ? parseInt(savedCount) : 0;
    }
    
    atualizarInterfaceLike();
}

// Salvar likes no servidor online
async function salvarLikesOnline() {
    try {
        // Usar CountAPI para incrementar contador
        const response = await fetch('https://api.countapi.xyz/hit/jason-portfolio/likes');
        
        if (response.ok) {
            const data = await response.json();
            likeCount = data.value;
            console.log('Like salvo online! Total:', likeCount);
        } else {
            // Fallback para localStorage
            localStorage.setItem('portfolioLikeCount', likeCount.toString());
            console.log('Salvando localmente como fallback');
        }
    } catch (error) {
        console.log('Salvando localmente como fallback');
        // Fallback para localStorage
        localStorage.setItem('portfolioLikeCount', likeCount.toString());
    }
}

// Gerar IP simulado (em produção, usar serviço real)
function gerarIPSimulado() {
    const savedIP = localStorage.getItem('userIP');
    if (savedIP) {
        return savedIP;
    }
    
    // Gerar IP aleatório simulado
    const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    localStorage.setItem('userIP', ip);
    return ip;
}

// Toggle do like - Sistema Online
async function toggleLike() {
    if (userLiked) {
        // Usuário já deu like, não pode desfazer
        mostrarMensagemLike('Você já deu like! ❤️');
        return;
    }
    
    // Adicionar like
    likeCount++;
    userLiked = true;
    
    // Salvar localmente (para controle de IP)
    const likedIPs = JSON.parse(localStorage.getItem('portfolioLikedIPs') || '[]');
    likedIPs.push(userIP);
    localStorage.setItem('portfolioLikedIPs', JSON.stringify(likedIPs));
    
    // Salvar online
    await salvarLikesOnline();
    
    // Atualizar interface
    atualizarInterfaceLike();
    
    // Mostrar confirmação
    mostrarMensagemLike('Obrigado pelo like! 🎉');
    
    // Animação de confete
    criarAnimacaoConfete();
}

// // Toggle do like - VERSÃO MÚLTIPLOS LIKES
// function toggleLike() {
//     // Sempre adicionar like (sem verificação de IP)
//     likeCount++;
    
//     // Salvar no localStorage
//     localStorage.setItem('portfolioLikeCount', likeCount.toString());
    
//     // Atualizar interface
//     atualizarInterfaceLike();
    
//     // Mostrar confirmação
//     mostrarMensagemLike('Obrigado pelo like! 🎉');
    
//     // Animação de confete
//     criarAnimacaoConfete();
// }

// Atualizar interface do like
function atualizarInterfaceLike() {
    const likeBtn = document.getElementById('likeBtn');
    const likeCountEl = document.getElementById('likeCount');
    
    if (likeBtn && likeCountEl) {
        likeCountEl.textContent = likeCount.toLocaleString('pt-BR');
        
        if (userLiked) {
            likeBtn.classList.add('liked');
        } else {
            likeBtn.classList.remove('liked');
        }
    }
    
    // Adicionar indicador de sincronização online
    mostrarIndicadorOnline();
}

// Mostrar indicador de sincronização online
function mostrarIndicadorOnline() {
    let indicador = document.getElementById('online-indicator');
    
    if (!indicador) {
        indicador = document.createElement('div');
        indicador.id = 'online-indicator';
        indicador.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: #10b981;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(indicador);
    }
    
    indicador.innerHTML = `
        <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite;"></div>
        Online: ${likeCount} likes
    `;
    
    // Adicionar animação de pulso
    if (!document.getElementById('pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Mostrar mensagem de like
function mostrarMensagemLike(mensagem) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'like-notification';
    notification.textContent = mensagem;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Criar animação de confete personalizada
function criarAnimacaoConfete() {
    const colors = ['#f89b29', '#ff0f7b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899', '#84cc16'];
    const shapes = ['circle', 'square', 'triangle', 'star'];
    const sizes = [8, 10, 12, 14, 16];
    
    // Criar múltiplas ondas de confetes
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 80; i++) {
                const confete = document.createElement('div');
                const color = colors[Math.floor(Math.random() * colors.length)];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                const size = sizes[Math.floor(Math.random() * sizes.length)];
                
                // Posição inicial aleatória no topo da tela
                const startX = Math.random() * window.innerWidth;
                const startY = -50;
                
                // Direção e velocidade aleatórias
                const angle = (Math.random() * 120) - 60; // -60° a +60°
                const velocity = Math.random() * 15 + 10; // 10-25
                const rotation = Math.random() * 720; // 0-720 graus
                
                confete.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    top: ${startY}px;
                    left: ${startX}px;
                    z-index: 1000;
                    pointer-events: none;
                    border-radius: ${shape === 'circle' ? '50%' : shape === 'triangle' ? '0' : '2px'};
                    transform: rotate(${Math.random() * 360}deg);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    animation: confeteFall${wave} ${Math.random() * 2 + 2}s ease-out forwards;
                `;
                
                // Adicionar forma especial para estrelas
                if (shape === 'star') {
                    confete.innerHTML = '⭐';
                    confete.style.background = 'transparent';
                    confete.style.fontSize = `${size}px`;
                    confete.style.width = 'auto';
                    confete.style.height = 'auto';
                    confete.classList.add('confete-star');
                }
                
                // Adicionar forma especial para triângulos
                if (shape === 'triangle') {
                    confete.style.width = '0';
                    confete.style.height = '0';
                    confete.style.borderLeft = `${size/2}px solid transparent`;
                    confete.style.borderRight = `${size/2}px solid transparent`;
                    confete.style.borderBottom = `${size}px solid ${color}`;
                    confete.style.background = 'transparent';
                }
                
                document.body.appendChild(confete);
                
                // Remover após animação
                setTimeout(() => {
                    if (confete.parentNode) {
                        confete.parentNode.removeChild(confete);
                    }
                }, 4000);
            }
        }, wave * 200); // Delay entre ondas
    }
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes confeteFall0 {
        0% { 
            transform: translateY(0) rotate(0deg) scale(1); 
            opacity: 1; 
        }
        50% { 
            transform: translateY(50vh) rotate(180deg) scale(1.2); 
            opacity: 0.8; 
        }
        100% { 
            transform: translateY(100vh) rotate(360deg) scale(0.5); 
            opacity: 0; 
        }
    }
    
    @keyframes confeteFall1 {
        0% { 
            transform: translateY(0) rotate(0deg) scale(1); 
            opacity: 1; 
        }
        30% { 
            transform: translateY(30vh) rotate(120deg) scale(1.1); 
            opacity: 0.9; 
        }
        70% { 
            transform: translateY(70vh) rotate(240deg) scale(0.8); 
            opacity: 0.6; 
        }
        100% { 
            transform: translateY(100vh) rotate(360deg) scale(0.3); 
            opacity: 0; 
        }
    }
    
    @keyframes confeteFall2 {
        0% { 
            transform: translateY(0) rotate(0deg) scale(1); 
            opacity: 1; 
        }
        40% { 
            transform: translateY(40vh) rotate(200deg) scale(1.3); 
            opacity: 0.7; 
        }
        80% { 
            transform: translateY(80vh) rotate(320deg) scale(0.6); 
            opacity: 0.4; 
        }
        100% { 
            transform: translateY(100vh) rotate(400deg) scale(0.2); 
            opacity: 0; 
        }
    }
    
    /* Animação de pulso para estrelas */
    @keyframes starPulse {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
    }
    
    /* Aplicar pulso às estrelas */
    .confete-star {
        animation: starPulse 0.5s ease-in-out infinite;
    }
`;
document.head.appendChild(style);
