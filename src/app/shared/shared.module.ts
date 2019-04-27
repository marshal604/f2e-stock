import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { TopBarComponent } from '@shared-layout/top-bar/top-bar.component';
import { SayHiComponent } from '@shared-animation/say-hi/say-hi.component';
import { DialogComponent } from '@shared-container/dialog/dialog.component';
import { BarChartComponent } from '@shared-chart/bar-chart/bar-chart.component';
import { StockCardComponent } from '@shared-container/stock-card/stock-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TopBarComponent,
    SayHiComponent,
    DialogComponent,
    BarChartComponent,
    StockCardComponent
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    CommonModule,
    MaterialModule,
    TopBarComponent,
    SayHiComponent,
    DialogComponent,
    BarChartComponent,
    StockCardComponent
  ]
})
export class SharedModule {}
