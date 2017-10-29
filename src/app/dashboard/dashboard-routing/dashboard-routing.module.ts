import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { EnterpriseListResolver } from '../../core/resolvers/enterprise-list-resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'usuarios',
        loadChildren: 'app/users/users.module#UsersModule'
      },{
        path: 'empresas',
        loadChildren: 'app/enterprises/enterprises.module#EnterprisesModule'
      }
    ]
  }
]

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
