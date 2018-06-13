import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { IUser } from '../structures/users';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { UserService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private userS: UserService) {}
  getUser(): Observable<IUser> {
    return this.afAuth.authState.pipe(
      take(1),
      filter(user => !!user),
      map((user: firebase.User) => {
        return user as IUser;
      })
    );
  }
  login(): Promise<void> {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        return this.userS.add({
          uid: result.user.uid,
          email: result.user.email
        });
      })
      .catch(console.log);
  }
}
