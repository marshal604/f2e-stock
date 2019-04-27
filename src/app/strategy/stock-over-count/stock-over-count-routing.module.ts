import { Routes, RouterModule } from '@angular/router';

import { StockOverCountListComponent } from './stock-over-count-list/stock-over-count-list.component';
import { StockOverCountDetailComponent } from './stock-over-count-detail/stock-over-count-detail.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: StockOverCountListComponent },
  { path: ':id', component: StockOverCountDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockOverCountRoutingModule {}
