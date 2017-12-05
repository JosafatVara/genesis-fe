import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Validators } from '@angular/forms';
import { ToastService } from '../toast/toast.service';

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
  manualEntity: {label: string, value: string}[];

  constructor(private fb: FormBuilder, private toast: ToastService, @Inject(MAT_DIALOG_DATA) data: { 
    formControlList: {type:string, label: string, name: string, control: FormControl}[],
    title: string,
    manualEntity: {label: string, value: string}[]
  }, private dialogRef: MatDialogRef<SimpleCrudComponent>) {    
    this.formControlList = data.formControlList;    
    if(!this.formControlList) {
      this.isManual = true;
      this.manualEntity = data.manualEntity || [];
    }
    this.title = data.title;
  }

  ngOnInit() {
    this.formGroup = new FormGroup({});
    this.formControlList = this.formControlList || [];
    this.formControlList.forEach( item => {
      this.formGroup.addControl(item.name, item.control);
    });
    if(this.isManual){
      this.initFromManual();
    }
  }

  initFromManual(){
    this.manualEntity.forEach( me => {
      this.addControl(me.label, me.value);
    });
  }

  addControl(label?: string, value?: string){
    label = label || 'Nuevo campo';
    value = value || undefined;
    let newName = 'field_' + this.makeRandomControlName();
    let newFC = this.fb.control(value, [Validators.required]) 
    this.formControlList = this.formControlList.concat([ {
      type: 'text',
      label: label,
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

  confirm(){
    if(this.formControlList.length == 0){
      this.toast.warning('Debe crear al menos un campo');
      return;
    }
    if(this.formGroup.valid){
      if(!this.isManual){
        this.dialogRef.close(this.formGroup.value);
      }else{
        let manualResult = [];
        this.formControlList.forEach( fc => {
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
