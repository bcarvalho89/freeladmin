import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../common/guards/auth.guard';

import { MainComponent } from './main.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfileComponent } from '../profile/profile.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'main',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: DashboardComponent,
            data: {
              breadcrumb: 'BREADCRUMB.DASHBOARD'
            }
          },
          {
            path: 'profile',
            component: ProfileComponent,
            data: {
              breadcrumb: 'BREADCRUMB.PROFILE'
            }
          },
          {
            path: '**',
            component: DashboardComponent,
            data: {
              breadcrumb: 'BREADCRUMB.DASHBOARD'
            }
          }
        ]
      }
    ])
  ]
})
export class MainRouting { }
