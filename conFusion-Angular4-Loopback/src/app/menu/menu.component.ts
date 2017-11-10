
import { Component, OnInit, Inject } from '@angular/core';
import { LoopBackConfig } from '../shared/sdk/';
import { API_VERSION } from '../shared/baseUrl';
import { Dishes } from '../shared/sdk/models';
import { DishesApi } from '../shared/sdk/services';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {
  dishes: Dishes[];
  errMess: string;

  constructor(private dishService: DishesApi,
    @Inject('BaseURL') private BaseURL) { 
      LoopBackConfig.setBaseURL(BaseURL);
      LoopBackConfig.setApiVersion(API_VERSION);
    }
  
  ngOnInit() {
    this.dishService.find()
      .subscribe((dishes: Dishes[]) => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

}