import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { Customer, AccessToken } from '../shared/sdk/models';
import { CustomerApi } from '../shared/sdk/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  errMess: string;

  constructor(public dialogRef: MdDialogRef<LoginComponent>,
    private authService: CustomerApi) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("User: ", this.user);
    this.authService.login({username: this.user.username, password: this.user.password}, 'User', this.user.remember)
      .subscribe(res => {
        if (res.user) {
          this.dialogRef.close(res.user);          
        }
        else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMess = error
      })
  }

}