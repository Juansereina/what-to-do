import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { IUser } from '../structures/users';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}
  getUser(): Observable<IUser> {


    return this.afAuth.authState.pipe(
      take(1),
      filter(user => !!user),
      map((user: firebase.User) => {
        console.log('result: ', user);
        return user as IUser;
      })
    );
  }
  login(): Promise<void> {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(console.log)
      .catch(console.log);
  }
}
