import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from 'angularfire2/firestore';

import { ITodo } from '../structures/todos';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class TodoService {
  private collection: AngularFirestoreCollection<ITodo>;
  private listId: string;
  private ref: Observable<DocumentChangeAction<ITodo>[]>;

  constructor(private afs: AngularFirestore) {}

  setCollection(listId: string) {
    this.listId = listId;
    this.collection = this.afs
      .collection('lists')
      .doc(listId)
      .collection('todos');
    this.ref = this.collection.snapshotChanges();
  }

  getFromList(listId: string): Observable<ITodo[]> {
    if (!this.collection || this.listId !== listId) {
      this.setCollection(listId);
    }
    return this.ref.pipe(
      map(actions => {
        return actions.map(item => {
          const data = item.payload.doc.data() as ITodo;
          const id = item.payload.doc.id;
          return { ...data, id };
        });
      })
    );
  }
  add(listId: string, todo: ITodo): Promise<any> {
    if (!this.collection || this.listId !== listId) {
      this.setCollection(listId);
    }
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    todo.createdAt = createdAt;
    return this.collection.add(todo);
  }
  update(listId: string, todo: ITodo): Promise<void> {
    if (!this.collection || this.listId !== listId) {
      this.setCollection(listId);
    }

    return this.collection.doc(todo.id).update({ status: todo.status });
  }
}
