import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { PokemonListItem } from '../../../../domain/entities/pokemon.entity';
import { PokemonCardComponent } from '../../../../shared/components/pokemon-card/pokemon-card';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, SearchBarComponent],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss'
})
export class PokemonListComponent implements OnInit {
  pokemons: PokemonListItem[] = [];
  filteredPokemons: PokemonListItem[] = [];
  displayedPokemons: PokemonListItem[] = [];
  isLoading = true;
  error: string | null = null;

  // Paginação
  currentPage = 1;
  itemsPerPage = 9990;
  totalPages = 0;

  // Expor Math para o template
  Math = Math;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.isLoading = true;
    this.pokemonService.getPokemonList(10000, 0).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.filteredPokemons = data;
        this.updatePagination();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar Pokémons. Tente novamente.';
        this.isLoading = false;
        console.error('Error loading pokemons:', err);
      }
    });
  }

  onSearch(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredPokemons = this.pokemons;
    } else {
      const term = searchTerm.toLowerCase();
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(term) ||
        pokemon.id.toString().includes(term)
      );
    }
    
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPokemons.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedPokemons = this.filteredPokemons.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPokemonSelected(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }
}
