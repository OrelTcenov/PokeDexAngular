import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private httpclient: HttpClient) {}

  getPokemons() {
    return this.httpclient.get<any>(
      `https://pokeapi.co/api/v2/pokemon?limit=151`
    );
  }

  getPokemonData(name: String) {
    return this.httpclient.get<any>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }

  getPokemonLocation(id: number) {
    return this.httpclient.get<any>(
      `https://pokeapi.co/api/v2/pokemon/${id}/encounters`
    );
  }

  getPokemonPreviousEvolution(id: number) {
    return this.httpclient.get<any>(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
  }

  getPokemonEvolutionChain(url) {
    return this.httpclient.get<any>(url);
  }
}
