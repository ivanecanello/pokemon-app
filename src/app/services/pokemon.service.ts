import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { POKEMON_DATA } from '../constants/pokemon.constants';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonData: Pokemon[] = POKEMON_DATA;
  private selectedForCompare: number[] = [];

  constructor() { }

  /**
   * Get all Pokémon
   */
  getAllPokemon(): Observable<Pokemon[]> {
    return of(this.pokemonData);
  }

  /**
   * Get a Pokémon by ID
   */
  getPokemonById(id: number): Observable<Pokemon | undefined> {
    return of(this.pokemonData.find(p => p.id === id));
  }

  /**
   * Filter Pokémon by type and/or name
   */
  filterPokemon(filters: { type?: string; name?: string }): Observable<Pokemon[]> {
    return of(this.pokemonData).pipe(
      map(pokemon => 
        pokemon.filter(p => {
          const matchesType = !filters.type || p.type.includes(filters.type);
          const matchesName = !filters.name || p.name.toLowerCase().includes(filters.name.toLowerCase());
          return matchesType && matchesName;
        })
      )
    );
  }

  /**
   * Comparison selection helpers
   */
  addToCompare(id: number): void {
    if (!this.selectedForCompare.includes(id)) {
      this.selectedForCompare.push(id);
    }
  }

  removeFromCompare(id: number): void {
    this.selectedForCompare = this.selectedForCompare.filter(i => i !== id);
  }

  toggleCompare(id: number): void {
    if (this.selectedForCompare.includes(id)) {
      this.removeFromCompare(id);
    } else {
      this.addToCompare(id);
    }
  }

  getSelectedForCompare(): number[] {
    return [...this.selectedForCompare];
  }

  clearCompare(): void {
    this.selectedForCompare = [];
  }
}
