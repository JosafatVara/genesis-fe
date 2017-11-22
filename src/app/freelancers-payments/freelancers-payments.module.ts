import { NgModule } from '@angular/core';

import { FreelancersPaymentsComponent } from './freelancers-payments.component';
import { FreelancerPaymentListComponent } from './freelancer-payment-list/freelancer-payment-list.component';
import { FreelancerPaymentDetailsComponent } from './freelancer-payment-details/freelancer-payment-details.component';
import { DialogFreelancerPaymentDetailsComponent } from './dialog-freelancer-payment-details/dialog-freelancer-payment-details.component';
import { SharedModule } from "../shared/shared.module";
import { FreelancersPaymentsRoutingModule } from "./freelancers-payments-routing/freelancers-payments-routing.module";

@NgModule({
  imports: [
    SharedModule,
    FreelancersPaymentsRoutingModule
  ],
  declarations: [FreelancersPaymentsComponent, FreelancerPaymentListComponent, FreelancerPaymentDetailsComponent, DialogFreelancerPaymentDetailsComponent],
  entryComponents: [
    DialogFreelancerPaymentDetailsComponent
  ]
})
export class FreelancersPaymentsModule { }
