import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersPaymentsComponent } from '../providers-payments.component';
import { ProviderPaymentListComponent } from '../provider-payment-list/provider-payment-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProvidersPaymentsComponent,
    children: [
      {  
        path: '',
        component: ProviderPaymentListComponent,
        data: {
          inDashboard: true
        }
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ProvidersPaymentsRoutingModule { }
