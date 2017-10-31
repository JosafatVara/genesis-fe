import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "../dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'panel-de-control',
        loadChildren: 'app/control-panel/control-panel.module#ControlPanelModule'
      },
      // {
      //   path: 'ventas',
      //   loadChildren: 'app/purchases-products/purchases-products.module#PurchasesProductsModule'
      // },
      {

        path: 'compras',
        loadChildren: 'app/purchases-products/purchases-products.module#PurchasesProductsModule'
      },
      {
        path: 'proveedores',
        loadChildren: 'app/providers/providers.module#ProvidersModule'
      },
   
    ]
  }
];

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
