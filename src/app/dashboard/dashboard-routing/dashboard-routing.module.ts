import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { EnterpriseListResolver } from '../../core/resolvers/enterprise-list-resolver';
import { RoleGuard } from '../../core/guards/role-guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'usuarios',
        loadChildren: 'app/users/users.module#UsersModule',
        canActivate: [
          RoleGuard
        ],
        data: {
          disabledFor: ['ventas', 'contabilidad']
        }
      },
      {
        path: 'empresas',
        loadChildren: 'app/enterprises/enterprises.module#EnterprisesModule',
        canActivate: [
          RoleGuard
        ],
        data: {
          disabledFor: ['ventas', 'contabilidad']
        }
      },
      {
        path: 'panel-de-control',
        loadChildren: 'app/control-panel/control-panel.module#ControlPanelModule',
        canActivate: [
          RoleGuard
        ],
        data: {
          disabledFor: ['ventas', 'contabilidad']
        }
      },
      // {
      //   path: 'compras',
      //   loadChildren: 'app/purchases-products/purchases-products.module#PurchasesProductsModule'
      // },
      {
        path: 'grupos',
        loadChildren: 'app/groups/groups.module#GroupsModule',
        canActivate: [
          RoleGuard
        ],
        data: {
          disabledFor: ['ventas', 'contabilidad']
        }
      },
      {
        path: 'proveedores',
        loadChildren: 'app/providers/providers.module#ProvidersModule',
        canActivate: [
          RoleGuard
        ],
        data: {
          disabledFor: ['ventas', 'contabilidad']
        }
      },
      {
        path: 'personal',
        canActivate: [
          RoleGuard
        ],
        children: [
          {
            path: 'planillas',
            loadChildren: 'app/staff/staff.module#StaffModule',
          },
          {
            path: 'RxH',
            loadChildren: 'app/freelancers/freelancers.module#FreelancersModule'
          }
        ],
        data: {
          disabledFor: ['ventas', 'contabilidad']
        }
      },
      {
        path: 'pagos',
        canActivate: [
          RoleGuard
        ],
        children: [
          {
            path: 'planillas',
            loadChildren: 'app/staff-payments/staff-payments.module#StaffPaymentsModule'
          },
          {
            path: 'rxh',
            loadChildren: 'app/freelancers-payments/freelancers-payments.module#FreelancersPaymentsModule'
          }
        ],
        data: {
          disabledFor: ['ventas', 'contabilidad']
        }
      },
      {
        path: 'cotizaciones',
        canActivate: [
          RoleGuard
        ],
        loadChildren: 'app/quotations/quotations.module#QuotationsModule',
        data: {
          disabledFor: ['contabilidad']
        }
      },
      {
        path: 'clientes',
        //   loadChildren: 'app/customers/customers.module#CustomersModule'
        // }
        // ,
        // {
        //   path: 'ordenes',
        //   loadChildren: 'app/orders/orders.module#OrdersModule'
        // }
        // ,
        // {
        //   path: 'informes',
        //   loadChildren: 'app/reports/reports.module#ReportsModule'
        canActivate: [
          RoleGuard
        ],
        loadChildren: 'app/customers/customers.module#CustomersModule',
        data: {
          disabledFor: ['ventas', 'contabilidad']
        }
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
