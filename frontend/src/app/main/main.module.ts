import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { MainRouting } from './main.routing';

@NgModule({
  imports: [
    MainRouting,
    RouterModule
  ],
  declarations: [
    MainComponent
  ],
  providers: []
})
export class MainModule { }
