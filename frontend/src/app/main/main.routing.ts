import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../common/guards/auth.guard';

import { MainComponent } from './main.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { UsersComponent } from '../users/users.component';
import { ContactsComponent } from '../contacts/contacts.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: DashboardComponent,
            data: {
              breadcrumb: ['BREADCRUMB.DASHBOARD']
            }
          },
          {
            path: 'profile',
            component: ProfileComponent,
            data: {
              breadcrumb: ['BREADCRUMB.PROFILE'],
              state: 'profile'
            }
          },
          {
            path: 'contacts',
            component: ContactsComponent,
            data: {
              breadcrumb: ['BREADCRUMB.CONTACTS'],
              state: 'contacts'
            }
          },
          {
            path: 'settings/users',
            component: UsersComponent,
            data: {
              breadcrumb: ['BREADCRUMB.SETTINGS', 'BREADCRUMB.USERS'],
              state: 'settings/users'
            }
          },
          {
            path: '**',
            component: DashboardComponent,
            data: {
              breadcrumb: ['BREADCRUMB.DASHBOARD']
            }
          }
        ]
      }
    ])
  ]
})
export class MainRouting { }
