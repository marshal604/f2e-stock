import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { StockOverCountPersonTrade } from '@stock-over-count/stock-over-count.model';

@Component({
  selector: 'yur-person-trade-table',
  templateUrl: './person-trade-table.component.html',
  styleUrls: ['./person-trade-table.component.scss']
})
export class PersonTradeTableComponent implements OnInit {
  @Input()
  dataSource: StockOverCountPersonTrade[];
  personTradeDataSource: MatTableDataSource<StockOverCountPersonTrade>;
  personTradeHeader = ['date', 'buyBalance', 'sellBalance'];
  constructor() {}

  ngOnInit() {
    this.personTradeDataSource = new MatTableDataSource(this.dataSource);
  }

  mappingPersonTradeHeader(header: string) {
    const mapping = {
      date: '日期',
      buyBalance: '資買餘額',
      sellBalance: '券賣餘額'
    };
    return mapping[header];
  }
}
