import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yur-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {
  strategyList: {
    title: string;
    describe: string;
    route: string;
    icon?: string;
  }[];
  constructor() {}

  ngOnInit() {
    this.initStrategyList();
  }

  private initStrategyList() {
    this.strategyList = [
      {
        title: '近幾日暴量的股票',
        describe: '近期爆量的股票，可能是機會也可能是逃命波，可以根據數據做簡易判別。',
        route: 'over-count'
      }
    ];
  }
}
