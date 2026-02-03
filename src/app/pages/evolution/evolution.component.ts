import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-evolution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnChanges {
  @Input() pokemonId?: number;
  chain: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonId'] && this.pokemonId) {
      this.loadChain(this.pokemonId);
    }
  }

  private loadChain(id: number): void {
    this.pokemonService.getEvolutionChain(id).subscribe(data => {
      this.chain = data;
    });
  }
}
