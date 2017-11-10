
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { LoopBackConfig } from '../shared/sdk';
import { Customer, AccessToken } from '../shared/sdk/models';
import { CustomerApi } from '../shared/sdk/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  username: string = undefined;
  customer: Customer = undefined;
  subscription: Subscription;

  constructor(public dialog: MdDialog,
    private authService: CustomerApi ) { 
    }

  ngOnInit() {
    this.customer = this.authService.getCachedCurrent();
    console.log("Header ngonInit ", this.customer)
    if (this.customer)
      this.username = this.customer.username;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openLoginForm() {
    let loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'});

    loginRef.afterClosed()
      .subscribe(result => {
        console.log("Login result ", result);
        this.customer = this.authService.getCachedCurrent();
        console.log("After Login ", this.customer);
        if (this.customer)        
          this.username = this.customer.username;
      });
  }

  logOut() {
    this.username = undefined;
    this.customer = undefined;
    this.authService.logout();
    console.log("After logout ", this.authService.getCachedCurrent());
  }

}