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
  public token = false;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private pushS: PushNotificationsService
  ) {}

  ngOnInit() {
    this.pushS.getSubscription().then(console.log);
  }

  requestPushPermissions() {
    this.pushS.requestPermission().then(console.log).catch(console.log);
  }

  rejectPushPermissions() {}

  logout() {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(['/login']))
      .catch(console.log);
  }
}
