
import { Component, OnInit, Inject } from '@angular/core';
import { LoopBackConfig } from '../shared/sdk/';
import { API_VERSION } from '../shared/baseUrl';
import { Dishes } from '../shared/sdk/models';
import { DishesApi } from '../shared/sdk/services';
import { Promotions } from '../shared/sdk/models';
import { PromotionsApi } from '../shared/sdk/services';
import { Leaders } from '../shared/sdk/models';
import { LeadersApi } from '../shared/sdk/services';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dishes = new Dishes();
  promotion: Promotions = new Promotions();
  leader: Leaders = new Leaders();
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  constructor(private dishservice: DishesApi,
    private promotionservice: PromotionsApi,
    private leaderservice: LeadersApi,
    @Inject('BaseURL') private BaseURL) { 
      LoopBackConfig.setBaseURL(BaseURL);
      LoopBackConfig.setApiVersion(API_VERSION);
    }

  ngOnInit() {
    this.dishservice.findOne({where: {featured: true}})
       .subscribe((dish: Dishes) => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess );
    this.promotionservice.findOne({where: {featured: true}})
      .subscribe((promotion: Promotions) => this.promotion = promotion,
        errmess => this.promoErrMess = <any>errmess );
    this.leaderservice.findOne({where: {featured: true}})
      .subscribe((leader: Leaders) => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess );
  }

}