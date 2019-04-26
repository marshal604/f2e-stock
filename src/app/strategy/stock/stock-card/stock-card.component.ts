import { Component, OnInit, Input } from '@angular/core';

import { StockTitle } from '@stock/stock.model';

@Component({
  selector: 'yur-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  @Input()
  stockTitle: StockTitle;
  @Input()
  widthRatio: number;
  @Input()
  margin: string;
  constructor() {}

  ngOnInit() {}
}
