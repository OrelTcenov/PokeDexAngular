import { Component, OnInit } from '@angular/core';
import { PokeService } from '../poke-service.service';

@Component({
  selector: 'app-poke-dialog',
  templateUrl: './poke-dialog.component.html',
  styleUrls: ['./poke-dialog.component.css'],
})
export class PokeDialogComponent implements OnInit {
  PokeData;
  locations = [];
  evolvesFrom;
  evolvesData = [];
  evolutionChain = [];
  evoData;
  moves = [];
  games = [];
  audio = new Audio();

  constructor(private PokeService: PokeService) {}

  ngOnInit(): void {
    this.evolvesData = [];
    this.evolutionChain = [];
    this.playVoice(this.PokeData.name);
    this.moves = this.listToMatrix(this.PokeData.moves, 4);
    this.games = this.listToMatrix(this.PokeData.game_indices, 4);

    this.PokeService.getPokemonLocation(this.PokeData.id).subscribe(
      (data) => {
        this.locations = data;
        this.locations = this.listToMatrix(this.locations, 3);
      },
      (err) => {
        console.log(err);
      }
    );

    this.PokeService.getPokemonPreviousEvolution(this.PokeData.id).subscribe(
      (data) => {
        if (data.evolves_from_species !== null) {
          this.evolvesFrom = data.evolves_from_species.name;
        }
        this.PokeService.getPokemonEvolutionChain(
          data.evolution_chain.url
        ).subscribe(
          (response) => {
            this.evoData = response.chain;
            do {
              this.evolutionChain.push(this.evoData.species.name);
              this.evoData = this.evoData['evolves_to'][0];
            } while (
              !!this.evoData &&
              this.evoData.hasOwnProperty('evolves_to')
            );
            this.getData();
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  playVoice(name) {
    this.audio.src = `../../assets/Pokemon/${name}.wav`;
    this.audio.load();
    this.audio.play();
  }

  async call(name) {
    this.evolvesData.push(
      await this.PokeService.getPokemonData(name).toPromise()
    );
  }

  async getData() {
    for (const i of this.evolutionChain) {
      await this.call(i);
    }
  }

  cardDetails(poke) {
    this.PokeData = poke;
    this.ngOnInit();
  }

  listToMatrix(list, elementsPerSubArray) {
    var matrix = [],
      i,
      k;
    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }
      matrix[k].push(list[i]);
    }
    return matrix;
  }
}
