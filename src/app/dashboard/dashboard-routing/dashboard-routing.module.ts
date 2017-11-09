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
      {
        path: 'compras',
        loadChildren: 'app/purchases-products/purchases-products.module#PurchasesProductsModule'
      },
      {
        path: 'proveedores',
        loadChildren: 'app/providers/providers.module#ProvidersModule'
      },
      {
        path: 'personal',
        children: [
          {
            path: 'personal',
            loadChildren: 'app/staff/staff.module#StaffModule',
          },
          {
            path: 'independientes',
            loadChildren: 'app/freelancers/freelancers.module#FreelancersModule'
          },
          {
            path: 'pagos',
            loadChildren: 'app/payments/payments.module#PaymentsModule'
          }
        ]
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
