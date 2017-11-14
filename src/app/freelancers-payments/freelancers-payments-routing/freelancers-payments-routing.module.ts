import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { FreelancerPaymentListComponent } from "../freelancer-payment-list/freelancer-payment-list.component";
import { FreelancersPaymentsComponent } from "../freelancers-payments.component";

const routes: Routes = [
  {
    path: '',
    component: FreelancersPaymentsComponent,
    children: [
      {
        path: '',
        component: FreelancerPaymentListComponent,
        data: {
          inDashboard: true
        }
      }
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
export class FreelancersPaymentsRoutingModule { }
