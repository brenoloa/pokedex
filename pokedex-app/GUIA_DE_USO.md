# 📋 Guia de Uso da Pokédex

## 🎯 Acesso Rápido

A aplicação está rodando em: **http://localhost:4200/**

## 🚀 Navegação

### Tela Principal (Listagem)

1. **Visualizar Pokémons**
   - Ao abrir a aplicação, você verá um grid com os primeiros 151 Pokémons
   - Cada card mostra o ID, nome e imagem do Pokémon
   - Cards têm efeito hover com elevação

2. **Buscar Pokémons**
   - Use a barra de busca no topo da página
   - Digite o nome ou ID do Pokémon
   - A busca é em tempo real (com debounce de 300ms)
   - Clique no ✕ para limpar a busca

3. **Ver Detalhes**
   - Clique em qualquer card de Pokémon
   - Você será redirecionado para a página de detalhes

### Tela de Detalhes

#### Painel Esquerdo (Display Pokédex)
- **Tela principal**: Fundo verde retrô com sprite do Pokémon
- **LEDs coloridos**: Decoração estilo Pokédex clássica
- **Botão Animar**: Clique para iniciar/pausar animação de sprites
- **Controle Direcional (D-Pad)**:
  - ⬆️ **Trás**: Mostra sprite traseiro
  - ⬇️ **Frente**: Mostra sprite frontal
  - ⬅️ **Esquerda**: Variação esquerda
  - ➡️ **Direita**: Variação direita

#### Painel Direito (Informações)

1. **Cabeçalho**
   - Nome do Pokémon (capitalizado)
   - ID formatado (#001, #002, etc.)

2. **Tipos**
   - Badges coloridos com cores oficiais
   - Ex: Fogo (vermelho), Água (azul), etc.

3. **Informações Básicas**
   - Altura (em metros)
   - Peso (em quilogramas)
   - Experiência Base

4. **Habilidades**
   - Lista de habilidades do Pokémon
   - Habilidades ocultas marcadas com tag "(Oculta)"
   - Cores diferentes: azul para normais, roxo para ocultas

5. **Estatísticas Base**
   - Barras de progresso para cada stat
   - Valores numéricos ao lado
   - Stats incluem: HP, Ataque, Defesa, Ataque Especial, Defesa Especial, Velocidade

6. **Movimentos**
   - Até 8 movimentos exibidos
   - Badges verdes com nomes dos ataques

## ⌨️ Atalhos e Dicas

- **Botão Voltar**: Retorna à listagem principal
- **Animação Contínua**: Sprite faz bounce quando animado
- **Loading States**: Pokébola giratória durante carregamento
- **Responsivo**: Funciona em desktop, tablet e mobile

## 🎨 Cores dos Tipos

| Tipo      | Cor        |
|-----------|------------|
| Normal    | Cinza      |
| Fire      | Laranja    |
| Water     | Azul       |
| Electric  | Amarelo    |
| Grass     | Verde      |
| Ice       | Azul Claro |
| Fighting  | Vermelho   |
| Poison    | Roxo       |
| Ground    | Marrom     |
| Flying    | Lilás      |
| Psychic   | Rosa       |
| Bug       | Verde Lima |
| Rock      | Marrom     |
| Ghost     | Roxo       |
| Dragon    | Roxo Azul  |
| Dark      | Marrom     |
| Steel     | Cinza      |
| Fairy     | Rosa       |

## 🐛 Solução de Problemas

### Imagens não carregam
- Verifique sua conexão com a internet
- A API pode estar temporariamente indisponível

### Busca não retorna resultados
- Verifique a ortografia
- Use letras minúsculas
- Tente buscar apenas por números (ID)

### Página não carrega
- Limpe o cache do navegador
- Reinicie o servidor: `Ctrl+C` e `npm start`

## 📱 Dispositivos Suportados

- ✅ Desktop (1920x1080 e superiores)
- ✅ Laptop (1366x768 e superiores)
- ✅ Tablet (768px e superiores)
- ✅ Mobile (320px e superiores)

## 🎮 Exemplo de Uso

1. Abra http://localhost:4200/
2. Veja a lista de Pokémons carregando
3. Digite "pikachu" na busca
4. Clique no card do Pikachu
5. Na página de detalhes:
   - Clique em "Animar" para ver sprites animados
   - Use o D-Pad para rotacionar
   - Role para baixo para ver stats e habilidades
6. Clique em "← Voltar" para retornar

## 💡 Recursos Avançados

- **API Real**: Dados vindos diretamente da PokéAPI oficial
- **Cache**: Navegador cacheia imagens automaticamente
- **Lazy Loading**: Imagens carregam sob demanda
- **Debounce**: Evita requisições excessivas na busca

## 🔗 Links Úteis

- **Aplicação**: http://localhost:4200/
- **PokéAPI Docs**: https://pokeapi.co/docs/v2
- **Angular Docs**: https://angular.dev

---

Divirta-se explorando o mundo Pokémon! 🎉
