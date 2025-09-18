// Navegação suave e interatividade do portfólio
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Navegação suave
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Atualizar navegação ativa baseada na seção visível
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.parentElement.classList.add('active');
            }
        });
    }
    
    // Event listeners para navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Scroll listener para atualizar navegação ativa
    window.addEventListener('scroll', updateActiveNav);
    
    // Sistema de Toggle de Tema
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Verificar tema salvo ou usar padrão
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        // Event listener para toggle
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
        }
    }
    
    // Inicializar toggle de tema
    initThemeToggle();
    
    // Sistema de Estatísticas de Código (SIMPLIFICADO)
    let statsLoaded = false;
    
    async function loadCodeStats() {
        if (statsLoaded) return;
        statsLoaded = true;
        
        console.log('🚀 Carregando estatísticas...');
        
        try {
            // Tentar carregar JSON preciso
            const response = await fetch('./data/code-stats.json');
            if (response.ok) {
                const data = await response.json();
                updateCards(data.languages);
                console.log('✅ Dados precisos carregados!');
            } else {
                console.log('⚠️ Usando dados padrão');
            }
        } catch (error) {
            console.log('⚠️ Erro:', error.message);
        }
    }
    
    // Função para formatar números
    function formatNumber(number) {
        return number.toLocaleString('pt-BR').replace(/,/g, '.');
    }
    
    // Atualizar cards com dados
    function updateCards(languages) {
        Object.keys(languages).forEach(lang => {
            const langData = languages[lang];
            
            // Atualizar contador de projetos
            const countElement = document.querySelector(`[data-repo-count="${lang}"]`);
            if (countElement && langData.repos > 0) {
                countElement.textContent = `${langData.repos} projeto${langData.repos > 1 ? 's' : ''}`;
            }
            
            // Atualizar card interno
            const cardElement = document.querySelector(`[data-lang="${lang}"]`);
            if (cardElement) {
                const linesElement = cardElement.querySelector('.tech-lines');
                const percentElement = cardElement.querySelector('.tech-level');
                const progressElement = cardElement.querySelector('.tech-progress-fill');
                
                if (linesElement) linesElement.textContent = `${formatNumber(langData.lines)} linhas`;
                if (percentElement) percentElement.textContent = `${langData.percentage}%`;
                if (progressElement) progressElement.style.width = `${langData.percentage}%`;
            }
        });
    }
    
    // Carregar estatísticas (apenas uma vez)
    loadCodeStats();
    
    // Botão flutuante de tema para mobile
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function() {
            // Adicionar animação de rotação
            this.classList.add('rotating');
            
            // Alternar tema
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Atualizar ícones
            const mobileIcon = this.querySelector('i');
            const sidebarIcon = themeToggle ? themeToggle.querySelector('i') : null;
            
            if (newTheme === 'light') {
                mobileIcon.className = 'fas fa-sun';
                if (sidebarIcon) sidebarIcon.className = 'fas fa-sun';
            } else {
                mobileIcon.className = 'fas fa-moon';
                if (sidebarIcon) sidebarIcon.className = 'fas fa-moon';
            }
            
            // Remover animação após completar
            setTimeout(() => {
                this.classList.remove('rotating');
            }, 600);
        });
    }
    
    // Console log personalizado
    console.log('%c🚀 Portfólio Jason Figueiredo', 'color: #4facfe; font-size: 20px; font-weight: bold;');
    console.log('%cDesenvolvido com ❤️ e muito café ☕', 'color: #a3a3a3; font-size: 14px;');
});