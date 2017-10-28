import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MustBeAuthenticatedGuard } from './guards/must-be-authenticated-guard';
import { MustBeUnauthenticatedGuard } from './guards/must-be-unauthenticated-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule',
    canActivate: [
      MustBeUnauthenticatedGuard
    ]
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    canActivate: [
      MustBeAuthenticatedGuard
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  providers: [
    MustBeAuthenticatedGuard,
    MustBeUnauthenticatedGuard
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
