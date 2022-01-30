import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PokemonAngular';
  audio = new Audio();
  playM = false;

  ngOnInit(): void {
    this.audio.src = '../assets/PokemonSong.mp3';
    this.audio.load();
  }

  pause() {
    this.playM = false;
    this.audio.pause();
  }

  play() {
    this.playM = true;
    this.audio.play();
  }
}
