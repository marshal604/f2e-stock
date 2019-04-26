import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockOverCountComponent } from './stock-over-count/stock-over-count.component';
import { StockOverCountListComponent } from './stock-over-count/stock-over-count-list/stock-over-count-list.component';
import { StockOverCountDetailComponent } from './stock-over-count/stock-over-count-detail/stock-over-count-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '',
    component: StockComponent,
    children: [
      { path: 'list', component: StockListComponent },
      {
        path: 'over-count',
        component: StockOverCountComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'list' },
          { path: 'list', component: StockOverCountListComponent },
          { path: ':id', component: StockOverCountDetailComponent }
        ]
      }
    ]
  }
];

export const StockRoutes = RouterModule.forChild(routes);
