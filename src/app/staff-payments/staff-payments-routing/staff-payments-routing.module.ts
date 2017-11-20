import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from '../staff-payments.component';
import { StaffPaymentListComponent } from '../staff-payment-list/staff-payment-list.component';
import { SelectMonthResolver } from '../../core/resolvers/select-month-resolver';

const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent,
    children: [
      {
        path: '',
        component: StaffPaymentListComponent,
        data: {
          inDashboard: true
        },
        resolve: {
          // selectedMonth: SelectMonthResolver
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
export class StaffPaymentsRoutingModule { }
