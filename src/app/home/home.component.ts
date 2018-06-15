import { Component, OnInit } from '@angular/core';
import { ListService } from './../services/list.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('enterState', [
      state(
        'void',
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        })
      ),
      transition(':enter', [
        animate(
          300,
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor(private listS: ListService) {}

  ngOnInit() {}
}
