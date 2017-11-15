import { Component, OnInit } from '@angular/core';
import { StaffPayment } from '../../shared/models/staff-payment';
import { StaffPaymentsService } from '../../core/services/staff-payments.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogStaffPaymentDetailsComponent } from '../dialog-staff-payment-details/dialog-staff-payment-details.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { BaseComponent } from "../../shared/components/base/base-component";

@Component({
  selector: 'gen-staff-payment-list',
  templateUrl: './staff-payment-list.component.html',
  styleUrls: ['./staff-payment-list.component.scss']
})
export class StaffPaymentListComponent extends BaseComponent implements OnInit {

  public inDashboard: boolean;
  public paymentList: Array<StaffPayment>;

  constructor(private payments: StaffPaymentsService, route: ActivatedRoute ,private matDialog: MatDialog) {
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

  public crud(mode: string, payment: StaffPayment = undefined ){
    if(mode=='delete'){
      this.delete(Object.assign({},payment));
      return;
    }
    let dialogRef = this.matDialog.open(DialogStaffPaymentDetailsComponent,{
      disableClose: true,
      width: '900px',
      height: '85%',
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

  private delete(payment: StaffPayment){
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
