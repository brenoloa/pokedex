# 🔧 Troubleshooting - Pokédex

## Problema: Loading Infinito ao Clicar no Pokémon

### Sintomas
- Ao clicar em um Pokémon na listagem, a página de detalhes fica em loading infinito
- Pokébola girando continuamente
- Mensagem "Carregando Pokémon..." não desaparece

### Possíveis Causas e Soluções

#### 1. Problema de Roteamento
**Verificar**: A rota está configurada corretamente?

```typescript
// app.routes.ts
{ path: 'pokemon/:id', component: PokemonDetailComponent }
```

**Teste**: Acesse diretamente `http://localhost:4200/pokemon/1`

#### 2. Problema com HttpClient
**Verificar**: O HttpClient está configurado?

```typescript
// app.config.ts
providers: [
  provideHttpClient(withInterceptorsFromDi())
]
```

#### 3. Problema com Repository Injection
**Verificar**: O repositório está injetado corretamente?

```typescript
// app.config.ts
providers: [
  { provide: PokemonRepository, useClass: PokemonRepositoryImpl }
]
```

#### 4. Erro de CORS
**Verificar no Console**: Procure por erros como:
```
Access to XMLHttpRequest at 'https://pokeapi.co/...' from origin 'http://localhost:4200' has been blocked by CORS
```

**Solução**: A PokeAPI permite CORS, mas verifique se não há firewall ou proxy bloqueando

#### 5. Erro na Requisição
**Abra o Console do Navegador** (F12 ou Cmd+Option+I)

Procure por:
- Erros em vermelho
- Mensagens de rede (aba Network)
- Status de requisições (200 OK, 404 Not Found, etc.)

#### 6. Problema com OnInit
**Verificar**: O método ngOnInit está sendo chamado?

Adicione logs:
```typescript
ngOnInit(): void {
  console.log('Component initialized');
  this.route.params.subscribe(params => {
    console.log('Params:', params);
    const id = params['id'];
    console.log('Pokemon ID:', id);
    if (id) {
      this.loadPokemon(id);
    }
  });
}
```

### Como Debugar

#### Passo 1: Abra o Console do Navegador
1. Pressione `F12` (Windows/Linux) ou `Cmd+Option+I` (Mac)
2. Vá para a aba "Console"
3. Clique em um Pokémon
4. Observe as mensagens de log

Você deve ver:
```
Loading pokemon with ID: 1
Pokemon loaded successfully: {id: 1, name: 'bulbasaur', ...}
```

#### Passo 2: Verifique a Aba Network
1. Vá para a aba "Network" no DevTools
2. Clique em um Pokémon
3. Procure por requisição para `https://pokeapi.co/api/v2/pokemon/1`
4. Verifique o status: deve ser `200 OK`
5. Clique na requisição e veja a resposta

#### Passo 3: Verifique Erros de Compilação
No terminal onde o `npm start` está rodando, procure por:
```
✖ Failed to compile
ERROR in src/app/...
```

### Soluções Rápidas

#### Solução 1: Restart Completo
```bash
# Pare o servidor (Ctrl+C)
cd /Users/brenoloa/IdeaProjects/pokedex/pokedex-app
npm start
```

#### Solução 2: Limpar Cache do Navegador
1. Pressione `Ctrl+Shift+Delete` (ou `Cmd+Shift+Delete` no Mac)
2. Limpe cache e cookies
3. Recarregue a página (`Ctrl+F5` ou `Cmd+Shift+R`)

#### Solução 3: Hard Reload
Pressione `Ctrl+Shift+R` (ou `Cmd+Shift+R` no Mac) para forçar reload

#### Solução 4: Verificar Ambiente Node
```bash
node --version  # Deve ser 18+
npm --version   # Deve ser 9+
```

### Erros Comuns e Fixes

#### Erro: "Cannot find module '@angular/common/http'"
```bash
npm install
```

#### Erro: "NullInjectorError: No provider for PokemonRepository"
Verifique que está no `app.config.ts`:
```typescript
{ provide: PokemonRepository, useClass: PokemonRepositoryImpl }
```

#### Erro: "ERROR TypeError: Cannot read properties of null"
O pokémon não foi carregado. Verifique:
1. A requisição HTTP está sendo feita?
2. A resposta da API está correta?
3. O Observable está sendo subscrito?

### Logs de Debug Adicionados

O código já inclui logs de debug. Ao clicar em um Pokémon, você deve ver no console:

```javascript
Loading pokemon with ID: 1
Pokemon loaded successfully: {id: 1, name: 'bulbasaur', ...}
```

Se NÃO ver esses logs:
- O componente não está sendo inicializado
- O roteamento não está funcionando
- Verifique as rotas em `app.routes.ts`

Se ver o primeiro log mas não o segundo:
- A requisição HTTP falhou
- Veja a aba Network para detalhes
- Verifique conectividade com a internet

### Teste Manual da API

Execute no terminal:
```bash
curl https://pokeapi.co/api/v2/pokemon/1
```

Deve retornar JSON com dados do Bulbasaur.

### Contato de Emergência

Se nada funcionar, tente:

1. **Deletar node_modules e reinstalar**
```bash
cd /Users/brenoloa/IdeaProjects/pokedex/pokedex-app
rm -rf node_modules package-lock.json
npm install
npm start
```

2. **Verificar portas**
```bash
lsof -i :4200
# Se houver algo rodando, mate o processo
kill -9 <PID>
```

3. **Criar novo projeto limpo** (último recurso)

---

## Checklist de Verificação

- [ ] Servidor está rodando em `http://localhost:4200`
- [ ] Console do navegador está aberto (F12)
- [ ] Aba Network está monitorando requisições
- [ ] Não há erros em vermelho no console
- [ ] Requisições HTTP retornam 200 OK
- [ ] Logs de debug aparecem ao clicar

## Status Esperado

✅ **Funcionando corretamente**:
- Grid de Pokémons carrega
- Ao clicar, redireciona para `/pokemon/:id`
- Loading aparece brevemente
- Detalhes do Pokémon são exibidos
- Logs no console confirmam carregamento

❌ **Com problema**:
- Loading infinito
- Erro no console
- Requisição HTTP falha
- Componente não inicializa

---

**Última atualização**: 14/12/2025
