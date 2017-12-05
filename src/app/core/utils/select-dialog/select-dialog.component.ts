import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectDialogOption } from './select-dialog';

@Component({
  selector: 'gen-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss']
})
export class SelectDialogComponent implements OnInit {

  title: string;
  options: SelectDialogOption[];

  constructor(@Inject(MAT_DIALOG_DATA) data: {title: string, options: SelectDialogOption[]},
    private dialogRef: MatDialogRef<SelectDialogComponent>) { 
    this.title = data.title || 'Seleccione una opción';
    this.options = data.options || [];
  }

  ngOnInit() {
  }

  select(option: SelectDialogOption){
    this.dialogRef.close(option.value);
  }

}
