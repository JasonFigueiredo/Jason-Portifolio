const fs = require('fs');
const { execSync } = require('child_process');

// Mapeamento de linguagens para ícones
const languageIcons = {
    javascript: { icon: 'js', name: 'JavaScript' },
    typescript: { icon: 'ts', name: 'TypeScript' },
    java: { icon: 'java', name: 'Java' },
    kotlin: { icon: 'kotlin', name: 'Kotlin' },
    python: { icon: 'py', name: 'Python' },
    css: { icon: 'css', name: 'CSS' },
    html: { icon: 'html', name: 'HTML' },
    php: { icon: 'php', name: 'PHP' },
    csharp: { icon: 'cs', name: 'C#' },
    cpp: { icon: 'cpp', name: 'C++' },
    c: { icon: 'c', name: 'C' },
    go: { icon: 'go', name: 'Go' },
    rust: { icon: 'rust', name: 'Rust' },
    swift: { icon: 'swift', name: 'Swift' },
    dart: { icon: 'dart', name: 'Dart' },
    ruby: { icon: 'ruby', name: 'Ruby' }
};

function createCardHTML(lang, langData, index) {
    const iconInfo = languageIcons[lang];
    if (!iconInfo) return '';
    
    const formattedLines = langData.lines.toLocaleString('pt-BR').replace(/,/g, '.');
    
    return `       <!-- ${index + 1}. ${lang.toUpperCase()} - ${formattedLines} linhas (${langData.percentage}%) -->
       <div class="card">
        <div class="tools">
         <div class="circle"><span class="red box"></span></div>
         <div class="circle"><span class="yellow box"></span></div>
         <div class="circle"><span class="green box"></span></div>
        </div>
        <div class="card__content">
         <div class="tech-item">
          <img src="https://skillicons.dev/icons?i=${iconInfo.icon}" alt="${iconInfo.name}" class="tech-icon" />
          <span class="project-count" data-repo-count="${lang}">${langData.repos} projeto${langData.repos > 1 ? 's' : ''}</span>
          <span class="tech-main-name">${iconInfo.name}</span>
          <div class="tech-info-card" data-lang="${lang}">
           <div class="tech-info-title">
            <div class="tech-icon-chart">
             <img src="https://img.icons8.com/?size=100&id=11260&format=png&color=0D8500" alt="Chart" />
            </div>
            <span class="tech-name">${iconInfo.name}</span>
            <span class="tech-level">${langData.percentage}%</span>
           </div>
           <div class="tech-lines">${formattedLines} linhas</div>
           <div class="tech-progress">
            <div class="tech-progress-fill" style="width: ${langData.percentage}%;"></div>
           </div>
          </div>
         </div>
        </div>
       </div>`;
}

async function autoUpdatePortfolio() {
    console.log('🤖 Iniciando atualização automática do portfólio...');
    
    try {
        // 1. Analisar repositórios
        console.log('📊 Analisando repositórios...');
        execSync('node scripts/count-lines.js', { stdio: 'inherit' });
        
        // 2. Ler dados atualizados
        const statsData = JSON.parse(fs.readFileSync('./data/code-stats.json', 'utf8'));
        
        // 3. Ordenar linguagens por linhas de código
        const sortedLanguages = Object.keys(statsData.languages)
            .map(lang => ({
                key: lang,
                ...statsData.languages[lang]
            }))
            .sort((a, b) => b.lines - a.lines)
            .filter(lang => lang.lines > 0);
        
        console.log('📈 Nova ordem:');
        sortedLanguages.forEach((lang, index) => {
            console.log(`  ${index + 1}. ${lang.key.toUpperCase()}: ${lang.lines.toLocaleString()} linhas (${lang.percentage}%)`);
        });
        
        // 4. Ler HTML atual
        let htmlContent = fs.readFileSync('./index.html', 'utf8');
        
        // 5. Encontrar e substituir seção tech-stack
        const techStackRegex = /<div class="tech-stack">[\s\S]*?<\/div>(?=\s*<a href)/;
        
        let newTechStackContent = '      <div class="tech-stack">\n';
        
        sortedLanguages.forEach((langData, index) => {
            newTechStackContent += createCardHTML(langData.key, langData, index) + '\n';
        });
        
        newTechStackContent += '      </div>';
        
        // 6. Substituir no HTML
        const updatedHtml = htmlContent.replace(techStackRegex, newTechStackContent);
        
        // 7. Salvar arquivo
        fs.writeFileSync('./index.html', updatedHtml);
        
        console.log('🎉 Portfólio atualizado automaticamente!');
        console.log(`📊 ${sortedLanguages.length} linguagens reorganizadas`);
        console.log(`🏆 Líder: ${sortedLanguages[0].key.toUpperCase()} com ${sortedLanguages[0].lines.toLocaleString()} linhas`);
        
    } catch (error) {
        console.log('❌ Erro:', error.message);
    }
}

// Executar
autoUpdatePortfolio();