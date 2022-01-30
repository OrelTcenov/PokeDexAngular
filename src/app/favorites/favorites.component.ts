import { Component, OnInit } from '@angular/core';
import { PokeDialogComponent } from '../poke-dialog/poke-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  fav =
    localStorage.getItem('Favorites').length > 0
      ? JSON.parse(localStorage.getItem('Favorites'))
      : [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  unFav(poke) {
    poke.isSelected = !poke.isSelected;
    var newFavData = [];
    for (var i = 0; i < this.fav.length; i++) {
      if (this.fav[i].id !== poke.id) {
        newFavData.push(this.fav[i]);
      }
    }
    localStorage.setItem('Favorites', JSON.stringify(newFavData));
    this.fav =
      localStorage.getItem('Favorites').length > 0
        ? JSON.parse(localStorage.getItem('Favorites'))
        : [];
  }

  cardDetails(poke) {
    let dialogRef = this.dialog.open(PokeDialogComponent, {
      height: '800px',
      width: '600px',
    });
    dialogRef.componentInstance.PokeData = poke;
  }
}
