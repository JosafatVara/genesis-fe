import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { MonthSelectorComponent } from './month-selector.component';

@Injectable()
export class MonthSelectorService {

  constructor(private matDialog: MatDialog) { }

  selectMonth(): Observable<{month: number, year: number}>{
    let dialogRef = this.matDialog.open(MonthSelectorComponent,{
      disableClose: true,
      height: '500px',
      width: '650px'
    });
    return dialogRef.afterClosed();
  }
}
