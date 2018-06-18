import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'; // brings in app in typings
import 'firebase/messaging';

@Injectable()
export class PushNotificationsService {
  public messaging = firebase.messaging();
  requestPermission() {
    return this.messaging
      .requestPermission()
      .then(() => {
        return this.messaging.getToken();
      });
  }
}
