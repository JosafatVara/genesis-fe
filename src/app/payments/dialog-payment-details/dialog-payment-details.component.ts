import { Component, OnInit, Inject } from '@angular/core';
import { PaymentsService } from '../../core/services/payments.service';
import { Payment } from '../../shared/models/payment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '../../shared/components/base/base-component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gen-dialog-payment-details',
  templateUrl: './dialog-payment-details.component.html',
  styleUrls: ['./dialog-payment-details.component.scss']
})
export class DialogPaymentDetailsComponent extends BaseComponent implements OnInit {

  public mode: string
  public payment: Payment;

  constructor(private payments: PaymentsService, private dialogRef: MatDialogRef<DialogPaymentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, payment: Payment}) {
    super();
    this.mode = data.mode || 'read';
    this.payment = data.mode == 'create'? new Payment() : data.payment;
  }

  ngOnInit() {
  }

  onCrudComponentFinish(payment: Payment){
    this.loadingOn();
    let observable: Observable<Payment>;
    switch(this.mode){
      case 'create':
        observable = this.payments.create(payment);
        break;
      case 'update':
        observable = this.payments.update(payment);
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
