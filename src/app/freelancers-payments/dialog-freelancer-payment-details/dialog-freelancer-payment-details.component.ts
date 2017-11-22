import { Component, OnInit, Inject } from '@angular/core';
import { FreelancersPaymentsService } from "../../core/services/freelancers-payments.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FreelancerPayment } from "../../shared/models/freelancer-payment";
import { BaseComponent } from "../../shared/components/base/base-component";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'gen-dialog-freelancer-payment-details',
  templateUrl: './dialog-freelancer-payment-details.component.html',
  styleUrls: ['./dialog-freelancer-payment-details.component.scss']
})
export class DialogFreelancerPaymentDetailsComponent extends BaseComponent implements OnInit {

  public mode: string;
  public freelancerPayment: FreelancerPayment;

  constructor(private employees: FreelancersPaymentsService, private dialogRef: MatDialogRef<DialogFreelancerPaymentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, freelancerPayment: FreelancerPayment}) {
    super();
    this.mode = data.mode || 'read';
    this.freelancerPayment = data.mode == 'create'? new FreelancerPayment() : data.freelancerPayment;
  }

  ngOnInit() {
  }

  onCrudComponentFinish(freelancerPayment: FreelancerPayment){
    this.loadingOn();
    let observable: Observable<FreelancerPayment>;
    switch(this.mode){
      case 'create':
        observable = this.employees.create(freelancerPayment);
        break;
      case 'update':
        observable = this.employees.update(freelancerPayment);
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
