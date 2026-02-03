import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { POKEMON_DATA } from '../constants/pokemon.constants';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllPokemon should return all pokemon', (done) => {
    service.getAllPokemon().subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(POKEMON_DATA);
      done();
    });
  });

  it('getPokemonById should return the correct pokemon or undefined', (done) => {
    service.getPokemonById(1).subscribe(p => {
      expect(p).toBeTruthy();
      expect(p?.id).toBe(1);
      service.getPokemonById(99999).subscribe(p2 => {
        expect(p2).toBeUndefined();
        done();
      });
    });
  });

  it('filterPokemon should filter by type and name', (done) => {
    service.filterPokemon({ type: 'Fire' }).subscribe(result => {
      expect(result.every(r => r.type.includes('Fire'))).toBeTrue();
      service.filterPokemon({ name: 'saur' }).subscribe(result2 => {
        expect(result2.every(r => r.name.toLowerCase().includes('saur'))).toBeTrue();
        done();
      });
    });
  });

  it('filterPokemon should support combined filters and return empty when none match', (done) => {
    service.filterPokemon({ type: 'Fire', name: 'bulba' }).subscribe(result => {
      // unlikely combination: Fire + bulba
      expect(Array.isArray(result)).toBeTrue();
      // ensure it produces an array (possibly empty)
      service.filterPokemon({ type: 'NonExistingType' }).subscribe(emptyRes => {
        expect(emptyRes.length).toBe(0);
        done();
      });
    });
  });
});

