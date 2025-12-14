# 🏗️ Arquitetura e Padrões de Design

## Visão Geral da Arquitetura

Este projeto implementa **Clean Architecture** seguindo os princípios SOLID, com separação clara de responsabilidades e inversão de dependências.

## 📐 Camadas da Aplicação

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│    (Components, Templates, Styles)      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          Application Layer              │
│        (Services, Use Cases)            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           Domain Layer                  │
│     (Entities, Repositories)            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Infrastructure Layer            │
│      (API, External Services)           │
└─────────────────────────────────────────┘
```

## 🎯 Estrutura de Pastas Detalhada

### `/domain` - Camada de Domínio
**Responsabilidade**: Regras de negócio puras, sem dependências externas

```typescript
domain/
├── entities/
│   └── pokemon.entity.ts      # Interfaces de entidades
└── use-cases/
    └── pokemon.repository.ts  # Contratos de repositório (abstratos)
```

**Princípios**:
- Não depende de nada externo
- Define contratos (interfaces)
- Entidades representam conceitos de negócio

### `/data` - Camada de Dados
**Responsabilidade**: Implementação de acesso a dados

```typescript
data/
├── api/
│   └── pokemon-api.service.ts      # Comunicação HTTP com API
└── repositories/
    └── pokemon-repository.impl.ts  # Implementação do repositório
```

**Padrões**:
- **Repository Pattern**: Abstração do acesso a dados
- **Adapter Pattern**: Adapta resposta da API para entidades

### `/core` - Camada de Aplicação
**Responsabilidade**: Lógica de aplicação, orquestra casos de uso

```typescript
core/
└── services/
    └── pokemon.service.ts  # Serviço de aplicação
```

**Características**:
- Orquestra casos de uso
- Transforma dados para apresentação
- Contém lógica específica da aplicação

### `/features` - Camada de Apresentação
**Responsabilidade**: Componentes de UI por feature

```typescript
features/
├── pokedex/
│   └── components/
│       └── pokemon-list/       # Listagem de Pokémons
└── pokemon/
    └── components/
        └── pokemon-detail/     # Detalhes do Pokémon
```

**Padrões**:
- **Feature-based structure**: Agrupamento por funcionalidade
- **Smart/Dumb Components**: Separação de lógica

### `/shared` - Componentes Compartilhados
**Responsabilidade**: Componentes, pipes e diretivas reutilizáveis

```typescript
shared/
├── components/
│   ├── pokemon-card/    # Card reutilizável
│   └── search-bar/      # Barra de busca
└── pipes/
    └── pokemon-name.pipe.ts  # Formatação de nomes
```

## 🔄 Fluxo de Dados

```
User Action
    ↓
Component (Presentation)
    ↓
Service (Application)
    ↓
Repository (Interface - Domain)
    ↓
Repository Implementation (Data)
    ↓
API Service (Infrastructure)
    ↓
External API (PokéAPI)
```

### Exemplo Prático

```typescript
// 1. Usuário clica em um Pokémon
onPokemonClick(id: number) {
  // 2. Component chama Service
  this.pokemonService.getPokemonById(id).subscribe(...)
}

// 3. Service usa Repository (abstração)
getPokemonById(id: number): Observable<PokemonEntity> {
  return this.repository.getById(id);
}

// 4. Repository Implementation faz chamada à API
getById(id: number): Observable<PokemonEntity> {
  return this.apiService.getPokemonById(id);
}

// 5. API Service faz requisição HTTP
getPokemonById(id: number): Observable<PokemonEntity> {
  return this.http.get<PokemonEntity>(`${this.baseUrl}/pokemon/${id}`);
}
```

## 🎨 Padrões Implementados

### 1. Repository Pattern
**Objetivo**: Abstrair acesso a dados

```typescript
// Interface (Domain)
export abstract class PokemonRepository {
  abstract getById(id: number): Observable<PokemonEntity>;
}

// Implementação (Data)
export class PokemonRepositoryImpl extends PokemonRepository {
  getById(id: number): Observable<PokemonEntity> {
    return this.apiService.getPokemonById(id);
  }
}
```

**Benefícios**:
- Facilita testes (mock do repositório)
- Permite trocar fonte de dados sem afetar lógica
- Inversão de dependência

### 2. Dependency Injection
**Objetivo**: Inversão de controle

```typescript
// app.config.ts
providers: [
  { provide: PokemonRepository, useClass: PokemonRepositoryImpl }
]

// Service
constructor(private repository: PokemonRepository) {}
```

**Benefícios**:
- Baixo acoplamento
- Testabilidade
- Flexibilidade

### 3. Observable Pattern (RxJS)
**Objetivo**: Programação reativa

```typescript
getPokemonList(): Observable<PokemonListItem[]> {
  return this.repository.getAll().pipe(
    map(response => this.transformData(response))
  );
}
```

**Benefícios**:
- Assíncrono por natureza
- Composição de operações
- Cancelamento automático

### 4. Smart/Dumb Components
**Objetivo**: Separação de responsabilidades

```typescript
// Smart Component (Container)
export class PokemonListComponent {
  pokemons$ = this.pokemonService.getPokemonList();
  
  onSearch(term: string) {
    // Lógica de busca
  }
}

// Dumb Component (Presentational)
export class PokemonCardComponent {
  @Input() pokemon!: PokemonListItem;
  @Output() pokemonSelected = new EventEmitter<number>();
}
```

### 5. Pipe Pattern
**Objetivo**: Transformação de dados na view

```typescript
@Pipe({ name: 'pokemonName' })
export class PokemonNamePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
```

## 🧩 Princípios SOLID

### Single Responsibility Principle (SRP)
- Cada classe tem uma única responsabilidade
- `PokemonApiService` → apenas chamadas HTTP
- `PokemonService` → apenas lógica de aplicação
- `PokemonCardComponent` → apenas exibição de card

### Open/Closed Principle (OCP)
- Aberto para extensão, fechado para modificação
- Pode criar novos repositórios sem alterar serviços
- Pode adicionar novos pipes sem modificar existentes

### Liskov Substitution Principle (LSP)
- `PokemonRepositoryImpl` pode substituir `PokemonRepository`
- Qualquer implementação de repositório é intercambiável

### Interface Segregation Principle (ISP)
- Interfaces específicas e focadas
- `PokemonRepository` contém apenas métodos necessários

### Dependency Inversion Principle (DIP)
- Dependemos de abstrações, não de implementações
- `PokemonService` depende de `PokemonRepository` (abstrato)
- Não depende de `PokemonRepositoryImpl` diretamente

## 🔒 Benefícios da Arquitetura

1. **Testabilidade**
   - Cada camada pode ser testada isoladamente
   - Fácil criação de mocks

2. **Manutenibilidade**
   - Mudanças isoladas em camadas específicas
   - Código organizado e legível

3. **Escalabilidade**
   - Fácil adicionar novas features
   - Estrutura preparada para crescimento

4. **Flexibilidade**
   - Troca de API sem afetar lógica
   - Mudança de UI sem afetar serviços

## 📊 Diagrama de Dependências

```
┌─────────────────────────────────────┐
│  PokemonListComponent               │
│  PokemonDetailComponent             │
└──────────────┬──────────────────────┘
               │ depends on
               ▼
┌──────────────────────────────────────┐
│  PokemonService                      │
└──────────────┬───────────────────────┘
               │ depends on
               ▼
┌──────────────────────────────────────┐
│  PokemonRepository (abstract)        │
└──────────────┬───────────────────────┘
               │ implemented by
               ▼
┌──────────────────────────────────────┐
│  PokemonRepositoryImpl               │
└──────────────┬───────────────────────┘
               │ depends on
               ▼
┌──────────────────────────────────────┐
│  PokemonApiService                   │
└──────────────────────────────────────┘
```

## 🧪 Estratégia de Testes

```typescript
// Unit Test - Service
describe('PokemonService', () => {
  let service: PokemonService;
  let mockRepository: jasmine.SpyObj<PokemonRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('PokemonRepository', ['getById']);
    service = new PokemonService(mockRepository);
  });

  it('should get pokemon by id', () => {
    const mockPokemon = { id: 1, name: 'bulbasaur' };
    mockRepository.getById.and.returnValue(of(mockPokemon));
    
    service.getPokemonById(1).subscribe(pokemon => {
      expect(pokemon).toEqual(mockPokemon);
    });
  });
});
```

## 📚 Recursos Adicionais

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Angular Architecture Guide](https://angular.dev/guide/architecture)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)

---

Esta arquitetura foi projetada para ser **escalável**, **testável** e **manutenível**, seguindo as melhores práticas da indústria.
