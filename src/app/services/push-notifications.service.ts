import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { Subject } from 'rxjs';
import { UserService } from './users.service';

@Injectable()
export class PushNotificationsService {
  public messaging = firebase.messaging();
  public sub = new Subject();
  public notification = this.sub.asObservable();

  constructor( private uS: UserService) {}

  watchMessage() {
    this.messaging.onMessage(notify => {
      console.log(notify);
      this.sub.next(notify);
    });
  }
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
    }).then(token => {
      return this.uS.addToken(token);
    });
  }
}
