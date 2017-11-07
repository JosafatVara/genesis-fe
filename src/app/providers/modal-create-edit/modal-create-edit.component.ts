import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatFormFieldModule, MatInputModule, MatHorizontalStepper, MatStep } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'modal-create-edit',
    templateUrl: 'modal-create-edit.component.html',
    styleUrls: ['modal-create-edit.component.scss']
})
export class ModalCreateEditComponent {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    fourthFormGroup: FormGroup;
    
    display: any;
    person1: boolean = false;
    person2: boolean = false;


    constructor(private _formBuilder: FormBuilder, public thisDialogRef: MatDialogRef<ModalCreateEditComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
        this.display = {
            index: true,
            natural: false,
            legal: false
        }
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });
        this.fourthFormGroup = this._formBuilder.group({
            fourthCtrl: ['', Validators.required]
        });
    }

    onCloseConfirm() {
        this.thisDialogRef.close('confirm');
    }

    onCloseCancel() {
        this.thisDialogRef.close("Cancel")
    }

    selectPerson(selected) {
        this.display.index = false;
        selected == 1 ? this.display.natural = true : this.display.legal = true;
    }


}
