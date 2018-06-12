import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}
  ngOnInit() {
    console.log(this.auth.getUser());
    
  }
  login() {
    this.auth.login();
  }
}
