import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '/login',
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: '/dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
