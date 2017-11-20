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
  months: string[] = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

  constructor(private dialogRef: MatDialogRef<MonthSelectorComponent>,
  @Inject(MAT_DIALOG_DATA) data: { title: string }) { 
    this.title = data? data.title : 'Seleccionar mes';
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
