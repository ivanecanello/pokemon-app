import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent {
  selected: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {
    this.loadSelected();
  }

  private loadSelected(): void {
    const ids = this.pokemonService.getSelectedForCompare();
    this.selected = ids.map(id => this.pokemonService.getPokemonById(id)).map(obs => null as any).filter(Boolean);
    // Above is placeholder: fetch synchronously from data
    // Replace with direct access to constant for simplicity
    this.selected = ids.map(id => (this.pokemonService as any).pokemonData.find((p: Pokemon) => p.id === id)).filter(Boolean);
  }

  clearComparison(): void {
    this.pokemonService.clearCompare();
    this.selected = [];
  }
}
