import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { IList } from './../structures/lists';
import * as firebase from 'firebase/app';

@Injectable()
export class ListService {
  public uid: string;
  public listsCollection: AngularFirestoreCollection<IList>;
  public lists;

  constructor(public afs: AngularFirestore, private auth: AuthService) {
    this.auth.getUser().subscribe(user => {
      this.uid = user.uid;
      if (this.uid) {
        this.setCollection();
      }
    });
  }
  setCollection() {
    this.listsCollection = this.afs
      .collection('users')
      .doc(this.uid)
      .collection<IList>('lists');

    this.lists = this.listsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IList;
          const id = a.payload.doc.id;
          console.log(data);
          return { id, ...data };
        })
      )
    );
  }

  add(list: IList): Promise<any> {
    if (!this.listsCollection) {
      throw Error(' Set a collection before trying to add a new document');
    }
    const createAt = firebase.firestore.FieldValue.serverTimestamp();
    list.createdAt = createAt;
    return this.listsCollection.add(list);
  }
}
