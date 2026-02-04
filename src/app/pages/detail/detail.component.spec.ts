import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DetailComponent } from './detail.component';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  const mockPokemon = { id: 1, name: 'Bulbasaur', type: ['Grass'], height: 7, weight: 69, description: '', imageUrl: '', hp: 45, attack: 49, defense: 49, spAtk: 65, spDef: 65, speed: 45 } as any;

  beforeEach(async () => {
    const mockService = {
      getPokemonById: (id: number) => of(id === 1 ? mockPokemon : undefined)
      ,
      getEvolutionChain: (id: number) => of([])
    };

    const mockRoute = {
      params: of({ id: '1' })
    };

    const mockLocation = { back: jasmine.createSpy('back') };

    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        { provide: PokemonService, useValue: mockService },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon and compute total stats', () => {
    expect(component.pokemon).toBeTruthy();
    const total = component.getTotalStats();
    expect(total).toBe(mockPokemon.hp + mockPokemon.attack + mockPokemon.defense + mockPokemon.spAtk + mockPokemon.spDef + mockPokemon.speed);
  });

  it('getStatColor returns expected colors', () => {
    expect(component.getStatColor(110)).toBe('#27ae60');
    expect(component.getStatColor(85)).toBe('#f39c12');
    expect(component.getStatColor(65)).toBe('#3498db');
    expect(component.getStatColor(45)).toBe('#e74c3c');
    expect(component.getStatColor(10)).toBe('#95a5a6');
  });

  it('goBack should call location.back', () => {
    const loc = TestBed.inject(Location) as any;
    component.goBack();
    expect(loc.back).toHaveBeenCalled();
  });
});
