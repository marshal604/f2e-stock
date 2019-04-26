import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [AuthComponent]
})
export class AuthModule { }
