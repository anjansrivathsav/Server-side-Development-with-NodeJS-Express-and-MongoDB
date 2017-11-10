import { Component, OnInit, Inject } from '@angular/core';
import { Leaders } from '../shared/sdk/models';
import { LeadersApi } from '../shared/sdk/services';
import { flyInOut, expand } from '../animations/app.animation';
import { LoopBackConfig } from '../shared/sdk/';
import { API_VERSION } from '../shared/baseUrl';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders:Leaders[];
  errMess: string;

  constructor(private leaderservice: LeadersApi,
    @Inject('BaseURL') private BaseURL) { 
      LoopBackConfig.setBaseURL(BaseURL);
      LoopBackConfig.setApiVersion(API_VERSION);
    }

  ngOnInit() {
    this.leaderservice.find()
      .subscribe((leaders: Leaders[]) => this.leaders = leaders,
      errmess => this.errMess = <any>errmess);
  }

}