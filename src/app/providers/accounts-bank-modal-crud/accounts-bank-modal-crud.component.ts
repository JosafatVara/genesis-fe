import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { Service } from '../../core/services/groups.service'
// import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
// import { Enterprise } from '../../shared/models/enterprise';
import { BankAccount } from "../../shared/models/bank-account";


@Component({
    moduleId: module.id,
    selector: 'accounts-bank-modal-crud',
    templateUrl: 'accounts-bank-modal-crud.component.html',
    styleUrls: ['accounts-bank-modal-crud.component.scss']
})
export class AccountsBankModalCrudComponent {
    // public currentEnterprise: Enterprise;
    loader: boolean;
    btnLabel: string;
    groupForm: FormGroup;
    constructor(
        public thisDialogRef: MatDialogRef<AccountsBankModalCrudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, bankAccount: BankAccount },
        private fb: FormBuilder,
        // private service: Service,
        // private enterprises: EnterprisesService
    ) {
        // enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
    }

    ngOnInit() {
        this.setValidateForm();
        this.setBtnLabel();
    }

    cancel() {
        this.thisDialogRef.close({ cancelled: true })
    }

    validateForm(data) {
        this.groupForm = this.fb.group({
            bankName: [data, Validators.required],
            interbankNumber: [data, Validators.required],
            number: [data, Validators.required],
        });
    }
    setBtnLabel() {
        switch (this.data.action) {
            case 'create': this.btnLabel = 'crear'; break;
            case 'update': this.btnLabel = 'guardar'; break;
            default: break;
        }
    }

    setValidateForm() {
        this.data.action == 'update' ? this.validateForm(this.data.bankAccount.bankName) : this.validateForm('');
    }

    doAction() {
        // switch (this.data.action) {
        //     case 'create':
        //         if (this.groupForm.valid) {
        //             const value = this.groupForm.value;
        //             // this.service.create(value, this.currentEnterprise.id).subscribe(res => 
        //             this.thisDialogRef.close(value)
        //             // )
        //         }
        //         break;
        //     case 'update':
        //         if (this.groupForm.valid) {
        //             const value = this.groupForm.value;
        //             this.service.update(value, this.data.group.id).subscribe(res => this.thisDialogRef.close({ cancelled: false }))
        //         }
        //         break;
        //     default:
        //         break;
        // }
    }
}
