import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { MonthSelectorComponent } from "./month-selector.component";

@Injectable()
export class MonthSelectorService {

  private months: string[] = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

  constructor(private matDialog: MatDialog) { }

  selectMonth(): Observable<{month: number, year: number, monthName: string}>{
    let dialogRef = this.matDialog.open(MonthSelectorComponent,{
      disableClose: true,
      height: '500px',
      width: '650px',
      data: {
        months: this.months
      }
    });
    return dialogRef.afterClosed().map( (result: {month: number, year: number, monthName: string}) => {
      result.monthName = this.months[result.month];
      return result;      
    });
  }

  get availableMonths(): string[]{
    return this.months;
  }
}
