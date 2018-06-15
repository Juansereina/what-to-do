import { Component, OnInit } from '@angular/core';
import { ListService } from './../services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor(private listS: ListService) {}

  ngOnInit() {}
}
