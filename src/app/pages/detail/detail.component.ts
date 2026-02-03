import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  pokemon: Pokemon | undefined;
  isLoading: true | false = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id'], 10);
      this.loadPokemon(id);
    });
  }

  /**
   * Load a single Pokémon by ID
   */
  private loadPokemon(id: number): void {
    this.isLoading = true;
    this.pokemonService.getPokemonById(id).subscribe(data => {
      this.pokemon = data;
      this.isLoading = false;
    });
  }

  /**
   * Navigate back to the previous page
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Calculate the total of all stats
   */
  getTotalStats(): number {
    if (!this.pokemon) return 0;
    return this.pokemon.hp + this.pokemon.attack + this.pokemon.defense + 
           this.pokemon.spAtk + this.pokemon.spDef + this.pokemon.speed;
  }

  /**
   * Get the background color for stat bars
   */
  getStatColor(value: number): string {
    if (value >= 100) return '#27ae60';
    if (value >= 80) return '#f39c12';
    if (value >= 60) return '#3498db';
    if (value >= 40) return '#e74c3c';
    return '#95a5a6';
  }
}
