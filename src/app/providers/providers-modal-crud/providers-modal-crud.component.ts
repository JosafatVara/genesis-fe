import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//modules
import { Service } from '../../core/services/providers.service'
import { Provider } from "../../shared/models/provider";
import { BankAccount } from "../../shared/models/bank-account";
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
//components
import { ContactsModalCrudComponent } from "../contacts-modal-crud/contacts-modal-crud.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { AccountsBankModalCrudComponent } from "../accounts-bank-modal-crud/accounts-bank-modal-crud.component";


@Component({
    moduleId: module.id,
    selector: 'providers-modal-crud',
    templateUrl: 'providers-modal-crud.component.html',
    styleUrls: ['providers-modal-crud.component.scss']
})
export class ProvidersModalCrudComponent {

    public currentEnterprise: Enterprise;
    person: number;
    btnLabel: string;
    loader: boolean;
    isLinear = false;
    bankAccounts = [];
    nfirstFormGroup: FormGroup;
    nsecondFormGroup: FormGroup;
    nthirdFormGroup: FormGroup;
    nfourthFormGroup: FormGroup;
    lfirstFormGroup: FormGroup;
    lsecondFormGroup: FormGroup;
    lthirdFormGroup: FormGroup;
    lfourthFormGroup: FormGroup;

    constructor(
        private matDialog: MatDialog,
        public thisDialogRef: MatDialogRef<ProvidersModalCrudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, provider: Provider },
        private fb: FormBuilder,
        private service: Service,
        private enterprises: EnterprisesService
    ) {
        enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
    }

    ngOnInit() {
        this.person = 0;
        this.setBtnLabel();
    }

    onCloseConfirm() {
        this.thisDialogRef.close();
    }

    setBtnLabel() {
        switch (this.data.action) {
            case 'create': this.btnLabel = 'crear'; break;
            case 'update': this.btnLabel = 'guardar'; break;
            default: break;
        }
    }

    validateForm(data) {
        if (this.person == 1) {
            this.nfirstFormGroup = this.fb.group({
                photoFlag: ['', Validators.required]
            });
            this.nsecondFormGroup = this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                ruc: ['', Validators.required],
                cellphone: ['', Validators.required],
                address: ['', Validators.required],
                phone: ['', Validators.required],
                email: ['', Validators.required],
                notes: ['', Validators.required],

            });
            // this.nthirdFormGroup = this.fb.group({
            //     thirdCtrl: ['', Validators.required]
            // });

        } else {
            this.lfirstFormGroup = this.fb.group({
                firstCtrl: ['', Validators.required]
            });
            this.lsecondFormGroup = this.fb.group({
                secondCtrl: ['', Validators.required]
            });
            this.lthirdFormGroup = this.fb.group({
                thirdCtrl: ['', Validators.required]
            });
            this.lfourthFormGroup = this.fb.group({
                fourthCtrl: ['', Validators.required]
            });
        }
    }

    setValidateForm() {
        this.data.action == 'update' ? this.validateForm(this.data.provider) : this.validateForm('');
    }

    onCloseCancel() {
        this.thisDialogRef.close("Cancel")
    }

    selectPerson(selected) {
        this.person = selected;
        this.setValidateForm();

    }

    private refreshBankAccounts(bankAccount: BankAccount) {
        console.log(this.currentEnterprise.id, "id de empresa catual");
        this.bankAccounts.push(bankAccount);
        // this.service.getList(this.currentEnterprise.id).subscribe(
        //     res => this.groups = res.json()
        // )
        // console.log(this.groups);
    }

    // crud(action: string, bankAccount: BankAccount = undefined) {
    //     if (action == 'delete') {
    //         this.delete(Object.assign({}, bankAccount));
    //         return
    //     }
    //     let dialogRef = this.matDialog.open(AccountsBankModalCrudComponent, {
    //         width: '350px',
    //         data: {
    //             action: action,
    //             bankAccount: Object.assign({}, bankAccount),
    //             provider: Object.assign({}, provider)
    //         }
    //     });
    //     dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
    //         if (!result.cancelled) this.refreshBanckAccounts()
    //     })
    // }

    // private delete(bankAccount: BankAccount) {
    //     let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
    //         data: {
    //             message: `¿Esta seguro de eliminar el grupo ${bankAccount.bankName}?`
    //         }
    //     });
    //     dialogRef.afterClosed().subscribe(confirm => {
    //         if (confirm) {
    //             for (var index = 0; index < this.bankAccounts.length; index++) {
    //                 if (bankAccount.bankName == this.bankAccounts[index].bankName) {
    //                     this.bankAccounts.splice(index, 1);
    //                     break;
    //                 }
    //             }
    //         }
    //         // this.service.delete(group.id).subscribe(() => this.refreshGroups());
    //     });
    // }

    create() {
        if (this.person == 1) {
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
