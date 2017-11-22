import { Provider } from './../../shared/models/provider';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { Service } from '../../core/services/groups.service'
// import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
// import { Enterprise } from '../../shared/models/enterprise';
//modules
import { ToastService } from "../../core/utils/toast/toast.service";
//compoents
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
    positionUpdate: number;
    constructor(
        public thisDialogRef: MatDialogRef<AccountsBankModalCrudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, bankAccount: BankAccount, bankAccounts: BankAccount[], provider: Provider },
        private fb: FormBuilder,
        private toast: ToastService
    ) { }

    ngOnInit() {
        this.validateForm(this.data.bankAccount);
        this.setBtnLabel();
        this.getPosition();
    }

    cancel() {
        this.thisDialogRef.close({ cancelled: true })
    }

    validateForm(data) {
        this.groupForm = this.fb.group({
            bankName: [data.bankName, Validators.required],
            number: [data.number, [Validators.required, Validators.min(1)]],
        });
    }

    setBtnLabel() {
        switch (this.data.action) {
            case 'create': this.btnLabel = 'crear'; break;
            case 'update': this.btnLabel = 'guardar'; break;
            default: break;
        }
    }

    getPosition() {
        if (this.data.action == 'update') {
            for (var index = 0; index < this.data.bankAccounts.length; index++) {
                if (this.data.bankAccount.number == this.data.bankAccounts[index].number) this.positionUpdate = index;
            }
        }
    }

    doAction() {
        switch (this.data.action) {
            case 'create':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    for (var index = 0; index < this.data.bankAccounts.length; index++) {
                        // if (value.number == this.data.bankAccounts[index].number) {
                        //     this.toast.error('El numero de cuenta ya existe');
                        //     return
                        // }
                    }
                    this.data.bankAccounts.push(value);
                    this.thisDialogRef.close({ cancelled: false })
                }
                break;
            case 'update':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    console.log(value, "dsdsd")
                    for (var index = 0; index < this.data.bankAccounts.length; index++) {
                        // if (value.number == this.data.bankAccounts[index].number && index != this.positionUpdate) {
                        //     this.toast.error('El numero de cuenta ya existe');
                        //     return
                        // }
                        this.data.bankAccounts.splice(this.positionUpdate, 1);
                    }
                    this.data.bankAccounts.push(value);
                    this.thisDialogRef.close({ cancelled: false })
                }
                break;
            default: break;
        }
    }
}
