import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'; // brings in app in typings
import 'firebase/messaging';

@Injectable()
export class PushNotificationsService {
  public messaging = firebase.messaging();

  getSubscription(): Promise<any> {
    if (!navigator) {
      return Promise.resolve(null);
    }
    return navigator.serviceWorker.getRegistrations().then(registrations => {
      const firebaseSWs = registrations.filter(
        sw => sw.active && sw.active.scriptURL.includes('firebase-messaging')
      );
      if (firebaseSWs.length < 1) { return Promise.resolve(null); }
      return firebaseSWs[0].pushManager.getSubscription();
    });
  }

  requestPermission() {
    return this.messaging.requestPermission().then(() => {
      return this.messaging.getToken();
    });
  }
}
