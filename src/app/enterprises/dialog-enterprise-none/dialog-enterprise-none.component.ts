import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'gen-dialog-enterprise-none',
  templateUrl: './dialog-enterprise-none.component.html',
  styleUrls: ['./dialog-enterprise-none.component.scss']
})
export class DialogEnterpriseNoneComponent implements OnInit {

  public createEnterpriseSelected: boolean;
  public dialogRef: MatDialogRef<DialogEnterpriseNoneComponent>;

  constructor(dialogRef: MatDialogRef<DialogEnterpriseNoneComponent>) { 
    this.createEnterpriseSelected = false;
    this.dialogRef = dialogRef;
  }

  ngOnInit() {
  }

  public exitSelected(){
    this.dialogRef.close({ exitSelected: true });
  }

}
