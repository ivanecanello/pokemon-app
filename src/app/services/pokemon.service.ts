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
}
