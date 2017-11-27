import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'gen-simple-crud',
  templateUrl: './simple-crud.component.html',
  styleUrls: ['./simple-crud.component.scss']
})
export class SimpleCrudComponent implements OnInit {

  title: string;
  formGroup: FormGroup;
  formControlList: {type:string, label: string, name: string, control: FormControl}[];

  constructor(@Inject(MAT_DIALOG_DATA) data: { 
    formControlList: {type:string, label: string, name: string, control: FormControl}[],
    title: string
  }, private dialogRef: MatDialogRef<SimpleCrudComponent>) { 
    this.formControlList = data.formControlList;    
    this.title = data.title;
  }

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.formControlList.forEach( item => {
      this.formGroup.addControl(item.name, item.control);
    });
  }

  confirm(){
    if(this.formGroup.valid){
      this.dialogRef.close(this.formGroup.value);      
    }
  }

}
