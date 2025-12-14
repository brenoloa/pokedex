import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonName',
  standalone: true
})
export class PokemonNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
