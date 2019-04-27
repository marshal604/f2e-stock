import { Component, OnInit, Input } from '@angular/core';

import { StockTitleInput } from './stock-card.model';

@Component({
  selector: 'yur-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  @Input()
  stockTitle: StockTitleInput;
  @Input()
  widthRatio: number;
  @Input()
  margin: string;
  constructor() {}

  ngOnInit() {}
}
