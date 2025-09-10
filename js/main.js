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
});

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
    const botaoTema = document.querySelector('.botao-tema');
    const iconeTema = document.querySelector('.icone-tema');
    const textoTema = document.querySelector('.texto-tema');
    
    if (botaoTema && iconeTema && textoTema) {
        if (temaAtual === 'escuro') {
            iconeTema.textContent = '☀️';
            textoTema.textContent = 'Claro';
            botaoTema.title = 'Alternar para tema claro';
        } else {
            iconeTema.textContent = '🌙';
            textoTema.textContent = 'Escuro';
            botaoTema.title = 'Alternar para tema escuro';
        }
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
