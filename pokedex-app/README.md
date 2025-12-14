# 🎮 Pokédex Angular

Uma aplicação moderna de Pokédex desenvolvida em Angular 21 com Clean Architecture, consumindo a [PokéAPI](https://pokeapi.co/).

![Angular](https://img.shields.io/badge/Angular-21-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Funcionalidades

- 🔍 **Busca em tempo real**: Pesquise Pokémons por nome ou ID
- 📱 **Grid responsivo**: Visualização em cards estilo Pokédex
- 🎨 **Design autêntico**: Interface inspirada na Pokédex clássica
- 🎬 **Animações fluidas**: Sprites animados com movimento contínuo
- 🎮 **Controle direcional**: Gire o Pokémon usando controles (Frente, Trás, Esquerda, Direita)
- 📊 **Estatísticas completas**: Visualize stats, habilidades, tipos e movimentos
- 🎯 **Informações detalhadas**: Altura, peso, experiência base e mais
- 🌈 **Badges coloridos**: Tipos de Pokémon com cores oficiais
- ⚡ **Loading states**: Feedback visual durante carregamento

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **SOLID**:

```
src/app/
├── core/               # Serviços principais da aplicação
│   └── services/       # PokemonService
├── data/               # Camada de dados
│   ├── api/           # Comunicação com API
│   └── repositories/  # Implementação de repositórios
├── domain/            # Regras de negócio
│   ├── entities/      # Entidades e interfaces
│   └── use-cases/     # Casos de uso (abstrações)
├── features/          # Features da aplicação
│   ├── pokedex/       # Listagem de Pokémons
│   └── pokemon/       # Detalhes do Pokémon
└── shared/            # Componentes compartilhados
    ├── components/    # PokemonCard, SearchBar
    └── pipes/         # PokemonNamePipe
```

### Camadas da Arquitetura

1. **Domain**: Entidades e contratos (interfaces)
2. **Data**: Implementação de repositórios e acesso à API
3. **Core**: Serviços de aplicação
4. **Features**: Componentes de funcionalidades específicas
5. **Shared**: Componentes reutilizáveis

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
cd pokedex-app

# Instale as dependências
npm install

# Execute o projeto
npm start
```

A aplicação estará disponível em `http://localhost:4200/`

## 🎯 Comandos Disponíveis

```bash
# Desenvolvimento
npm start              # Inicia servidor de desenvolvimento

# Build
npm run build          # Build de produção
npm run watch          # Build com watch mode

# Testes
npm test              # Executa testes unitários
```

## 🎨 Componentes Principais

### PokemonListComponent
- Grid responsivo de Pokémons
- Busca em tempo real
- Loading state com animação de Pokébola
- Navegação para detalhes

### PokemonDetailComponent
- Tela estilo Pokédex com painel vermelho
- Sprite principal com fundo verde retrô
- Controles direcionais (D-Pad) para rotação
- Botão de animação para exibir todos os sprites
- Informações completas:
  - Tipos com cores oficiais
  - Altura, peso e experiência
  - Habilidades (normais e ocultas)
  - Estatísticas base com barras de progresso
  - Movimentos disponíveis

### PokemonCardComponent
- Card gradiente estilizado
- Hover effects
- ID formatado (#001)
- Imagem oficial artwork

### SearchBarComponent
- Debounce de 300ms
- Botão de limpar busca
- Design moderno com gradiente

## 🎮 Funcionalidades Especiais

### Sistema de Rotação
Use os controles direcionais para visualizar o Pokémon de diferentes ângulos:
- **Frente**: Sprite frontal padrão
- **Trás**: Sprite traseiro
- **Esquerda/Direita**: Variações disponíveis

### Animação de Sprites
Clique em "Animar" para ver uma sequência animada de todos os sprites disponíveis do Pokémon, criando efeito de movimento.

## 🎨 Estilização

- **SCSS** com variáveis e mixins
- **Gradientes** modernos
- **Animações CSS** suaves
- **Design responsivo** mobile-first
- **Tema Pokédex** clássico com toque moderno

## 📱 Responsividade

- Desktop: Grid de 6 colunas
- Tablet: Grid de 4 colunas  
- Mobile: Grid de 2 colunas

## 🔧 Tecnologias Utilizadas

- **Angular 21**: Framework principal
- **TypeScript**: Linguagem
- **RxJS**: Programação reativa
- **SCSS**: Pré-processador CSS
- **PokéAPI**: API REST de Pokémons
- **Standalone Components**: Arquitetura moderna do Angular

## 📦 Estrutura de Dados

A aplicação consome a API com tipagem completa:

```typescript
interface PokemonEntity {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  moves: PokemonMove[];
  // ... e mais
}
```

## 🌟 Destaques de Implementação

- ✅ Dependency Injection com Repository Pattern
- ✅ Lazy Loading de imagens
- ✅ Error handling robusto
- ✅ TypeScript strict mode
- ✅ Componentes standalone (sem NgModule)
- ✅ Signals para reatividade
- ✅ Pipes customizados
- ✅ Guards e interceptors preparados

## 📝 Próximas Melhorias

- [ ] Paginação infinita
- [ ] Filtros por tipo
- [ ] Favoritos com LocalStorage
- [ ] Comparação de Pokémons
- [ ] Gráficos de estatísticas
- [ ] Busca por geração
- [ ] PWA support
- [ ] Testes E2E

## 📄 Licença

Este projeto é open source e está sob a licença MIT.

## 👨‍💻 Desenvolvido com ❤️

Criado como exemplo de Clean Architecture em Angular consumindo a PokéAPI.

---

**API utilizada**: [PokéAPI](https://pokeapi.co/) - The RESTful Pokémon API
