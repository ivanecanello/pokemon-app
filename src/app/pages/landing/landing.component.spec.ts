import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LandingComponent } from './landing.component';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let mockService: Partial<PokemonService>;

  const sample: Pokemon[] = [
    { id: 1, name: 'Bulbasaur', type: ['Grass'], height: 7, weight: 69, description: '', imageUrl: '', hp: 45, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 45 },
    { id: 4, name: 'Charmander', type: ['Fire'], height: 6, weight: 85, description: '', imageUrl: '', hp: 39, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 65 }
  ];

  beforeEach(async () => {
    mockService = {
      getAllPokemon: () => of(sample),
      filterPokemon: (filters: any) => {
        const name = filters?.name?.toLowerCase();
        const type = filters?.type;
        const filtered = sample.filter(p => {
          const matchesType = !type || p.type.includes(type);
          const matchesName = !name || p.name.toLowerCase().includes(name);
          return matchesType && matchesName;
        });
        return of(filtered);
      }
    };

    await TestBed.configureTestingModule({
      imports: [LandingComponent, RouterTestingModule],
      providers: [{ provide: PokemonService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and filter pokemon on init', () => {
    expect(component.pokemon.length).toBe(2);
    component.selectedType = 'Fire';
    component.applyFilters();
    expect(component.filteredPokemon.every(p => p.type.includes('Fire'))).toBeTrue();
  });

  it('clearFilters should reset filters', () => {
    component.selectedType = 'Fire';
    component.searchName = 'char';
    component.clearFilters();
    expect(component.selectedType).toBe('');
    expect(component.searchName).toBe('');
  });

  it('should apply hp and speed filters', () => {
    component.minHp = 40;
    component.maxSpeed = 50;
    component.applyFilters();
    expect(component.filteredPokemon.every(p => p.hp >= 40 && p.speed <= 50)).toBeTrue();
  });

  it('should paginate results and navigate pages', () => {
    component.itemsPerPage = 1;
    component.applyFilters();
    expect(component.totalPages).toBeGreaterThanOrEqual(2);
    const firstPage = component.paginatedPokemon.slice();
    component.goToPage(2);
    expect(component.currentPage).toBe(2);
    expect(component.paginatedPokemon).not.toEqual(firstPage);
    // invalid page should be ignored
    component.goToPage(999);
    expect(component.currentPage).toBe(2);
  });

  it('extractTypes should populate unique types', () => {
    // call private method
    (component as any).extractTypes();
    expect(Array.isArray(component.types)).toBeTrue();
    expect(component.types.length).toBeGreaterThan(0);
  });
});
