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
    
    // Animações de entrada para cards de projeto
    function animateOnScroll() {
        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 150;
            
            if (cardTop < window.innerHeight - cardVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar animações
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Event listener para animações
    window.addEventListener('scroll', animateOnScroll);
    
    // Executar animações iniciais
    animateOnScroll();
    
    // Efeito parallax sutil para o fundo
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Interação com botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efeito hover para cards de projeto
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
    
    // Animação de digitação para o título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efeito de digitação ao carregar
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 500);
    }
    
    // Menu mobile (se necessário)
    function initMobileMenu() {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1001;
            background: var(--card);
            border: 1px solid var(--border);
            color: var(--primary);
            padding: 0.5rem;
            border-radius: 8px;
            display: none;
            cursor: pointer;
        `;
        
        document.body.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
        });
        
        // Mostrar botão em telas pequenas
        function checkMobile() {
            if (window.innerWidth <= 480) {
                mobileMenuBtn.style.display = 'block';
            } else {
                mobileMenuBtn.style.display = 'none';
                document.querySelector('.sidebar').classList.remove('open');
            }
        }
        
        window.addEventListener('resize', checkMobile);
        checkMobile();
    }
    
    // Inicializar menu mobile
    initMobileMenu();
    
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
    
    // Console log personalizado
    console.log('%c🚀 Portfólio Jason Figueiredo', 'color: #4facfe; font-size: 20px; font-weight: bold;');
    console.log('%cDesenvolvido com ❤️ e muito café ☕', 'color: #a3a3a3; font-size: 14px;');
    
});