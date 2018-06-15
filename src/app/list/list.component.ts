import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  public listId: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.listId = this.route.snapshot.params.id;
  }
}
