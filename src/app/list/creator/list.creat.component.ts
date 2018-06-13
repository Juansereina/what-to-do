import { Component, OnInit } from '@angular/core';

import { IList } from './../../structures/lists';
import { ListService } from './../../services/list.service';

@Component({
  selector: 'creator',
  templateUrl: './list.creator.component.html'
})
export class ListCreatorComponent implements OnInit {
  public list: IList = { title: '' };

  constructor(private listS: ListService) {}
  ngOnInit() {}
  save() {
    this.listS.add(this.list).then(() => {
      this.list.title = '';
    });
  }
}
