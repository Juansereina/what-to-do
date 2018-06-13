import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { IList } from './../structures/lists';
import * as firebase from 'firebase/app';
import { create } from 'domain';

@Injectable()
export class ListService {
  public uid: string;
  public lists: AngularFirestoreCollection<IList>;

  constructor(public afs: AngularFirestore, private auth: AuthService) {
    this.auth.getUser().subscribe(user => {
      this.uid = user.uid;
      if (this.uid) {
        this.setCollection();
      }
    });
  }
  setCollection() {
    this.lists = this.afs
      .collection('users')
      .doc(this.uid)
      .collection<IList>('lists');
  }

  add(list: IList): Promise<any> {
    if (!this.lists) {
      throw Error(' Set a collection before trying to add a new document');
    }
    const createAt = firebase.firestore.FieldValue.serverTimestamp();
    list.createdAt = createAt;
    return this.lists.add(list);
  }
}
