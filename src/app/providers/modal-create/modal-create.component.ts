import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatFormFieldModule, MatInputModule, MatHorizontalStepper, MatStep } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'modal-create',
    templateUrl: 'modal-create.component.html',
    styleUrls: ['modal-create.component.scss']
})
export class ModalCreateComponent {
    loader: boolean;
    isLinear = false;
    nfirstFormGroup: FormGroup;
    nsecondFormGroup: FormGroup;
    nthirdFormGroup: FormGroup;
    nfourthFormGroup: FormGroup;
    lfirstFormGroup: FormGroup;
    lsecondFormGroup: FormGroup;
    lthirdFormGroup: FormGroup;
    lfourthFormGroup: FormGroup;


    display: any;
    person1: boolean = false;
    person2: boolean = false;


    constructor(private _formBuilder: FormBuilder, public thisDialogRef: MatDialogRef<ModalCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
        this.display = {
            index: true,
            natural: false,
            legal: false
        }
    }

    ngOnInit() {
        this.nfirstFormGroup = this._formBuilder.group({
            // firstCtrl: ['', Validators.required],
        });
        this.nsecondFormGroup = this._formBuilder.group({
            businessName: ['', Validators.required],
            address: ['', Validators.required],
            ruc: ['', Validators.required],
            phone: ['', Validators.required],
            group: ['', Validators.required],
            details: ['', Validators.required],
        });
        this.nthirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });
        this.nfourthFormGroup = this._formBuilder.group({
            fourthCtrl: ['', Validators.required]
        });

        this.lfirstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.lsecondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.lthirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });
        this.lfourthFormGroup = this._formBuilder.group({
            fourthCtrl: ['', Validators.required]
        });
    }

    onCloseConfirm() {
        this.thisDialogRef.close();
    }

    onCloseCancel() {
        this.thisDialogRef.close("Cancel")
    }

    selectPerson(selected) {
        this.display.index = false;
        selected == 1 ? this.display.natural = true : this.display.legal = true;
    }
    create() {
        if (this.display.natural == true) {
            if (this.nfirstFormGroup.valid && this.nsecondFormGroup.valid && this.nthirdFormGroup.valid && this.nfourthFormGroup.valid) {
                this.loader = true;
                const value = Object.assign({}, this.nfirstFormGroup.value, this.nsecondFormGroup, this.nthirdFormGroup, this.nfourthFormGroup);
                // this.service.create(this.data.enterpriseId).subscribe(
                // (res) => {
                // this.thisDialogRef.close(1);            
                // this.loader = false;     
                // },
                // (err) => {
                // }
                // )
            }
        } else {
            if (this.lfirstFormGroup.valid && this.lsecondFormGroup.valid && this.lthirdFormGroup.valid && this.lfourthFormGroup.valid) {
                this.loader = true;
                const value = Object.assign({}, this.lfirstFormGroup.value, this.lsecondFormGroup, this.lthirdFormGroup, this.lfourthFormGroup);
                // this.service.create(this.data.enterpriseId).subscribe(
                // (res) => {
                // this.thisDialogRef.close(1);            
                // this.loader = false;     
                // },
                // (err) => {
                // }
                // )
            }
        }


    }
}
