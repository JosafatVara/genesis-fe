import { NgModule } from '@angular/core';
import { ProviderPaymentListComponent } from './provider-payment-list/provider-payment-list.component';
import { ProviderPaymentDetailsComponent } from './provider-payment-details/provider-payment-details.component';
import { DialogProviderPaymentDetailsComponent } from './dialog-provider-payment-details/dialog-provider-payment-details.component';
import { ProvidersPaymentsComponent } from './providers-payments.component';
import { SharedModule } from '../shared/shared.module';
import { ProvidersPaymentsRoutingModule } from './providers-payments-routing/providers-payments-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProvidersPaymentsRoutingModule
  ],
  declarations: [ProviderPaymentListComponent, ProviderPaymentDetailsComponent, DialogProviderPaymentDetailsComponent, ProvidersPaymentsComponent],
  entryComponents: [
    DialogProviderPaymentDetailsComponent
  ]
})
export class ProvidersPaymentsModule { }
