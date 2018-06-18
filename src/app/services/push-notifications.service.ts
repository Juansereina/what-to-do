import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class PushNotificationsService {
    public messaging = firebase.messaging();
    requestPermission(): Promise<void> {
        return this.messaging.requestPermission();
    }
}
