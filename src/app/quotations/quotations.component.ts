import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModalCrudComponent } from "./modal-crud/modal-crud.component";

@Component({
  selector: 'gen-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ModalCrudComponent, {
      width: '720px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ${result}');
      // this.animal = result;
    });
  }
}
