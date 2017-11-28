import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MustBeAuthenticatedGuard } from './guards/must-be-authenticated-guard';
import { MustBeUnauthenticatedOrSelectEnterpriseRequiredGuard } from './guards/must-be-unauthenticated-or-select-enterprise-required-guard';
import { EnterpriseListResolver } from '../core/resolvers/enterprise-list-resolver';
import { MustHaveEnterprisesAndMustBeManagingAnEnterprise } from "./guards/must-have-enterprises-and-must-be-managing-an-enterprise-guard";
import { CurrentUserResolver } from "../core/resolvers/current-user-resolver";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: 'app/authentication/authentication.module#AuthenticationModule',
    canActivate: [
      MustBeUnauthenticatedOrSelectEnterpriseRequiredGuard
    ],
    data: { animation : 'authentication' }
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    canActivate: [ 
      MustBeAuthenticatedGuard,
    ],
    resolve: { 
      currentUser: CurrentUserResolver
    },
    data: { animation : 'dashboard' }
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
    MustBeUnauthenticatedOrSelectEnterpriseRequiredGuard,
    MustHaveEnterprisesAndMustBeManagingAnEnterprise
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
