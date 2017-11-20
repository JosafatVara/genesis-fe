import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//modules
import { Service } from '../../core/services/providers.service'
import { Provider, NaturalProvider, LegalProvider } from "../../shared/models/provider";
import { BankAccount } from "../../shared/models/bank-account";
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { UsersService } from '../../core/services/users.service';
// import { User } from '../../shared/models/user';
//components
import { ContactsModalCrudComponent } from "../contacts-modal-crud/contacts-modal-crud.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { AccountsBankModalCrudComponent } from "../accounts-bank-modal-crud/accounts-bank-modal-crud.component";
import { ImagesService } from '../../core/utils/images/images.service';

@Component({
    moduleId: module.id,
    selector: 'providers-modal-crud',
    templateUrl: 'providers-modal-crud.component.html',
    styleUrls: ['providers-modal-crud.component.scss']
})
export class ProvidersModalCrudComponent {
    public currentEnterprise: Enterprise;
    providerType: number;
    btnLabel: string;
    loader: boolean;
    isLinear = true;
    providerPhoto: any;
    provider: any;

    frmNaturalPhoto: FormGroup;
    frmNaturalBasicData: FormGroup;
    frmNaturalBankAccounts: FormGroup;

    frmLegalPhoto: FormGroup;
    frmLegalBasicData: FormGroup;
    frmLegalContacts: FormGroup;
    frmLegalBankAccounts: FormGroup;

    bankAccounts = [];

    constructor(
        private matDialog: MatDialog,
        public thisDialogRef: MatDialogRef<ProvidersModalCrudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, provider: Provider },
        private fb: FormBuilder,
        private service: Service,
        private enterprises: EnterprisesService,
        private images: ImagesService
    ) {
        this.enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
    }

    ngOnInit() {
        // this.provider=this.data.provider || new 
        this.initializePerson();
        this.setBtnLabel();
        // if (this.data.action != 'create' ) {
        //     this.images.getBlobFromImageUrl(this.managedEntity.photoPublicUrl).subscribe(image => {
        //         this.freelancerPhoto = image;
        //     });
        // }
    }

    onCloseConfirm() {
        this.thisDialogRef.close();
    }

    initializePerson() {
        if (this.data.action == 'create') {
            this.providerType = 0;
        } else {
            this.provider = this.data.provider
            //if data provide es natural, person=1
            //if data provide es legal, person=2
        }
    }

    selectPerson(selected) {
        this.providerType = selected;
        if (this.providerType == 1) {
            this.provider = this.data.action == 'create' ? new NaturalProvider : this.data.provider;
        } else {
            this.provider = this.data.action == 'create' ? new LegalProvider : this.data.provider;
        }
        // this.person == 1 ? this.provider = this.data.provider || new NaturalProvider : this.provider = this.data.provider || new LegalProvider;
        console.log(this.provider);
        this.createForm();
        this.fillForm();
    }


    setBtnLabel() {
        switch (this.data.action) {
            case 'create': this.btnLabel = 'crear'; break;
            case 'update': this.btnLabel = 'guardar'; break;
            default: break;
        }
    }

    createForm() {
        if (this.providerType == 1) {
            this.frmNaturalPhoto = this.fb.group({
                photoFlag: ['', Validators.required]
            });
            this.frmNaturalBasicData = this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
                cellphone: ['', [Validators.required, Validators.min(9)]],
                address: ['', Validators.required],
                phone: ['', [Validators.required, Validators.min(7)]],
                email: ['', [Validators.required, Validators.email]],
                notes: [''],
            });
            // this.frmNaturalBankAccounts = this.fb.group({
            //     bankAccounts: this.fb.array([])
            // });
        } else {
            this.frmLegalPhoto = this.fb.group({
                firstCtrl: ['', Validators.required]
            });
            this.frmLegalBasicData = this.fb.group({
                secondCtrl: ['', Validators.required]
            });
            this.frmLegalContacts = this.fb.group({
                thirdCtrl: ['', Validators.required]
            });
            this.frmLegalBankAccounts = this.fb.group({
                fourthCtrl: ['', Validators.required]
            });
        }
    }

    fillForm() {
        if (this.providerType == 1) {
            // this.frmNaturalBasicData.patchValue(this.provider)
            this.frmNaturalBasicData.patchValue(this.provider)
        } else {
        }
    }

    setValidateForm() {
        // this.data.action == 'update' ? this.createForm(this.data.provider) : this.createForm('');
        // this.provider=
    }

    onChangePhoto(photo: Blob) {
        if (photo) {
            this.frmNaturalPhoto.setValue({ photoFlag: 'OK' });
        }
    }
    onCloseCancel() {
        this.thisDialogRef.close("Cancel")
    }



    // private refreshBankAccounts(bankAccount: BankAccount) {
    //     console.log(this.currentEnterprise.id, "id de empresa catual");
    //     this.bankAccounts.push(bankAccount);
    //     // this.service.getList(this.currentEnterprise.id).subscribe(
    //     //     res => this.groups = res.json()
    //     // )
    //     // console.log(this.groups);
    // }



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
        if (this.providerType == 1) {
            if (this.frmLegalPhoto.valid && this.frmNaturalBasicData.valid && this.frmNaturalBankAccounts.valid) {
                this.loader = true;
                const value = Object.assign({}, this.frmLegalPhoto.value, this.frmNaturalBasicData, this.frmNaturalBankAccounts);
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
            if (this.frmLegalPhoto.valid && this.frmLegalBasicData.valid && this.frmLegalContacts.valid && this.frmLegalBankAccounts.valid) {
                this.loader = true;
                const value = Object.assign({}, this.frmLegalPhoto.value, this.frmLegalBasicData, this.frmLegalContacts, this.frmLegalBankAccounts);
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
    //Modal CRUD BANK ACCOUNT
    refreshBankAccounts() {

    }

    crud(action: string, bankAccount: BankAccount = undefined) {
        if (action == 'delete') {
            this.delete(Object.assign({}, bankAccount));
            return
        }
        let dialogRef = this.matDialog.open(AccountsBankModalCrudComponent, {
            width: '380px',
            data: {
                action: action,
                bankAccount: Object.assign({}, bankAccount),
                bankAccounts: Object.assign(this.bankAccounts),
            }
        });
        dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
            if (!result.cancelled) this.refreshBankAccounts()
        })
    }

    private delete(bankAccount: BankAccount) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar la cuenta bancaria ${bankAccount.bankName}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                for (var index = 0; index < this.bankAccounts.length; index++) {
                    if (bankAccount.bankName == this.bankAccounts[index].bankName) this.bankAccounts.splice(index, 1)
                }
            }
        });
    }
}
