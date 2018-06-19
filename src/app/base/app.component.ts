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
  public showPanel = false;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public pushS: PushNotificationsService
  ) {}
  ngOnInit() {
    this.token = this.pushS.getSubscription();
    this.pushS.watchMessage();
  }

  requestPushPermissions() {
    this.token = this.pushS
      .requestPermission()
      .then(() => {
        this.toggleNotificationsWindow();
        return this.pushS.getSubscription();
      });
  }

  cancelPermission() {
    this.token = this.pushS
      .cancelPermission()
      .then(() => {
        this.toggleNotificationsWindow();
        return this.pushS.getSubscription();
      });
  }

  toggleNotificationsWindow() {
    this.showPanel = !this.showPanel;
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(['/login']))
      .catch(console.log);
  }
}
