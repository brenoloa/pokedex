# 🚀 Quick Start - Deploy no Vercel

## Opção 1: Deploy Automático (Mais Rápido) ⚡

```bash
cd /Users/brenoloa/IdeaProjects/pokedex/pokedex-app
./deploy.sh
```

O script irá:
1. ✅ Verificar dependências
2. ✅ Limpar builds anteriores
3. ✅ Executar build de produção
4. ✅ Verificar configurações
5. ✅ Fazer deploy no Vercel

---

## Opção 2: Deploy via GitHub (Recomendado para CI/CD) 🔄

### Passo 1: Criar Repositório Git
```bash
cd /Users/brenoloa/IdeaProjects/pokedex/pokedex-app
git init
git add .
git commit -m "feat: Complete Pokedex with Clean Architecture"
```

### Passo 2: Enviar para GitHub
1. Crie um novo repositório em: https://github.com/new
2. Nome sugerido: `pokedex-angular`
3. Execute:
```bash
git remote add origin https://github.com/SEU_USUARIO/pokedex-angular.git
git branch -M main
git push -u origin main
```

### Passo 3: Deploy no Vercel
1. Acesse: https://vercel.com/new
2. Importe o repositório `pokedex-angular`
3. Configure:
   - **Framework**: Angular
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/pokedex-app/browser`
4. Clique em **Deploy**

✅ Pronto! A cada push no GitHub, o Vercel fará deploy automaticamente.

---

## Opção 3: Deploy Manual via CLI 🖥️

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd /Users/brenoloa/IdeaProjects/pokedex/pokedex-app
vercel --prod
```

---

## 📋 Configurações Importantes

### Vercel Settings
Certifique-se de que as configurações estão assim:

```
Framework Preset: Angular
Build Command: npm run build  
Output Directory: dist/pokedex-app/browser
Install Command: npm install
Node Version: 18.x ou 20.x
```

### Arquivo vercel.json (já configurado ✅)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Este arquivo é **essencial** para resolver 404 em rotas como `/pokemon/1`.

---

## 🧪 Testar Antes do Deploy

```bash
# Build local
npm run build

# Servir build localmente
npx http-server dist/pokedex-app/browser -p 8080
```

Acesse: http://localhost:8080

---

## ✅ Checklist Pós-Deploy

Após deploy, teste:

- [ ] Home carrega: `https://seu-projeto.vercel.app/`
- [ ] Busca funciona
- [ ] Rota direta: `https://seu-projeto.vercel.app/pokemon/25`
- [ ] Clique em card abre detalhes
- [ ] D-Pad rotaciona sprite
- [ ] Botão "Voltar" funciona
- [ ] Responsivo em mobile

---

## 🐛 Problemas Comuns

### 404 em Rotas
**Causa**: `vercel.json` ausente ou mal configurado  
**Solução**: Verifique se existe na raiz do projeto

### Build Falha
**Causa**: Erros TypeScript  
**Solução**: Execute `npm run build` localmente primeiro

### Página Branca
**Causa**: Erro JavaScript no console  
**Solução**: Abra DevTools (F12) e verifique erros

---

## 📞 Suporte

- 📖 Documentação completa: `DEPLOY.md`
- 🔧 Troubleshooting: `TROUBLESHOOTING.md`
- ✅ Checklist detalhado: `DEPLOY_CHECKLIST.md`

---

## 🎉 Resultado Final

Seu Pokédex estará online em:
```
https://seu-projeto.vercel.app
```

**Features**:
- ✅ 10.000 Pokémon carregados
- ✅ Busca em tempo real
- ✅ Detalhes completos (stats, abilities, moves)
- ✅ Rotação de sprites com D-Pad
- ✅ Animações suaves
- ✅ Design responsivo
- ✅ Paginação

---

**Última atualização**: 14/12/2024  
**Versão Angular**: 21.0.3  
**Tempo estimado de deploy**: 2-5 minutos
