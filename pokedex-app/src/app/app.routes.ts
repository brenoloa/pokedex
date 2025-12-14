import { Routes } from '@angular/router';
import { PokemonListComponent } from './features/pokedex/components/pokemon-list/pokemon-list';
import { PokemonDetailComponent } from './features/pokemon/components/pokemon-detail/pokemon-detail';

export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: '**', redirectTo: '' }
];
