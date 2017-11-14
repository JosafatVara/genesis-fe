import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Service } from '../core/services/groups.service'
// import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component'

// import { ModalCreateComponent } from "./modal-create/modal-create.component";
// import { ModalUpdateComponent } from "./modal-update/modal-update.component";
// import { ModalCrudComponent } from "./modal-crud/modal-crud.component";


@Component({
  selector: 'gen-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {


  // animal: string = "holiboli animal";
  // name: string = "holiboli name";
  // groups: any = [];
  // enterpriseId: string;
  // constructor(public dialog: MatDialog, private service: Service) {

  // }
  constructor() {

  }

  ngOnInit() {
    // this.getGroups();
    // console.log(JSON.parse(localStorage.getItem("enterprise")).id);
  }


  // getGroups() {
  //   this.service.getList(JSON.parse(localStorage.getItem("enterprise")).id).subscribe(
  //     (res) => {
  //       console.log("holio");

  //       this.groups = res.json();
  //       console.log(this.groups );        
  //     },
  //     (err) => {
  //     }
  //   )
  // }

  // openDialogCreate(): void {
  //   let dialogRef = this.dialog.open(ModalCreateComponent, {
  //     width: '350px',
  //     data: { enterpriseId: JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("enterprise")).id)) }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.getGroups();
  //     }
  //   });
  // }

  // openDialogUpdate(id): void {
  //   let dialogRef = this.dialog.open(ModalUpdateComponent, {
  //     width: '350px',
  //     data: { enterpriseId: id }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // this.getGroups();
  //     }
  //   });
  // }

  // private delete(id) {
  //   let dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     data: {
  //       message: `¿Estas seguro de eliminar el grupo?`
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(confirm => {
  //     if (confirm) {
  //     }
  //   });
  // }
}










