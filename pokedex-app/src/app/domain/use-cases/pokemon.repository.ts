import { Observable } from 'rxjs';
import { PokemonEntity, PokemonListResponse } from '../entities/pokemon.entity';

export abstract class PokemonRepository {
  abstract getAll(limit: number, offset: number): Observable<PokemonListResponse>;
  abstract getByName(name: string): Observable<PokemonEntity>;
  abstract getById(id: number): Observable<PokemonEntity>;
  abstract searchByName(name: string): Observable<PokemonEntity[]>;
}
