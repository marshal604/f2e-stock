import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { SayHiComponent } from './specail-effect/say-hi/say-hi.component';
import { DialogComponent } from './layout/dialog/dialog.component';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';

@NgModule({
  declarations: [TopBarComponent, SayHiComponent, DialogComponent, BarChartComponent],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    TopBarComponent,
    SayHiComponent,
    DialogComponent,
    BarChartComponent
  ]
})
export class SharedModule {}
