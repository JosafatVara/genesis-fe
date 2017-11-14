import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Service } from '../../core/services/groups.service'

@Component({
    moduleId: module.id,
    selector: 'modal-create',
    templateUrl: 'modal-create.component.html',
    styleUrls: ['modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {
    loader: boolean;
    groupForm: FormGroup;

    constructor(
        public thisDialogRef: MatDialogRef<ModalCreateComponent>,
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
            const value = this.groupForm.value;
            console.log(value, "amiguito");
            this.service.create(value, JSON.parse(localStorage.getItem('enterprise')).id).subscribe(
                (res) => {
                    this.thisDialogRef.close(1);
                    this.loader = false;
                },
                (err) => {
                }
            )
        }
    }
}
