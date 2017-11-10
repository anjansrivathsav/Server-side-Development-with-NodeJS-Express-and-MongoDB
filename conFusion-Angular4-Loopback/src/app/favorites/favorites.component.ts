import { Component, OnInit, Inject } from '@angular/core';
import { Favorite } from '../shared/sdk/models';
import { FavoriteApi } from '../shared/sdk/services';
import { flyInOut, expand } from '../animations/app.animation';
import { Customer, AccessToken } from '../shared/sdk/models';
import { CustomerApi } from '../shared/sdk/services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class FavoritesComponent implements OnInit {

  favorites: Favorite = undefined;
  customer: Customer = undefined;
  delete: boolean;
  errMess: string;

  constructor(private favoriteService: FavoriteApi,
    private authService: CustomerApi,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.customer = this.authService.getCachedCurrent();
    if (this.customer)
      this.authService.getFavorites(this.customer.id, {"include": ["dishes"]})
        .subscribe((favorites: Favorite) => { console.log(favorites); this.favorites = favorites },
          errmess => this.errMess = <any>errmess);
    else this.errMess = 'No User Logged in!';
  }

  deleteFavorite(id: string) {
    console.log("Deleting Favorite " + id);
    this.favoriteService.deleteById(id)
      .subscribe((favorites: Favorite) => { 
        this.authService.getFavorites(this.customer.id, {"include": ["dishes"]})        
        .subscribe((favorites: Favorite) => { console.log(favorites); this.favorites = favorites })
      },
        errmess => this.errMess = <any>errmess);
    this.delete = false;
  }

}
