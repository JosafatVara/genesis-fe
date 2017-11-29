import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Incentive } from '../../shared/models/incentive';
import { Discount } from '../../shared/models/discount';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounce } from 'rxjs/operators/debounce';
import { debug } from 'util';
import { Contribution } from '../../shared/models/contribution';

@Component({
  selector: 'gen-dialog-staff-payment-modifier',
  templateUrl: './dialog-staff-payment-modifier.component.html',
  styleUrls: ['./dialog-staff-payment-modifier.component.scss']
})
export class DialogStaffPaymentModifierComponent implements OnInit {

  modifierForm: FormGroup;
  modifier: Incentive | Discount;
  modifierName: string;

  constructor(private dialogRef: MatDialogRef<DialogStaffPaymentModifierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modifier: Incentive | Discount | Contribution }, private fb: FormBuilder) {
    if(this.data.modifier instanceof Incentive){
      this.modifierName = 'Incentivo';
      this.modifier = new Incentive(Object.assign({},data.modifier));
    }else if(this.data.modifier instanceof Discount){
      this.modifierName = 'Descuento';
      this.modifier = new Discount(Object.assign({},data.modifier));
    }else if(this.data.modifier instanceof Contribution){
      this.modifierName = 'Aporte';
      this.modifier = new Contribution(Object.assign({},data.modifier));
    }else{
      throw Error('modifier not supported');
    }
  }

  ngOnInit() {
    this.createForms();
    this.fillFormsModels();
  }

  createForms(){
    this.modifierForm = this.fb.group({
      concept: ['', [Validators.required]],
      description: ['',[Validators.required]],
      ammount: [0,[Validators.required, this.positiveValidation]]
    })
  }

  positiveValidation(input: AbstractControl){
    if((input.value as number) < 0){
      return {nonPositive: true};
    }
    return null;
  }

  fillFormsModels(){
    this.modifierForm.patchValue(this.modifier);
  }

  get title(): string{
    return this.modifierName;
  }

  get buttonLabel(): string{
    return 'OK';
  }

  confirm(){
    if(this.modifierForm.valid){
      this.dialogRef.close(this.modifierForm.value);
    }
  }

}
