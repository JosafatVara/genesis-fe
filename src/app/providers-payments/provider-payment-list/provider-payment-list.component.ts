import { Component, OnInit } from '@angular/core';
import { ProviderPayment } from '../../shared/models/provider-payment';
import { ProvidersPaymentsService } from '../../core/services/providers-payments.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MonthSelectorService } from '../../core/utils/month-selector/month-selector.service';
import { BaseComponent } from '../../shared/components/base/base-component';
import { DialogProviderPaymentDetailsComponent } from '../dialog-provider-payment-details/dialog-provider-payment-details.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'gen-provider-payment-list',
  templateUrl: './provider-payment-list.component.html',
  styleUrls: ['./provider-payment-list.component.scss']
})
export class ProviderPaymentListComponent extends BaseComponent implements OnInit{

  
  public inDashboard: boolean;
  public providerPaymentList: Array<ProviderPayment>;
  public period: {year: number, month: number, monthName: string};

  constructor(private payments: ProvidersPaymentsService, route: ActivatedRoute ,private matDialog: MatDialog
  , private monthSelector: MonthSelectorService) {
    super();
    route.data.subscribe( (data: {inDashboard:boolean}) => {
      this.inDashboard = data.inDashboard
    });
  }

  ngOnInit() {    
  }

  selectPeriod(){
    this.monthSelector.selectMonth().subscribe( result => {
      this.period = result;
      this.refreshPayments();
    });
  }

  private refreshPayments(){
    this.payments.get().subscribe( es => this.providerPaymentList = es );
  }

  public crud(mode: string, payment: ProviderPayment = undefined ){
    if(mode=='delete'){
      this.delete(Object.assign({},payment));
      return;
    }
    let dialogRef = this.matDialog.open(DialogProviderPaymentDetailsComponent,{
      disableClose: true,
      width: '650px',
      height: '85%',
      data: {
        mode: mode,
        providerPayment: Object.assign({},payment)
      }
    });
    dialogRef.afterClosed().subscribe( (result: { cancelled: boolean }) => {
      if(result&&!result.cancelled){
        this.refreshPayments();
      }
    });
  }

  private delete(payment: ProviderPayment){
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Eliminar el pago de ${payment.total} de ${payment.provider.fullName}?`
      }
    });
    dialogRef.afterClosed().subscribe( confirm => {
      if(confirm){
        this.payments.delete(payment).subscribe( () => this.refreshPayments());
      }
    });
  }


}
