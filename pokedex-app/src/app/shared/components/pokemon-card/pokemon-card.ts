import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListItem } from '../../../domain/entities/pokemon.entity';
import { PokemonNamePipe } from '../../pipes/pokemon-name.pipe';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokemonNamePipe],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCardComponent {
  @Input() pokemon!: PokemonListItem;
  @Output() pokemonSelected = new EventEmitter<number>();

  onCardClick(): void {
    this.pokemonSelected.emit(this.pokemon.id);
  }

  getPokemonIdFormatted(): string {
    return `#${this.pokemon.id.toString().padStart(3, '0')}`;
  }
}
