# 📟 Comandos Úteis

## 🔧 Desenvolvimento

### Iniciar servidor de desenvolvimento
```bash
npm start
# ou
ng serve
```
Acesse: http://localhost:4200/

### Build de produção
```bash
npm run build
```
Output: `dist/pokedex-app/browser/`

### Build com watch mode
```bash
ng build --watch
```

### Executar testes
```bash
npm test
```

### Executar linting
```bash
ng lint
```

---

## 🚀 Deploy

### Deploy via script automático
```bash
./deploy.sh
```

### Deploy via Vercel CLI
```bash
vercel                    # Deploy preview
vercel --prod             # Deploy produção
```

### Ver logs do Vercel
```bash
vercel logs
```

### Listar deployments
```bash
vercel ls
```

---

## 🧪 Testes Locais

### Servir build de produção localmente
```bash
# Instalar http-server (primeira vez)
npm install -g http-server

# Servir
npm run build
npx http-server dist/pokedex-app/browser -p 8080
```
Acesse: http://localhost:8080

### Testar em diferentes portas
```bash
ng serve --port 4201
```

---

## 📦 Gerenciamento de Dependências

### Instalar dependências
```bash
npm install
```

### Limpar cache do npm
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Verificar dependências desatualizadas
```bash
npm outdated
```

### Atualizar dependências
```bash
npm update
```

---

## 🔍 Análise de Projeto

### Analisar tamanho do bundle
```bash
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/pokedex-app/browser/stats.json
```

### Ver estrutura do projeto
```bash
tree -I 'node_modules|dist' -L 4
```

### Contar linhas de código
```bash
# TypeScript
find src -name "*.ts" | xargs wc -l

# HTML
find src -name "*.html" | xargs wc -l

# SCSS
find src -name "*.scss" | xargs wc -l

# Total
find src \( -name "*.ts" -o -name "*.html" -o -name "*.scss" \) | xargs wc -l
```

---

## 🧹 Limpeza

### Limpar builds
```bash
rm -rf dist
```

### Limpar cache do Angular
```bash
rm -rf .angular/cache
```

### Limpar tudo e reinstalar
```bash
rm -rf node_modules dist .angular package-lock.json
npm install
```

---

## 🐙 Git

### Inicializar repositório
```bash
git init
git add .
git commit -m "Initial commit"
```

### Adicionar remote
```bash
git remote add origin https://github.com/USER/REPO.git
```

### Push para GitHub
```bash
git push -u origin main
```

### Ver status
```bash
git status
```

### Ver diferenças
```bash
git diff
```

### Criar branch
```bash
git checkout -b feature/nova-funcionalidade
```

### Merge branch
```bash
git checkout main
git merge feature/nova-funcionalidade
```

---

## 🔧 Angular CLI

### Gerar componente
```bash
ng generate component features/meu-componente
# ou
ng g c features/meu-componente
```

### Gerar serviço
```bash
ng generate service core/services/meu-servico
# ou
ng g s core/services/meu-servico
```

### Gerar pipe
```bash
ng generate pipe shared/pipes/meu-pipe
# ou
ng g p shared/pipes/meu-pipe
```

### Gerar guard
```bash
ng generate guard core/guards/auth
# ou
ng g g core/guards/auth
```

### Atualizar Angular
```bash
ng update @angular/cli @angular/core
```

---

## 🌐 PokéAPI - Endpoints Úteis

### Listar Pokémon (paginado)
```bash
curl https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
```

### Obter Pokémon por ID
```bash
curl https://pokeapi.co/api/v2/pokemon/25
```

### Obter Pokémon por nome
```bash
curl https://pokeapi.co/api/v2/pokemon/pikachu
```

### Obter espécie (descrição em português)
```bash
curl https://pokeapi.co/api/v2/pokemon-species/25
```

### Listar tipos
```bash
curl https://pokeapi.co/api/v2/type
```

---

## 🐛 Debugging

### Abrir DevTools no navegador
```
Chrome/Edge: F12 ou Cmd+Option+I
Safari: Cmd+Option+I
```

### Ver console logs
```typescript
console.log('Debug:', variavel);
console.table(array);
console.error('Erro:', erro);
```

### Debugar no VS Code
1. Adicionar breakpoint (clique na margem esquerda)
2. F5 para iniciar debugging
3. Usar Watch, Call Stack, Variables

### Ver Network requests
1. Abrir DevTools (F12)
2. Aba Network
3. Filtrar por XHR para ver requisições à API

---

## 📊 Performance

### Lighthouse audit
1. Abrir DevTools (F12)
2. Aba Lighthouse
3. Generate report

### Verificar bundle size
```bash
npm run build
ls -lh dist/pokedex-app/browser/
```

---

## 🎨 Utilitários

### Ver versão do Node
```bash
node --version
```

### Ver versão do npm
```bash
npm --version
```

### Ver versão do Angular
```bash
ng version
```

### Ver variáveis de ambiente
```bash
env | grep NODE
```

---

## 📝 Logs e Monitoramento

### Ver logs em tempo real (Vercel)
```bash
vercel logs --follow
```

### Ver logs de build (Vercel)
```bash
vercel logs --output build
```

### Ver logs específicos de um deployment
```bash
vercel logs [deployment-url]
```

---

## 🔐 Segurança

### Auditar dependências
```bash
npm audit
```

### Corrigir vulnerabilidades
```bash
npm audit fix
```

### Atualizar dependências com vulnerabilidades
```bash
npm audit fix --force
```

---

## 💡 Dicas Rápidas

### Abrir projeto no VS Code
```bash
code .
```

### Abrir no navegador
```bash
# macOS
open http://localhost:4200

# Linux
xdg-open http://localhost:4200

# Windows
start http://localhost:4200
```

### Matar processo na porta 4200
```bash
# macOS/Linux
lsof -ti:4200 | xargs kill -9

# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

---

**Última atualização**: 14/12/2024  
**Versão**: 1.0
