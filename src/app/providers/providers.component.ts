import { Component, OnInit } from '@angular/core';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// import { Service } from "./providers.service";

// import { ModalCreateComponent } from "./modal-create/modal-create.component";
// import { ModalUpdateComponent } from "./modal-update/modal-update.component";
// import { ConfirmDialogComponent } from "../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'gen-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  constructor() { }
  // animal: string = "holiboli animal";
  // name: string = "holiboli name";
  // providers: any = [];


  ngOnInit() {
    // this.getProviders();
  }

  // getProviders() {
  //   this.service.getList(JSON.parse(localStorage.getItem("enterprise").id)).subscribe(
  //     (res) => {
  //       this.providers = res.json();
  //     },
  //     (err) => {
  //     }
  //   )
  // }

  // openDialogCreate(): void {
  //   let dialogRef = this.dialog.open(ModalCreateComponent, {
  //     width: '720px',
  //     data: { enterpriseId: JSON.parse(localStorage.getItem('id')) }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // this.getGroups();
  //     }
  //   });
  // }

  // openDialogUpdate(id): void {
  //   let dialogRef = this.dialog.open(ModalUpdateComponent, {
  //     width: '720px',
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
  //       message: `¿Estas seguro de eliminar el proveedor?`
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(confirm => {
  //     if (confirm) {

  //       // this.service.delete(JSON.parse(localStorage.getItem("enterprise").id,id)).subscribe(
  //       //     (res) => {
  //       //       this.getGroups();
  //       //     },
  //       //     (err) => {
  //       //     }
  //       //   )

  //     }
  //   });
  // }

}
