import { Component, OnInit } from '@angular/core';
import { PokeService } from '../poke-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PokeDialogComponent } from '../poke-dialog/poke-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Pokemons = [];
  Favorites =
    localStorage.getItem('Favorites').length > 0
      ? JSON.parse(localStorage.getItem('Favorites'))
      : [];
  pageSlice;

  constructor(private PokeService: PokeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.PokeService.getPokemons().subscribe((response) => {
      response.results.forEach((result) => {
        this.PokeService.getPokemonData(result.name).subscribe(
          (data) => {
            this.Pokemons.push(this.checkFav(data));
            this.pageSlice = this.Pokemons.slice(0, 20);
          },
          (err) => {
            console.log(err);
          }
        );
      });
    });
  }

  checkFav(data) {
    for (var i = 0; i < this.Favorites.length; i++) {
      if (this.Favorites[i].id == data.id) {
        data.isSelected = true;
        return data;
      }
    }
    return data;
  }

  cardDetails(poke) {
    let dialogRef = this.dialog.open(PokeDialogComponent, {
      height: '800px',
      width: '600px',
    });

    dialogRef.componentInstance.PokeData = poke;
  }

  fav(poke) {
    poke.isSelected = !poke.isSelected;
    if (poke.isSelected) {
      if (this.Favorites.length < 6) {
        this.Favorites.push(poke);
      } else {
        alert('There are already 6 favorite Pokemon');
        poke.isSelected = !poke.isSelected;
      }
      localStorage.setItem('Favorites', JSON.stringify(this.Favorites));
    } else {
      var newFavData = [];
      for (var i = 0; i < this.Favorites.length; i++) {
        if (this.Favorites[i].id !== poke.id) {
          newFavData.push(this.Favorites[i]);
        }
      }
      this.Favorites = newFavData;
      localStorage.setItem('Favorites', JSON.stringify(this.Favorites));
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.Pokemons.length) {
      endIndex = this.Pokemons.length;
    }
    this.pageSlice = this.Pokemons.slice(startIndex, endIndex);
    window.scrollTo(0, 0);
  }
}
