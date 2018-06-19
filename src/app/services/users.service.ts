import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { filter, map, take } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { IUser } from '../structures/users';

@Injectable()
export class UserService {
  private users: AngularFirestoreCollection<IUser>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.users = afs.collection<IUser>('users');
  }
  add(user: IUser): Promise<void> {
    return this.users
      .doc(user.uid)
      .set(user)
      .catch(console.log);
  }

  getUser(): Observable<IUser> {
    return this.afAuth.authState.pipe(
      take(1),
      filter(user => !!user),
      map((user: firebase.User) => {
        return user as IUser;
      })
    );
  }

  addToken(token: string): Promise<any> {
    return new Promise((res, rej) => {
      this.getUser().subscribe(user => {
        this.saveToken(user, token).then(res).catch(rej);
      });
    });
  }

  saveToken(user: IUser, token: string): Promise<any> {
    const tokens = user.tokens || {};
    if (tokens[token]) { return Promise.resolve(); }
    tokens[token] = true;
    return this.users.doc(user.uid).update({tokens});
  }
}
