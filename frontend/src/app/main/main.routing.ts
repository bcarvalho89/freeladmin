import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../common/guards/auth.guard';

import { MainComponent } from './main.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'main',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
        ]
      }
    ])
  ]
})
export class MainRouting { }
