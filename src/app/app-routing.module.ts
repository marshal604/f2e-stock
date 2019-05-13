import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from '@shared-container/detail/detail.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: '@dashboard/dashboard.module#DashboardModule' },
  { path: 'strategy', loadChildren: '@strategy/strategy.module#StrategyModule' },
  { path: 'detail/:id', component: DetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
