import { Component, OnInit } from '@angular/core';
import { Payment } from '../../shared/models/payment';
import { PaymentsService } from '../../core/services/payments.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogPaymentDetailsComponent } from '../dialog-payment-details/dialog-payment-details.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { BaseComponent } from "../../shared/components/base/base-component";

@Component({
  selector: 'gen-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent extends BaseComponent implements OnInit {

  public inDashboard: boolean;
  public paymentList: Array<Payment>;

  constructor(private payments: PaymentsService, route: ActivatedRoute ,private matDialog: MatDialog) {
    super();
    route.data.subscribe( (data: {inDashboard:boolean}) => {
      this.inDashboard = data.inDashboard
    });
  }

  ngOnInit() {
    this.refreshPayments();
  }

  private refreshPayments(){
    this.payments.get().subscribe( es => this.paymentList = es );
  }

  public crud(mode: string, payment: Payment = undefined ){
    if(mode=='delete'){
      this.delete(Object.assign({},payment));
      return;
    }
    let dialogRef = this.matDialog.open(DialogPaymentDetailsComponent,{
      disableClose: true,
      width: 'auto',
      data: {
        mode: mode,
        payment: Object.assign({},payment)
      }
    });
    dialogRef.afterClosed().subscribe( (result: { cancelled: boolean }) => {
      if(result&&!result.cancelled){
        this.refreshPayments();
      }
    });
  }

  private delete(payment: Payment){
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Eliminar el pago de S/. ${payment.totalContributions} de ${payment.employee.fullName}?`
      }
    });
    dialogRef.afterClosed().subscribe( confirm => {
      if(confirm){
        this.payments.delete(payment).subscribe( () => this.refreshPayments());
      }
    });
  }

}
