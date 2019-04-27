import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StrategyComponent } from './strategy.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: StrategyComponent },
  {
    path: 'over-count',
    loadChildren: '@stock-over-count/stock-over-count.module#StockOverCountModule'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyRoutingModule {}
