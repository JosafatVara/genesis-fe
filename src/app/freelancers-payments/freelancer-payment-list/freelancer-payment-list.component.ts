import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";

import { FreelancerPayment } from "../../shared/models/freelancer-payment";
import { FreelancersPaymentsService } from "../../core/services/freelancers-payments.service";
import { DialogFreelancerPaymentDetailsComponent } from "../dialog-freelancer-payment-details/dialog-freelancer-payment-details.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { BaseComponent } from "../../shared/components/base/base-component";

@Component({
  selector: 'gen-freelancer-payment-list',
  templateUrl: './freelancer-payment-list.component.html',
  styleUrls: ['./freelancer-payment-list.component.scss']
})
export class FreelancerPaymentListComponent extends BaseComponent implements OnInit {

  public inDashboard: boolean;
  public freelancerPaymentList: Array<FreelancerPayment>;

  constructor(private payments: FreelancersPaymentsService, route: ActivatedRoute ,private matDialog: MatDialog) {
    super();
    route.data.subscribe( (data: {inDashboard:boolean}) => {
      this.inDashboard = data.inDashboard
    });
  }

  ngOnInit() {
    this.refreshPayments();
  }

  private refreshPayments(){
    this.payments.get().subscribe( es => this.freelancerPaymentList = es );
  }

  public crud(mode: string, payment: FreelancerPayment = undefined ){
    if(mode=='delete'){
      this.delete(Object.assign({},payment));
      return;
    }
    let dialogRef = this.matDialog.open(DialogFreelancerPaymentDetailsComponent,{
      disableClose: true,
      width: '650px',
      height: '85%',
      data: {
        mode: mode,
        freelancerPayment: Object.assign({},payment)
      }
    });
    dialogRef.afterClosed().subscribe( (result: { cancelled: boolean }) => {
      if(result&&!result.cancelled){
        this.refreshPayments();
      }
    });
  }

  private delete(payment: FreelancerPayment){
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Eliminar el pago de ${payment.total} de ${payment.freelancer.fullName}?`
      }
    });
    dialogRef.afterClosed().subscribe( confirm => {
      if(confirm){
        this.payments.delete(payment).subscribe( () => this.refreshPayments());
      }
    });
  }

}
