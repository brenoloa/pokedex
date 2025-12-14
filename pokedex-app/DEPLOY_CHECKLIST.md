# ✅ Checklist de Deploy no Vercel

## 📋 Pré-requisitos Completos

### ✅ Arquivos de Configuração
- [x] `vercel.json` - Configurado para SPA routing
- [x] `.gitignore` - Configurado para ignorar node_modules e dist
- [x] `angular.json` - Build configurado para produção
- [x] `package.json` - Scripts de build configurados

### ✅ Estrutura do Projeto
- [x] Clean Architecture implementada
- [x] Componentes standalone Angular 21
- [x] Serviços e repositórios configurados
- [x] Rotas configuradas no `app.routes.ts`

## 🚀 Passos para Deploy

### Opção 1: Deploy via GitHub (Recomendado)

#### 1. Inicializar Git
```bash
cd /Users/brenoloa/IdeaProjects/pokedex/pokedex-app
git init
git add .
git commit -m "Initial commit: Complete Pokedex with Clean Architecture"
```

#### 2. Criar Repositório no GitHub
- Acesse: https://github.com/new
- Nome: `pokedex-angular`
- Deixe **sem** README, .gitignore ou LICENSE (já temos)
- Clique em "Create repository"

#### 3. Conectar ao GitHub
```bash
git remote add origin https://github.com/SEU_USUARIO/pokedex-angular.git
git branch -M main
git push -u origin main
```

#### 4. Deploy no Vercel
- Acesse: https://vercel.com/new
- Clique em "Import Project"
- Selecione o repositório `pokedex-angular`
- Configure:
  - **Framework Preset**: Angular
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist/pokedex-app/browser`
  - **Install Command**: `npm install`
- Clique em "Deploy"

### Opção 2: Deploy via Vercel CLI

#### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login no Vercel
```bash
vercel login
```

#### 3. Deploy
```bash
cd /Users/brenoloa/IdeaProjects/pokedex/pokedex-app
vercel
```

Siga as instruções:
- **Set up and deploy?** → Yes
- **Which scope?** → Selecione sua conta
- **Link to existing project?** → No
- **Project name?** → pokedex-angular
- **In which directory is your code located?** → ./
- **Override settings?** → Yes
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist/pokedex-app/browser`
  - **Development Command**: `npm start`

## 🔍 Verificação Pós-Deploy

### Testar Rotas
Após o deploy, teste as seguintes URLs:
- ✅ `https://seu-projeto.vercel.app/` - Home/Lista de Pokémon
- ✅ `https://seu-projeto.vercel.app/pokemon/25` - Detalhe do Pikachu
- ✅ `https://seu-projeto.vercel.app/pokemon/1` - Detalhe do Bulbasaur

**Importante**: Se qualquer rota der 404, o `vercel.json` não está funcionando.

### Testar Funcionalidades
- [ ] Lista de Pokémon carrega (após 3 segundos)
- [ ] Busca funciona corretamente
- [ ] Clique em um card abre os detalhes
- [ ] D-Pad rotaciona o sprite
- [ ] Animação dos sprites funciona
- [ ] Botão "Voltar" retorna à lista
- [ ] Paginação funciona (Anterior/Próximo)
- [ ] Responsivo em mobile

## 🐛 Solução de Problemas

### 404 em Rotas Diretas
**Problema**: Acessar `https://seu-projeto.vercel.app/pokemon/1` retorna 404

**Solução**: Verificar se `vercel.json` está na raiz do projeto:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Build Falha
**Problema**: Build falha no Vercel com erros TypeScript

**Solução**: Testar build localmente primeiro:
```bash
npm run build
```

Se houver erros, corrija-os antes de fazer deploy.

### Página em Branco
**Problema**: Deploy bem-sucedido mas página em branco

**Solução**: Verificar console do navegador (F12):
- Erros de CORS → PokéAPI permite CORS
- Erros de módulos → Verificar imports
- Erros de rota → Verificar `app.routes.ts`

### Imagens Não Carregam
**Problema**: Sprites dos Pokémon não aparecem

**Solução**: As imagens vêm da PokéAPI. Verificar:
- Conexão com internet
- URLs dos sprites no console
- Bloquadores de conteúdo (AdBlock)

## 📊 Configuração Vercel Detalhada

### Environment Variables (Opcional)
Não são necessárias para este projeto, pois a PokéAPI é pública.

### Build Settings
```
Framework Preset: Angular
Build Command: npm run build
Output Directory: dist/pokedex-app/browser
Install Command: npm install
Development Command: npm start
Node Version: 18.x
```

### Domains
Após deploy, você pode:
- Usar domínio Vercel: `seu-projeto.vercel.app`
- Adicionar domínio customizado nas configurações

## 🎉 Deploy Completo!

Após seguir todos os passos, seu Pokédex estará online em:
```
https://seu-projeto.vercel.app
```

### Próximos Passos
1. Compartilhe o link
2. Adicione ao portfólio
3. Configure domínio customizado (opcional)
4. Monitore analytics no dashboard Vercel

## 📝 Comandos Úteis

```bash
# Testar build localmente
npm run build

# Servir build de produção localmente
npx http-server dist/pokedex-app/browser -p 8080

# Ver logs do Vercel
vercel logs

# Redeployar
git add .
git commit -m "Updates"
git push

# Deploy manual via CLI
vercel --prod
```

## 🔗 Links Importantes
- Vercel Dashboard: https://vercel.com/dashboard
- Documentação Vercel Angular: https://vercel.com/docs/frameworks/angular
- PokéAPI: https://pokeapi.co/
- GitHub: https://github.com/

---

**Data de Criação**: 14/12/2024  
**Versão**: 1.0
