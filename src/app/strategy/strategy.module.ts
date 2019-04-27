import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { StrategyRoutingModule } from './strategy-routing.module';
import { StrategyComponent } from './strategy.component';
import { StockOverCountModule } from '@stock-over-count/stock-over-count.module';
@NgModule({
  imports: [SharedModule, StrategyRoutingModule, StockOverCountModule],
  declarations: [StrategyComponent]
})
export class StrategyModule {}
