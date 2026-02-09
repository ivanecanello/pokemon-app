import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EvolutionComponent } from '../evolution/evolution.component';
import { DetailFacade } from './detail.facade';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule, EvolutionComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [DetailFacade]
})
export class DetailComponent {
  // Inject the facade
  readonly facade = inject(DetailFacade);

  // Expose signals and methods from the facade for the template
  readonly pokemon = this.facade.pokemon;
  readonly isLoading = this.facade.isLoading;
  readonly stats = this.facade.stats;
  readonly totalStats = this.facade.totalStats;

  goBack(): void {
    this.facade.goBack();
  }

  getStatPercentage(value: number, maxValue: number): number {
    return this.facade.getStatPercentage(value, maxValue);
  }

  getStatColor(value: number): string {
    return this.facade.getStatColor(value);
  }
}
