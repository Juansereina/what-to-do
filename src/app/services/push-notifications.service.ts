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
      if (firebaseSWs.length < 1) {
        return Promise.resolve(null);
      }
      return firebaseSWs[0].pushManager
        .getSubscription()
        .then(function(subscription) {
          const isSubscribed = !(subscription === null);
          if (isSubscribed) {
            return Promise.resolve(subscription);
          } else {
            return Promise.resolve(null);
          }
        });
    });
  }

  cancelPermission(): Promise<any> {
    const suscriptionPr = this.getSubscription();
    return suscriptionPr.then((pushS: PushSubscription) => {
      if (!pushS) {
        return Promise.resolve(null);
      }
      return pushS.unsubscribe();
    });
  }

  requestPermission() {
    return this.messaging.requestPermission().then(() => {
      return this.messaging.getToken();
    });
  }
}
