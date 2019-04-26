import { NgModule } from '@angular/core';

import { StrategyComponent } from './strategy.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StrategyRoutingModule
  ],
  declarations: [StrategyComponent]
})
export class StrategyModule { }
