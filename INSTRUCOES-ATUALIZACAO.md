# 📊 Instruções para Atualização Precisa das Estatísticas

## 🎯 **Como Obter Dados 99% Precisos**

### 1. **Instalar CLOC (Count Lines of Code)**
```bash
# Windows (via npm)
npm install -g cloc

# Ou baixar executável
# https://github.com/AlDanial/cloc/releases
```

### 2. **Executar CLOC em Cada Projeto**
```bash
# Navegar para cada repositório
cd /caminho/para/Easy-Bank
cloc . --json --out=easy-bank-stats.json

cd /caminho/para/Projeto-API  
cloc . --json --out=projeto-api-stats.json

# Repetir para todos os projetos
```

### 3. **Compilar Dados no JSON**
Editar o arquivo `data/code-stats.json` com os dados reais:

```json
{
  "lastUpdated": "2025-01-18",
  "totalLines": 45678,
  "languages": {
    "javascript": {
      "lines": 18567,        // ← NÚMERO REAL DO CLOC
      "files": 45,           // ← ARQUIVOS REAIS
      "repos": 4,
      "projects": ["Easy-Bank", "Projeto-API", "LetsSing_FrontEnd_FIAP"],
      "percentage": 40.6,    // ← CALCULADO AUTOMATICAMENTE
      "experience": "3 anos",
      "level": 85
    }
    // ... outras linguagens
  }
}
```

## 🔄 **Processo de Atualização**

### **Quando Criar Novo Projeto:**
1. ✅ Executar `cloc .` no projeto
2. ✅ Somar às estatísticas existentes
3. ✅ Atualizar `data/code-stats.json`
4. ✅ Fazer commit do JSON atualizado

### **Automação Futura (Opcional):**
```yaml
# .github/workflows/update-stats.yml
name: Update Code Stats
on: [push]
jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: |
          npm install -g cloc
          cloc . --json > temp-stats.json
          # Script para merge com stats existentes
          node scripts/merge-stats.js
```

## 📈 **Vantagens do Sistema Híbrido**

### **Dados Precisos (JSON):**
- ✅ **99% precisão** - contagem linha por linha
- ✅ **Controle total** sobre os dados
- ✅ **Atualização manual** quando necessário

### **Fallback Automático (GitHub API):**
- ✅ **Sempre funciona** mesmo sem JSON
- ✅ **Estimativa razoável** (~70% precisão)
- ✅ **Sem manutenção** necessária

## 🎯 **Para Máxima Precisão:**
1. **Execute CLOC** em todos os projetos
2. **Atualize o JSON** com dados reais
3. **Faça commit** do arquivo atualizado
4. **Portfólio** usará dados precisos automaticamente!

**Resultado:** Seus cards mostrarão exatamente **946.263 linhas** se for esse o número real! 🚀
