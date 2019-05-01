import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { StockOverCountComponent } from '@stock-over-count/stock-over-count.component';
import { StockOverCountListComponent } from '@stock-over-count/stock-over-count-list/stock-over-count-list.component';
import { StockOverCountDetailComponent } from '@stock-over-count/stock-over-count-detail/stock-over-count-detail.component';
import { TradeCountChartComponent } from '@stock-over-count/stock-over-count-detail/trade-count-chart/trade-count-chart.component';
import { StockOverCountRoutingModule } from './stock-over-count-routing.module';

@NgModule({
  imports: [SharedModule, StockOverCountRoutingModule],
  declarations: [
    StockOverCountComponent,
    StockOverCountListComponent,
    StockOverCountDetailComponent,
    TradeCountChartComponent
  ]
})
export class StockOverCountModule {}
