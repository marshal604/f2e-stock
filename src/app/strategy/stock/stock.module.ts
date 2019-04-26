import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { StockComponent } from './stock.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockRoutes } from './stock.routing';
import { StockCardComponent } from './stock-card/stock-card.component';
import { StockOverCountComponent } from './stock-over-count/stock-over-count.component';
import { StockOverCountListComponent } from './stock-over-count/stock-over-count-list/stock-over-count-list.component';
import { StockOverCountDetailComponent } from './stock-over-count/stock-over-count-detail/stock-over-count-detail.component';
import { PersonTradeTableComponent } from './stock-over-count/stock-over-count-detail/person-trade-table/person-trade-table.component';
import { StockInfoTableComponent } from './stock-over-count/stock-over-count-detail/stock-info-table/stock-info-table.component';
import { TradeCountChartComponent } from './stock-over-count/stock-over-count-detail/trade-count-chart/trade-count-chart.component';

@NgModule({
  imports: [SharedModule, StockRoutes],
  declarations: [
    StockComponent,
    StockListComponent,
    StockCardComponent,
    StockOverCountComponent,
    StockOverCountListComponent,
    StockOverCountDetailComponent,
    PersonTradeTableComponent,
    StockInfoTableComponent,
    TradeCountChartComponent
  ]
})
export class StockModule {}
