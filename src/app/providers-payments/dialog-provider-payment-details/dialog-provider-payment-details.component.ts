import { Component, OnInit, Inject } from '@angular/core';
import { ProviderPayment } from '../../shared/models/provider-payment';
import { ProvidersPaymentsService } from '../../core/services/providers-payments.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '../../shared/components/base/base-component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gen-dialog-provider-payment-details',
  templateUrl: './dialog-provider-payment-details.component.html',
  styleUrls: ['./dialog-provider-payment-details.component.scss']
})
export class DialogProviderPaymentDetailsComponent extends BaseComponent implements OnInit {

  public mode: string;
  public providerPayment: ProviderPayment;

  constructor(private providersPayments: ProvidersPaymentsService, private dialogRef: MatDialogRef<DialogProviderPaymentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, freelancerPayment: ProviderPayment}) {
    super();
    this.mode = data.mode || 'read';
    this.providerPayment = data.mode == 'create'? new ProviderPayment() : data.freelancerPayment;
  }

  ngOnInit() {
  }

  onCrudComponentFinish(freelancerPayment: ProviderPayment){
    this.loadingOn();
    let observable: Observable<ProviderPayment>;
    switch(this.mode){
      case 'create':
        observable = this.providersPayments.create(freelancerPayment);
        break;
      case 'update':
        observable = this.providersPayments.update(freelancerPayment);
        break;
      default:
        observable = Observable.of(undefined);
    }
    observable.subscribe( e => {
      if(e!=undefined){
        this.dialogRef.close({cancelled:false});
      }else{

      }
    },err=>{this.loadingOff();},()=>{this.loadingOff()});
  }

}
