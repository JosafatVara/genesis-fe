import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModalCreateEditComponent } from "./modal-create-edit/modal-create-edit.component";

@Component({
  selector: 'gen-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  animal: string = "holiboli animal";
  name: string = "holiboli name";

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ModalCreateEditComponent, {
      width: '700px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ${result}');
      this.animal = result;
    });
  }

}
