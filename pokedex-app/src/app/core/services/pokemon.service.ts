import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PokemonRepository } from '../../domain/use-cases/pokemon.repository';
import { PokemonEntity, PokemonListItem } from '../../domain/entities/pokemon.entity';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private repository: PokemonRepository) {}

  getPokemonList(limit: number = 151, offset: number = 0): Observable<PokemonListItem[]> {
    return this.repository.getAll(limit, offset).pipe(
      map(response => response.results.map((pokemon, index) => {
        const id = this.extractIdFromUrl(pokemon.url);
        return {
          id,
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        };
      }))
    );
  }

  getPokemonByName(name: string): Observable<PokemonEntity> {
    return this.repository.getByName(name);
  }

  getPokemonById(id: number): Observable<PokemonEntity> {
    return this.repository.getById(id);
  }

  searchPokemon(name: string): Observable<PokemonEntity[]> {
    if (!name || name.trim() === '') {
      return new Observable(observer => observer.next([]));
    }
    return this.repository.searchByName(name);
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/').filter(part => part);
    return parseInt(parts[parts.length - 1], 10);
  }

  getPokemonSprites(pokemon: PokemonEntity): string[] {
    const sprites: string[] = [];
    
    if (pokemon.sprites.front_default) sprites.push(pokemon.sprites.front_default);
    if (pokemon.sprites.back_default) sprites.push(pokemon.sprites.back_default);
    if (pokemon.sprites.front_shiny) sprites.push(pokemon.sprites.front_shiny);
    if (pokemon.sprites.back_shiny) sprites.push(pokemon.sprites.back_shiny);
    
    if (pokemon.sprites.other?.['official-artwork']?.front_default) {
      sprites.push(pokemon.sprites.other['official-artwork'].front_default);
    }
    
    if (pokemon.sprites.other?.home?.front_default) {
      sprites.push(pokemon.sprites.other.home.front_default);
    }

    return sprites.filter(sprite => sprite !== null);
  }

  getDirectionalSprites(pokemon: PokemonEntity) {
    return {
      front: pokemon.sprites.front_default,
      back: pokemon.sprites.back_default,
      left: pokemon.sprites.front_default, // Pokemon API doesn't have left/right, using front as fallback
      right: pokemon.sprites.back_default
    };
  }
}
