import { NgModule } from '@angular/core';
import { PaymentsComponent } from './payments.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { DialogPaymentDetailsComponent } from './dialog-payment-details/dialog-payment-details.component';
import { PaymentsRoutingModule } from './payments-routing/payments-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    PaymentsRoutingModule,
    SharedModule
  ],
  declarations: [PaymentsComponent, PaymentListComponent, PaymentDetailsComponent, DialogPaymentDetailsComponent],
  entryComponents: [
    DialogPaymentDetailsComponent
  ]
})
export class PaymentsModule { }
