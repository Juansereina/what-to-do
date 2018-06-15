import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { ITodo } from '../structures/todos';

import * as firebase from 'firebase/app';
@Injectable()
export class TodoService {
  private collection: AngularFirestoreCollection<ITodo>;
  private listId: string;

  constructor(private afs: AngularFirestore) {}

  setCollection(listId: string) {
    this.listId = listId;
    this.collection = this.afs
      .collection('lists')
      .doc(listId)
      .collection('todos');
  }
  add(listId: string, todo: ITodo): Promise<any> {
    if (!this.collection || this.listId !== listId) {
      this.setCollection(listId);
    }
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    todo.createdAt = createdAt;
    return this.collection.add(todo);
  }
}
