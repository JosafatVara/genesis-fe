import { Component, OnInit } from '@angular/core';
import { StaffPayment } from '../../shared/models/staff-payment';
import { StaffPaymentsService } from '../../core/services/staff-payments.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogStaffPaymentDetailsComponent } from '../dialog-staff-payment-details/dialog-staff-payment-details.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { BaseComponent } from "../../shared/components/base/base-component";
import { MonthSelectorService } from "../../core/utils/month-selector/month-selector.service";
import { PaginationInstance } from 'ngx-pagination';
import { FormControl } from '@angular/forms';
import { StaffPaymentsInPeriodSearchPagedSpecification } from '../../core/services/specifications/staff-payment-specification';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gen-staff-payment-list',
  templateUrl: './staff-payment-list.component.html',
  styleUrls: ['./staff-payment-list.component.scss']
})
export class StaffPaymentListComponent extends BaseComponent implements OnInit {

  public inDashboard: boolean;
  public paymentList: Observable<Array<StaffPayment>>;
  public period: {year: number, month: number, monthName: string};
  public config: PaginationInstance;
  public searchFC: FormControl;

  constructor(private payments: StaffPaymentsService, route: ActivatedRoute ,private matDialog: MatDialog,
    private monthSelector: MonthSelectorService) {
    super();
    route.data.subscribe( (data: {inDashboard:boolean}) => {
      this.inDashboard = data.inDashboard
    });
    this.config = {
      id: 'pagination',
      itemsPerPage: 5,
      currentPage: 1
    };
  }

  ngOnInit() {
    this.searchFC = new FormControl();
    this.searchFC.valueChanges.debounceTime(500).subscribe( () => this.load() );
  }

  selectPeriod(){
    this.monthSelector.selectMonth().subscribe( result => {
      this.period = result;
      this.load();
    });
  }

  load(page?: number){
    page = page || this.config.currentPage;
    this.config.currentPage = page;
    let specification = new StaffPaymentsInPeriodSearchPagedSpecification
        (this.searchFC.value || '',page,this.config.itemsPerPage,
        this.period ? this.period.month: 1,this.period? this.period.year:2017);
    this.payments.get(specification)
        .do( list => {
            this.config.totalItems = specification.size;
            this.paymentList = Observable.of(list);
        })
        .catch( err => {
            return Observable.of([])
        } ).subscribe();
  }

  public crud(mode: string, payment: StaffPayment = undefined ){
    if(mode=='delete'){
      this.delete(Object.assign({},payment));
      return;
    }
    let dialogRef = this.matDialog.open(DialogStaffPaymentDetailsComponent,{
      disableClose: true,
      width: '85%',
      height: '85%',
      data: {
        mode: mode,
        payment: Object.assign({},payment)
      }
    });
    dialogRef.afterClosed().subscribe( (result: { cancelled: boolean }) => {
      if(result&&!result.cancelled){
        this.load();
      }
    });
  }

  private delete(payment: StaffPayment){
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Eliminar el pago de S/. ${payment.netTotalAmmount} de ${payment.employee.fullName}?`
      }
    });
    dialogRef.afterClosed().subscribe( confirm => {
      if(confirm){
        this.payments.delete(payment).subscribe( () => this.load());
      }
    });
  }

}
