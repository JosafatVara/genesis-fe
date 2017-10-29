import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MustBeAuthenticatedGuard } from './guards/must-be-authenticated-guard';
import { MustBeUnauthenticatedGuard } from './guards/must-be-unauthenticated-guard';
import { EnterpriseListResolver } from '../core/resolvers/enterprise-list-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule',
    canActivate: [
      MustBeUnauthenticatedGuard
    ]
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    canActivate: [ MustBeAuthenticatedGuard ],
    resolve: { enterprises: EnterpriseListResolver }
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
