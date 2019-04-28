import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { TopBarComponent } from '@shared-layout/top-bar/top-bar.component';
import { SayHiComponent } from '@shared-animation/say-hi/say-hi.component';
import { DialogComponent } from '@shared-container/dialog/dialog.component';
import { BarChartComponent } from '@shared-chart/bar-chart/bar-chart.component';
import { StockCardComponent } from '@shared-container/stock-card/stock-card.component';
import { StockInfoTableComponent } from '@shared-table/stock-info-table/stock-info-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TopBarComponent,
    SayHiComponent,
    DialogComponent,
    BarChartComponent,
    StockCardComponent,
    StockInfoTableComponent
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
    StockInfoTableComponent
  ]
})
export class SharedModule {}
