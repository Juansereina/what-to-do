import { Component, OnInit } from '@angular/core';
import { ListService } from './../services/list.service';
import {
  trigger,
  style,
  transition,
  animate,
  stagger,
  query
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('enterState', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            stagger(50, [
              animate(200, style({ transform: 'translateX(0)', opacity: 1 }))
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor(public listS: ListService) {}

  ngOnInit() {}
}
