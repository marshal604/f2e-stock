import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dasboard-routing.module';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
