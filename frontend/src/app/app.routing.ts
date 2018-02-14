import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]/*, { useHash: true }*/)
  ]
})
export class AppRoutingModule {}
