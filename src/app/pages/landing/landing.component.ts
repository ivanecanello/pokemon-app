import {Component, computed, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Pokemon} from '../../models/pokemon.model';
import {PokemonService} from '../../services/pokemon.service';
import {debounceTime, distinctUntilChanged, tap} from "rxjs";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  pokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  paginatedPokemon: Pokemon[] = [];
  selectedType: string = '';
  searchName = new FormControl('')
  minHp: number = 0;
  maxSpeed: number = 150;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemon();
    this.searchName.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        tap(() => this.applyFilters())
      ).subscribe();
  }

  /**
   * Load all Pokémon from the service
   */
  private loadPokemon(): void {
    this.pokemonService.getAllPokemon().subscribe(data => {
      this.pokemon = data;
      this.filteredPokemon = data;
      this.applyFilters();
    });
  }

  /**
   * Extract unique types from Pokémon data
   */
  types = computed(() => {
      const allTypes = new Set<string>();
      this.pokemon.forEach(p => {
        p.type.forEach(t => allTypes.add(t));
      });
      return Array.from(allTypes).sort()
    }
  )

  /**
   * Apply filters to the Pokémon list
   */
  applyFilters(): void {
    const filters = {
      type: this.selectedType || undefined,
      name: this.searchName.value || undefined
    };

    this.pokemonService.filterPokemon(filters).subscribe(data => {
      this.filteredPokemon = data.filter(p => p.hp >= this.minHp && p.speed <= this.maxSpeed);
      this.currentPage = 1;
      this.updatePagination();
    });
  }

  /**
   * Update pagination
   */
  private updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPokemon.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPokemon = this.filteredPokemon.slice(startIndex, endIndex);
  }

  /**
   * Go to page
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  /**
   * Get page numbers for pagination
   */
  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.selectedType = '';
    this.searchName.setValue('');
    this.minHp = 0;
    this.maxSpeed = 150;
    this.applyFilters();
  }

  // Comparison helpers used by template
  toggleCompare(ev: Event, id: number): void {
    ev.stopPropagation();
    this.pokemonService.toggleCompare(id);
  }

  isSelectedForCompare(id: number): boolean {
    return this.pokemonService.getSelectedForCompare().includes(id);
  }

  getCompareCount(): number {
    return this.pokemonService.getSelectedForCompare().length;
  }
}
