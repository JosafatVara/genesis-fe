import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'gen-simple-crud',
  templateUrl: './simple-crud.component.html',
  styleUrls: ['./simple-crud.component.scss']
})
export class SimpleCrudComponent implements OnInit {

  isManual: boolean;
  title: string;
  formGroup: FormGroup;
  formControlList: {type:string, label: string, name: string, control: FormControl, editingLabel?: boolean}[];

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data: { 
    formControlList: {type:string, label: string, name: string, control: FormControl}[],
    title: string
  }, private dialogRef: MatDialogRef<SimpleCrudComponent>) {    
    this.formControlList = data.formControlList;    
    if(!this.formControlList) this.isManual = true;
    this.title = data.title;
  }

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.formControlList = this.formControlList || [];
    this.formControlList.forEach( item => {
      this.formGroup.addControl(item.name, item.control);
    });
  }

  addControl(){
    let newName = 'field_' + this.makeRandomControlName();
    let newFC = this.fb.control(undefined) 
    this.formControlList = this.formControlList.concat([ {
      type: 'text',
      label: 'Nuevo campo',
      name: newName,
      control: newFC
    }]);
    this.formGroup.addControl(newName, newFC);
  }

  protected makeRandomControlName(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
  }

  removeControl(index: number){
    let removedControl = this.formControlList.splice(index,1)[0];
    this.formGroup.removeControl(removedControl.name);
  }

  closeEditLabel(event: any, control: {editingLabel: boolean}){
    if(event && (event.keyCode == 13 || event == "blur")){
      control.editingLabel = false;
      event == "blur" || event.stopPropagation();
    }
  }

  confirm(event){
    if(this.formGroup.valid){
      if(!this.isManual){
        this.dialogRef.close(this.formGroup.value);
      }else{
        let manualResult = [];
        this.formControlList.forEach( fc => {
          // manualResult[fc.name] = {
          //   label: fc.label,
          //   value: this.formGroup.get(fc.name).value
          // }
          manualResult = manualResult.concat([{
              label: fc.label,
              value: this.formGroup.get(fc.name).value
            }]);
        });
        this.dialogRef.close(manualResult);
      }
    }
  }
}
