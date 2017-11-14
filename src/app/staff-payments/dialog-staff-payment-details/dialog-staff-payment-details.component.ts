import { Component, OnInit, Inject } from '@angular/core';
import { StaffPaymentsService } from '../../core/services/staff-payments.service';
import { StaffPayment } from '../../shared/models/staff-payment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '../../shared/components/base/base-component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gen-dialog-staff-payment-details',
  templateUrl: './dialog-staff-payment-details.component.html',
  styleUrls: ['./dialog-staff-payment-details.component.scss']
})
export class DialogStaffPaymentDetailsComponent extends BaseComponent implements OnInit {

  public mode: string
  public payment: StaffPayment;

  constructor(private payments: StaffPaymentsService, private dialogRef: MatDialogRef<DialogStaffPaymentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, payment: StaffPayment}) {
    super();
    this.mode = data.mode || 'read';
    this.payment = data.mode == 'create'? new StaffPayment() : data.payment;
  }

  ngOnInit() {
  }

  onCrudComponentFinish(payment: StaffPayment){
    this.loadingOn();
    let observable: Observable<StaffPayment>;
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
