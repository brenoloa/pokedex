import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBarComponent {
  @Output() searchChange = new EventEmitter<string>();
  
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(term => {
      this.searchChange.emit(term);
    });

    // Delay de 3s e depois emite busca vazia para mostrar todos os Pokémons
    setTimeout(() => {
      this.searchChange.emit(' ');
      setTimeout(() => {
        this.searchChange.emit('');
      }, 100);
    }, 3000);
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchChange.emit('');
  }
}
