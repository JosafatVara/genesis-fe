import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModalAddComponent } from "./modal-add/modal-add.component";

@Component({
  selector: 'gen-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  animal: string = "holiboli animal";
  name: string = "holiboli name";

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ModalAddComponent, {
      width: '350px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ${result}');
      this.animal = result;
    });
  }


}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
