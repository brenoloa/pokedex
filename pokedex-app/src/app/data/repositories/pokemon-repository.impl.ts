import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { PokemonRepository } from '../../domain/use-cases/pokemon.repository';
import { PokemonEntity, PokemonListResponse } from '../../domain/entities/pokemon.entity';
import { PokemonApiService } from '../api/pokemon-api.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonRepositoryImpl extends PokemonRepository {

  constructor(private apiService: PokemonApiService) {
    super();
  }

  getAll(limit: number = 151, offset: number = 0): Observable<PokemonListResponse> {
    return this.apiService.getPokemonList(limit, offset);
  }

  getByName(name: string): Observable<PokemonEntity> {
    return this.apiService.getPokemonByName(name);
  }

  getById(id: number): Observable<PokemonEntity> {
    return this.apiService.getPokemonById(id);
  }

  searchByName(name: string): Observable<PokemonEntity[]> {
    return this.getAll(100000, 0).pipe(
      map(response => response.results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      )),
      switchMap(filteredPokemons => {
        if (filteredPokemons.length === 0) {
          return [[]];
        }
        const requests = filteredPokemons.slice(0, 20).map(pokemon => 
          this.getByName(pokemon.name)
        );
        return forkJoin(requests);
      })
    );
  }
}
