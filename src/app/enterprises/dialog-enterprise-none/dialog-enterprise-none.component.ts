import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Enterprise } from '../../shared/models/enterprise';
import { EnterprisesService } from '../../core/services/enterprises.service';
import { Router } from "@angular/router";

@Component({
  selector: 'gen-dialog-enterprise-none',
  templateUrl: './dialog-enterprise-none.component.html',
  styleUrls: ['./dialog-enterprise-none.component.scss']
})
export class DialogEnterpriseNoneComponent implements OnInit {

  public createdEnterprise: Enterprise;
  public enterprises: EnterprisesService;
  public currentState: number;
  public dialogRef: MatDialogRef<DialogEnterpriseNoneComponent>;

  constructor(enterprises: EnterprisesService, dialogRef: MatDialogRef<DialogEnterpriseNoneComponent>) { 
    this.currentState = 0;
    this.dialogRef = dialogRef;
    this.enterprises = enterprises;
  }

  ngOnInit() {
  }

  public exitSelected(){
    this.dialogRef.close({ exitSelected: true });
  }

  public createSelected(){
    this.currentState = 1;
  }

  public enterpriseCreated(enterprise: Enterprise): void{
    this.enterprises.create(enterprise).subscribe( e => {
      this.enterprises.setCurrentEnterprise(e);
      this.createdEnterprise = e;
      this.currentState = 2;
    })
  }

  public manageEnterprise(){
    this.dialogRef.close({ exitSelected: false, createdEnterprise: this.createdEnterprise });
  }

}
