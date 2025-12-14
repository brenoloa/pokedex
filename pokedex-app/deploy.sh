#!/bin/bash

# 🚀 Script de Deploy Automatizado para Vercel
# Uso: ./deploy.sh

set -e  # Parar em caso de erro

echo "🎮 Pokédex Angular - Deploy Automatizado"
echo "========================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para printar com cor
print_step() {
    echo -e "${BLUE}▶${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# 1. Verificar se está na pasta correta
print_step "Verificando diretório..."
if [ ! -f "package.json" ]; then
    print_error "Erro: Execute este script na pasta raiz do projeto (pokedex-app)"
    exit 1
fi
print_success "Diretório correto"

# 2. Verificar se node_modules existe
print_step "Verificando dependências..."
if [ ! -d "node_modules" ]; then
    print_warning "node_modules não encontrado. Instalando dependências..."
    npm install
fi
print_success "Dependências OK"

# 3. Limpar build anterior
print_step "Limpando build anterior..."
if [ -d "dist" ]; then
    rm -rf dist
    print_success "Build anterior removido"
else
    print_success "Nenhum build anterior encontrado"
fi

# 4. Executar build de produção
print_step "Executando build de produção..."
npm run build
print_success "Build concluído"

# 5. Verificar se dist foi criado
print_step "Verificando output do build..."
if [ ! -d "dist/pokedex-app/browser" ]; then
    print_error "Erro: Pasta dist/pokedex-app/browser não foi criada"
    exit 1
fi
print_success "Output verificado: dist/pokedex-app/browser"

# 6. Verificar vercel.json
print_step "Verificando vercel.json..."
if [ ! -f "vercel.json" ]; then
    print_error "Erro: vercel.json não encontrado na raiz do projeto"
    exit 1
fi
print_success "vercel.json encontrado"

# 7. Verificar se Vercel CLI está instalado
print_step "Verificando Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI não instalado"
    echo ""
    echo "Instale com: npm install -g vercel"
    echo "Ou faça deploy via GitHub em: https://vercel.com/new"
    echo ""
    print_step "Deseja instalar o Vercel CLI agora? (s/n)"
    read -r response
    if [[ "$response" =~ ^([sS][iI][mM]|[sS])$ ]]; then
        npm install -g vercel
        print_success "Vercel CLI instalado"
    else
        print_warning "Deploy manual necessário via GitHub"
        exit 0
    fi
else
    print_success "Vercel CLI instalado"
fi

# 8. Fazer deploy
echo ""
echo "========================================"
echo "🚀 Iniciando deploy no Vercel..."
echo "========================================"
echo ""
print_warning "Siga as instruções do Vercel CLI:"
echo ""

vercel --prod

echo ""
echo "========================================"
print_success "Deploy concluído!"
echo "========================================"
echo ""
echo "📝 Próximos passos:"
echo "  1. Acesse a URL fornecida pelo Vercel"
echo "  2. Teste as rotas: /pokemon/1, /pokemon/25"
echo "  3. Verifique a busca e navegação"
echo ""
echo "🐛 Problemas?"
echo "  Consulte: TROUBLESHOOTING.md"
echo ""
