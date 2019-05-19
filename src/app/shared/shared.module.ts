import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { TopBarComponent } from '@shared-layout/top-bar/top-bar.component';
import { SayHiComponent } from '@shared-animation/say-hi/say-hi.component';
import { BarChartComponent } from '@shared-chart/bar-chart/bar-chart.component';
import { StockInfoChartComponent } from '@shared-chart/stock-info-chart/stock-info-chart.component';
import { DialogComponent } from '@shared-container/dialog/dialog.component';
import { StockCardComponent } from '@shared-container/stock-card/stock-card.component';
import { DetailComponent } from '@shared-container/detail/detail.component';
import { StockInfoTableComponent } from '@shared-table/stock-info-table/stock-info-table.component';
import { StockCreditTradeTableComponent } from '@shared-table/stock-credit-trade-table/stock-credit-trade-table.component';
import { MarketCreditTradeTableComponent } from '@shared-table/market-credit-trade-table/market-credit-trade-table.component';
import { InvestorIntegrateTableComponent } from '@shared-table/investor-integrate-table/investor-integrate-table.component';
import { StockUnitPipe } from '@shared-pipe/unit.pipe';
import { StockRouterDirective } from '@shared-directive/stock-router.directive';

@NgModule({
  declarations: [
    TopBarComponent,
    SayHiComponent,
    DialogComponent,
    BarChartComponent,
    StockCardComponent,
    StockInfoTableComponent,
    StockCreditTradeTableComponent,
    MarketCreditTradeTableComponent,
    InvestorIntegrateTableComponent,
    StockUnitPipe,
    StockInfoChartComponent,
    DetailComponent,
    StockRouterDirective
  ],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  exports: [
    CommonModule,
    MaterialModule,
    TopBarComponent,
    SayHiComponent,
    DialogComponent,
    BarChartComponent,
    StockCardComponent,
    StockInfoTableComponent,
    StockCreditTradeTableComponent,
    MarketCreditTradeTableComponent,
    InvestorIntegrateTableComponent,
    StockUnitPipe,
    StockInfoChartComponent,
    DetailComponent,
    StockRouterDirective
  ]
})
export class SharedModule {}
