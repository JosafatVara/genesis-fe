import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatFormFieldModule, MatInputModule, MatHorizontalStepper, MatStep } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quotation } from '../../shared/models/quotation';
import { FormArray } from '@angular/forms/src/model';

@Component({
    moduleId: module.id,
    selector: 'modal-crud',
    templateUrl: 'modal-crud.component.html',
    styleUrls: ['modal-crud.component.scss']
})
export class ModalCrudComponent {
    quotation: Quotation;
    quotationInformationFG: FormGroup;
    quotationDetailtsFG: FormGroup;

    constructor(private fb: FormBuilder, public thisDialogRef: MatDialogRef<ModalCrudComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: { quotation: Quotation}) {
        this.quotation = data.quotation;
    }

    ngOnInit() {
        this.createForms();
        this.fillFormsModels();
    }

    createForms(){
        this.quotationInformationFG = this.fb.group({
            customer: [undefined, [Validators.required]],
            created: [new Date(), [Validators.required]],
            
        });
        this.quotationDetailtsFG = this.fb.group({
            details: this.fb.array([]),
            subtotal: 0,
            igv: 0,
            totalAmmount: 0
        });
        this.quotationDetailtsFG.get('details').valueChanges.subscribe( () => {
            let helperQuotation: Quotation = new Quotation({ details: this.details.value })
            this.quotationDetailtsFG.patchValue({
                subtotal: helperQuotation.subtotal,
                igv: helperQuotation.igv,
                totalAmmount: helperQuotation.totalAmmount
            });
        });
    }

    fillFormsModels(){
        if(this.quotation){
            this.quotationInformationFG.patchValue(this.quotation);
            let quotationDetailsFGs: FormGroup[] = this.quotation.details.map( d => {
                return this.fb.group({
                    productQuantity: d.productQuantity,
                    productName: d.productName,
                    ammount: d.ammount
                });
            });
            this.quotationDetailtsFG.setControl('details', this.fb.array(quotationDetailsFGs));
        }
    }

    fillDataModels(){

    }

    get details(): FormArray{
        return this.quotationDetailtsFG.get('details') as FormArray;
    }

    confirm() {
        this.thisDialogRef.close('confirm');
    }
}
