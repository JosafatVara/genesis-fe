import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Incentive } from '../../shared/models/incentive';
import { Discount } from '../../shared/models/discount';

@Component({
  selector: 'gen-dialog-staff-payment-modifier',
  templateUrl: './dialog-staff-payment-modifier.component.html',
  styleUrls: ['./dialog-staff-payment-modifier.component.scss']
})
export class DialogStaffPaymentModifierComponent implements OnInit {

  private modifier: Incentive | Discount;
  private modifierName: string;

  constructor(private dialogRef: MatDialogRef<DialogStaffPaymentModifierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modifier: Incentive | Discount }) {
    if(this.data.modifier instanceof Incentive){
      this.modifierName = 'Incentivo';
      this.modifier = new Incentive(Object.assign({},data.modifier));
    }else if(this.data.modifier instanceof Discount){
      this.modifierName = 'Descuento';
      this.modifier = new Discount(Object.assign({},data.modifier));
    }else{
      throw Error('modifier not supported');
    }
  }

  ngOnInit() {
  }

  get title(): string{
    // switch(this.mode){
    //   case 'create':
    //     return `Añadir ${this.modifierName}`;
    //   case 'update':
    //     return `Actualizar ${this.modifierName}`;
    //   default:
    //     return '';
    // }
    return this.modifierName;
  }

  get buttonLabel(): string{
    // switch(this.mode){
    //   case 'create':
    //     return `Añadir`;
    //   case 'update':
    //     return `Actualizar`;
    //   default:
    //     return '';
    // }
    return 'OK';
  }

  confirm(){
    this.dialogRef.close(this.modifier);
  }

}
