import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { PushNotificationsService } from '../services/push-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  public token: any;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private pushS: PushNotificationsService
  ) {}
  ngOnInit() {
    this.token = this.pushS.getSubscription();
  }

  requestPushPermissions() {
    this.token = this.pushS
      .requestPermission()
      .then(() => this.pushS.getSubscription());
  }

  cancelPermission() {
    this.token = this.pushS
      .cancelPermission()
      .then(() => this.pushS.getSubscription());
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(['/login']))
      .catch(console.log);
  }
}
