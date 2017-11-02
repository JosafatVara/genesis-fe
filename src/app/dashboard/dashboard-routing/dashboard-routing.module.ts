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
      }, 
      {
        path: 'empresas',
        loadChildren: 'app/enterprises/enterprises.module#EnterprisesModule'
      }, 
      {
        path: 'panel-de-control',
        loadChildren: 'app/control-panel/control-panel.module#ControlPanelModule'
      },
      // {
      //   path: 'compras',
      //   loadChildren: 'app/purchases-products/purchases-products.module#PurchasesProductsModule'
      // },
      {
        path: 'grupos',
        loadChildren: 'app/groups/groups.module#GroupsModule'
      },
      {
        path: 'proveedores',
        loadChildren: 'app/providers/providers.module#ProvidersModule'
      },

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
