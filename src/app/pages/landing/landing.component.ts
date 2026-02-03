import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  pokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  paginatedPokemon: Pokemon[] = [];
  selectedType: string = '';
  searchName: string = '';
  minHp: number = 0;
  maxSpeed: number = 150;
  types: string[] = [];
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemon();
    this.extractTypes();
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
  private extractTypes(): void {
    const allTypes = new Set<string>();
    this.pokemon.forEach(p => {
      p.type.forEach(t => allTypes.add(t));
    });
    this.types = Array.from(allTypes).sort();
  }

  /**
   * Apply filters to the Pokémon list
   */
  applyFilters(): void {
    const filters = {
      type: this.selectedType || undefined,
      name: this.searchName || undefined
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
    this.searchName = '';
    this.minHp = 0;
    this.maxSpeed = 150;
    this.applyFilters();
  }
}
