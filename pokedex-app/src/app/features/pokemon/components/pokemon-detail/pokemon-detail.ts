import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { PokemonEntity } from '../../../../domain/entities/pokemon.entity';
import { PokemonNamePipe } from '../../../../shared/pipes/pokemon-name.pipe';

type Direction = 'front' | 'back' | 'left' | 'right';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, PokemonNamePipe],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.scss'
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemon: PokemonEntity | null = null;
  isLoading = false;
  error: string | null = null;
  
  currentSpriteIndex = 0;
  allSprites: string[] = [];
  isAnimating = false;
  animationInterval: any;
  
  currentDirection: Direction = 'front';
  directionalSprites = {
    front: '',
    back: '',
    left: '',
    right: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Route params received:', params);
      console.log('Pokemon ID from route:', id);
      if (id) {
        this.loadPokemon(id);
      } else {
        console.error('No ID provided in route');
        this.error = 'ID do Pokémon não encontrado';
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  loadPokemon(id: string): void {
    this.isLoading = true;
    this.error = null;
    const pokemonId = parseInt(id, 10);
    
    console.log('Loading pokemon with ID:', pokemonId);
    
    this.pokemonService.getPokemonById(pokemonId).subscribe({
      next: (data) => {
        console.log('Pokemon loaded successfully:', data);
        this.pokemon = data;
        this.allSprites = this.pokemonService.getPokemonSprites(data);
        const directional = this.pokemonService.getDirectionalSprites(data);
        this.directionalSprites = {
          front: directional.front || '',
          back: directional.back || '',
          left: directional.front || '', // Fallback to front
          right: directional.back || '' // Fallback to back
        };
        this.isLoading = false;
        console.log('Pokemon state updated:', {
          pokemon: this.pokemon?.name,
          isLoading: this.isLoading,
          sprites: this.allSprites.length
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading pokemon:', err);
        this.error = 'Erro ao carregar Pokémon. Tente novamente.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getCurrentSprite(): string {
    if (this.isAnimating && this.allSprites.length > 0) {
      return this.allSprites[this.currentSpriteIndex];
    }
    return this.directionalSprites[this.currentDirection];
  }

  toggleAnimation(): void {
    if (this.isAnimating) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  }

  startAnimation(): void {
    if (this.allSprites.length === 0) return;
    
    this.isAnimating = true;
    this.currentSpriteIndex = 0;
    
    this.animationInterval = setInterval(() => {
      this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.allSprites.length;
    }, 200);
  }

  stopAnimation(): void {
    this.isAnimating = false;
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    this.currentSpriteIndex = 0;
  }

  rotateToDirection(direction: Direction): void {
    this.stopAnimation();
    this.currentDirection = direction;
  }

  getTypeClass(type: string): string {
    return `type-${type}`;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getPokemonIdFormatted(): string {
    return this.pokemon ? `#${this.pokemon.id.toString().padStart(3, '0')}` : '';
  }

  getStatPercentage(baseStat: number): number {
    return (baseStat / 255) * 100;
  }
}
