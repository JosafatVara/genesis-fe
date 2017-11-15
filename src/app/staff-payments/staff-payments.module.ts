import { NgModule } from '@angular/core';
import { PaymentsComponent } from './staff-payments.component';
import { StaffPaymentListComponent } from './staff-payment-list/staff-payment-list.component';
import { StaffPaymentDetailsComponent } from './staff-payment-details/staff-payment-details.component';
import { DialogStaffPaymentDetailsComponent } from './dialog-staff-payment-details/dialog-staff-payment-details.component';
import { StaffPaymentsRoutingModule } from './staff-payments-routing/staff-payments-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DialogStaffPaymentModifierComponent } from './dialog-staff-payment-modifier/dialog-staff-payment-modifier.component';

@NgModule({
  imports: [
    StaffPaymentsRoutingModule,
    SharedModule
  ],
  declarations: [PaymentsComponent, StaffPaymentListComponent, StaffPaymentDetailsComponent, DialogStaffPaymentDetailsComponent, DialogStaffPaymentModifierComponent],
  entryComponents: [
    DialogStaffPaymentDetailsComponent,
    DialogStaffPaymentModifierComponent
  ]
})
export class StaffPaymentsModule { }
