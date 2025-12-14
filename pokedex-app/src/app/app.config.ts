import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { PokemonRepository } from './domain/use-cases/pokemon.repository';
import { PokemonRepositoryImpl } from './data/repositories/pokemon-repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: PokemonRepository, useClass: PokemonRepositoryImpl }
  ]
};
