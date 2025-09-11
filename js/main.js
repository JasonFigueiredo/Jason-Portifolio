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
    
`;
document.head.appendChild(style);
