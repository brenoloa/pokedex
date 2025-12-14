import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonEntity, PokemonListResponse } from '../../domain/entities/pokemon.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 151, offset: number = 0): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonByName(name: string): Observable<PokemonEntity> {
    return this.http.get<PokemonEntity>(`${this.baseUrl}/pokemon/${name.toLowerCase()}`);
  }

  getPokemonById(id: number): Observable<PokemonEntity> {
    return this.http.get<PokemonEntity>(`${this.baseUrl}/pokemon/${id}`);
  }
}
