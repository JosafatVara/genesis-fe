import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Service } from '../groups.service'

@Component({
    moduleId: module.id,
    selector: 'modal-update',
    templateUrl: 'modal-update.component.html',
    styleUrls: ['modal-update.component.scss']
})
export class ModalUpdateComponent {
    loader: boolean;
    groupForm: FormGroup;

    constructor(
        public thisDialogRef: MatDialogRef<ModalUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private fb: FormBuilder,
        private service: Service
    ) {

    }

    ngOnInit() {
        this.validateForm();
    }

    cancel() {
        this.thisDialogRef.close()
    }

    validateForm() {
        this.groupForm = this.fb.group({
            name: ['', Validators.required]
        });
    }

    create() {
        if (this.groupForm.valid) {
            this.loader = true;
            console.log("creare mi formulario");
            this.thisDialogRef.close('confirm');
            const value = this.groupForm.value;

            // this.service.update(value,id).subscribe(
            // (res) => {
            // this.loader = false;                    
            // },
            // (err) => {
            // }
            // )
        }
    }
}
