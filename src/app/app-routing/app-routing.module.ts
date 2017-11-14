import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MustBeAuthenticatedGuard } from './guards/must-be-authenticated-guard';
import { MustBeUnauthenticatedGuard } from './guards/must-be-unauthenticated-guard';
import { EnterpriseListResolver } from '../core/resolvers/enterprise-list-resolver';
import { MustRecoverMeGuard } from './guards/must-recover-me-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',    
    resolve: { enterprises: EnterpriseListResolver }
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
    canActivate: [ MustBeAuthenticatedGuard, MustRecoverMeGuard ],
    resolve: { enterprises: EnterpriseListResolver }
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  providers: [
    MustBeAuthenticatedGuard,
    MustBeUnauthenticatedGuard,
    MustRecoverMeGuard
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
