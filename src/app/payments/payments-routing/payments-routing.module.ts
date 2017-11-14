import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from '../payments.component';
import { PaymentListComponent } from '../payment-list/payment-list.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent,
    children: [
      {
        path: '',
        component: PaymentListComponent,
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
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class PaymentsRoutingModule { }
