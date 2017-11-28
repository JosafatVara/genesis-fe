import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'gen-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent implements OnInit {

  title: string;
  year: number;
  months: string[];

  constructor(private dialogRef: MatDialogRef<MonthSelectorComponent>,
  @Inject(MAT_DIALOG_DATA) data: { title: string, months: string[] }) { 
    this.months = data.months;
    this.title = data && data.title? data.title : 'Seleccionar periodo';
    this.year =  (new Date()).getFullYear();
  }

  ngOnInit() {
  }

  onMonthClick(monthIndex: number, year: number){
    this.dialogRef.close( {month: monthIndex, year: year} );
  }

  isCurrent(monthIndex: number, year: number){
    let currentMonthIndex = (new Date()).getMonth();
    let currentYear = (new Date()).getFullYear();
    return monthIndex == currentMonthIndex && year == currentYear;
  }


}
