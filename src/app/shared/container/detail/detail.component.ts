import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { StockInfoService } from '@core/services/stock-info.service';

@Component({
  selector: 'yur-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  title: string;
  code: string;

  constructor(private stockInfoService: StockInfoService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.code = this.route.snapshot.params['id'];
    this.initTitle();
  }

  private initTitle() {
    this.stockInfoService
      .getStockName({ code: this.code })
      .toPromise()
      .then(data => (this.title = data.name));
  }
}
