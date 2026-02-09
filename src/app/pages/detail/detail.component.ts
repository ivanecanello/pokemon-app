import { Component, computed, inject, resource } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { EvolutionComponent } from '../evolution/evolution.component';
import { PokemonService } from '../../services/pokemon.service';

interface StatInfo {
  name: string;
  value: number;
  maxValue: number;
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule, EvolutionComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  // Inject dependencies using inject()
  private readonly route = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);
  private readonly location = inject(Location);

  // Convert route params to signal
  private readonly pokemonId = toSignal(
    this.route.params.pipe(
      map(params => parseInt(params['id'], 10))
    )
  );

  // Use resource API for data fetching
  readonly pokemonResource = resource({
    request: () => ({ id: this.pokemonId() }),
    loader: ({ request }) => firstValueFrom(this.pokemonService.getPokemonById(request.id))
  });

  // Computed values
  readonly pokemon = computed(() => this.pokemonResource.value());
  readonly isLoading = computed(() => this.pokemonResource.isLoading());

  // Computed stats array for template iteration
  readonly stats = computed<StatInfo[]>(() => {
    const pkmn = this.pokemon();
    if (!pkmn) return [];

    return [
      { name: 'HP', value: pkmn.hp, maxValue: 150 },
      { name: 'Attack', value: pkmn.attack, maxValue: 150 },
      { name: 'Defense', value: pkmn.defense, maxValue: 150 },
      { name: 'Sp. Atk', value: pkmn.spAtk, maxValue: 150 },
      { name: 'Sp. Def', value: pkmn.spDef, maxValue: 150 },
      { name: 'Speed', value: pkmn.speed, maxValue: 150 },
    ];
  });

  // Computed total stats
  readonly totalStats = computed(() => {
    const pkmn = this.pokemon();
    if (!pkmn) return 0;
    return pkmn.hp + pkmn.attack + pkmn.defense +
           pkmn.spAtk + pkmn.spDef + pkmn.speed;
  });

  /**
   * Navigate back to the previous page
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Calculate stat percentage for progress bar
   */
  getStatPercentage(value: number, maxValue: number): number {
    return (value / maxValue) * 100;
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
