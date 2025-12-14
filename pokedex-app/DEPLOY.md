# Guia de Deploy na Vercel - Pokédex

## 🚀 Passo a Passo para Deploy

### 1. Preparação do Projeto

O projeto já está configurado com:
- ✅ `vercel.json` - Configuração de rotas SPA
- ✅ Build otimizado para produção
- ✅ Variáveis de ambiente configuradas

### 2. Instalar Vercel CLI (Opcional)

```bash
npm install -g vercel
```

### 3. Deploy via GitHub (Recomendado)

#### 3.1. Criar repositório no GitHub
```bash
cd /Users/brenoloa/IdeaProjects/pokedex/pokedex-app
git init
git add .
git commit -m "Initial commit - Pokédex Angular"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/pokedex-angular.git
git push -u origin main
```

#### 3.2. Conectar na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "Add New Project"
4. Selecione seu repositório `pokedex-angular`
5. Configure:
   - **Framework Preset**: Angular
   - **Root Directory**: `./` (ou deixe em branco)
   - **Build Command**: `npm run build` (ou deixe o padrão)
   - **Output Directory**: `dist/pokedex-app/browser`
6. Clique em "Deploy"

### 4. Deploy via Vercel CLI

```bash
cd /Users/brenoloa/IdeaProjects/pokedex/pokedex-app

# Login na Vercel
vercel login

# Deploy
vercel --prod
```

Durante o deploy, responda:
- **Set up and deploy?** → Yes
- **Which scope?** → Sua conta
- **Link to existing project?** → No
- **Project name?** → pokedex-app (ou o nome que preferir)
- **Directory?** → ./ (Enter para usar atual)
- **Override settings?** → No

### 5. Configurações Importantes

#### Build Command
```
npm run build
```

#### Output Directory
```
dist/pokedex-app/browser
```

#### Install Command
```
npm install
```

### 6. Verificar Build Local

Antes de fazer deploy, teste o build localmente:

```bash
cd /Users/brenoloa/IdeaProjects/pokedex/pokedex-app
npm run build
```

Isso deve criar a pasta `dist/pokedex-app/browser` com os arquivos de produção.

### 7. Testar Build Localmente

```bash
# Instalar servidor HTTP simples
npm install -g http-server

# Servir build de produção
cd dist/pokedex-app/browser
http-server -p 8080

# Abrir no navegador: http://localhost:8080
```

## 🔧 Troubleshooting

### Erro 404 nas Rotas

**Problema**: Ao navegar para `/pokemon/1` diretamente, aparece 404.

**Solução**: O arquivo `vercel.json` já está configurado para redirecionar todas as rotas para `index.html`.

### Erro de Build

**Problema**: Build falha na Vercel.

**Soluções**:
1. Verifique se o Node.js está na versão 18+
2. Na Vercel, vá em Project Settings → General → Node.js Version → Selecione 18.x ou superior

### Erro "Output directory not found"

**Problema**: Vercel não encontra a pasta de build.

**Solução**: Configure o Output Directory como:
```
dist/pokedex-app/browser
```

### Assets não carregam

**Problema**: Imagens ou estilos não aparecem.

**Solução**: Verifique se as imagens estão na pasta `public/` e não em `src/assets/`.

## 📝 Configuração do vercel.json

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Isso garante que todas as rotas (como `/pokemon/1`) sejam redirecionadas para o `index.html`, permitindo que o Angular Router funcione corretamente.

## 🌐 Variáveis de Ambiente (se necessário)

Se precisar adicionar variáveis de ambiente:

1. Vá em Project Settings → Environment Variables
2. Adicione:
   - `NODE_ENV` = `production`
   - Outras variáveis conforme necessário

## 🎯 Checklist de Deploy

- [ ] Arquivo `vercel.json` criado na raiz do projeto
- [ ] Build local funciona: `npm run build`
- [ ] Pasta `dist/pokedex-app/browser` é gerada
- [ ] Código commitado no Git
- [ ] Repositório no GitHub criado
- [ ] Projeto conectado na Vercel
- [ ] Output Directory configurado: `dist/pokedex-app/browser`
- [ ] Build Command: `npm run build`
- [ ] Node.js versão 18+ selecionada
- [ ] Deploy realizado com sucesso
- [ ] Rotas funcionando (testar `/pokemon/1`)
- [ ] API externa (PokeAPI) acessível

## 🚀 Comandos Rápidos

```bash
# Build de produção
npm run build

# Deploy na Vercel (CLI)
vercel --prod

# Ver logs de deploy
vercel logs

# Remover projeto da Vercel
vercel remove pokedex-app
```

## 📱 Após o Deploy

Sua Pokédex estará disponível em:
```
https://pokedex-app-[seu-id].vercel.app
```

Teste:
1. Página inicial carrega
2. Busca funciona
3. Clicar em um Pokémon abre detalhes
4. Navegação funciona
5. Paginação funciona
6. Acessar `/pokemon/25` diretamente funciona

## 🔄 Atualizações Automáticas

Com GitHub conectado:
- Push para `main` → Deploy automático em produção
- Pull Request → Preview deploy automático

## 📊 Performance

A Vercel oferece:
- CDN global
- Cache automático
- Compressão GZIP/Brotli
- HTTP/2
- Edge Functions

---

**Dúvidas?** Verifique os logs na Vercel Dashboard ou use `vercel logs` no terminal.
