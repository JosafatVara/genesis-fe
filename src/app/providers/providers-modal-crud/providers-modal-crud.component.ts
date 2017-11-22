// import { element } from 'protractor';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//modules
import { Provider } from "../../shared/models/provider";
import { BankAccount } from "../../shared/models/bank-account";
import { Contact } from '../../shared/models/contact';
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { ProviderService } from '../../core/services/providers.service'
import { UsersService } from '../../core/services/users.service';
import { BankAccountService } from './../../core/services/bank-account.service';
import { GroupService } from './../../core/services/groups.service';
import { ImagesService } from '../../core/utils/images/images.service';
import { ContactsService } from '../../core/services/contacs.service';
//components
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { AccountsBankModalCrudComponent } from "../accounts-bank-modal-crud/accounts-bank-modal-crud.component";
import { ContactsModalCrudComponent } from "../contacts-modal-crud/contacts-modal-crud.component";
import { log } from 'util';

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
    groupList: any[] = [];
    group: number;

    frmNaturalPhoto: FormGroup;
    frmNaturalBasicData: FormGroup;
    frmNaturalBankAccounts: FormGroup;

    frmLegalPhoto: FormGroup;
    frmLegalBasicData: FormGroup;
    frmLegalContacts: FormGroup;
    frmLegalBankAccounts: FormGroup;

    bankAccounts: BankAccount[] = [];
    contacts = [];

    constructor(
        private matDialog: MatDialog,
        public thisDialogRef: MatDialogRef<ProvidersModalCrudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, provider: Provider },
        private fb: FormBuilder,
        private providerService: ProviderService,
        private bankAccountService: BankAccountService,
        private contactService: ContactsService,
        private enterprises: EnterprisesService,
        private images: ImagesService,
        private groupService: GroupService
    ) {
        this.enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
    }

    ngOnInit() {
        this.initializePerson();
        this.setBtnLabel();
    }

    onCloseConfirm() {
        this.thisDialogRef.close();
    }

    initializePerson() {
        if (this.data.action == 'create') { this.providerType = 0; }
        else {
            if (this.data.provider.type == 'PERSONA') { this.providerType = 1; }
            else { this.providerType = 2; }
            this.selectPerson(this.providerType);
            this.refreshBankAccounts();
            this.refreshContacts();
        }
    }

    selectPerson(selected) {
        this.providerType = selected;
        this.provider = this.data.action == 'create' ? new Provider : this.data.provider;
        this.createForm();
        this.fillForm();
        this.getGroupList();
        this.providerPhoto = 'http://genesis.indagostudio.pe'+this.provider.photo;
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
                photo: ['',]
            });
            this.frmNaturalBasicData = this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                ruc: ['', [Validators.required, Validators.min(11)]],
                cellphone: ['', [Validators.required, Validators.min(9)]],
                address: ['', Validators.required],
                phone: ['', [Validators.required, Validators.min(7)]],
                email: ['', [Validators.required, Validators.email]],
                notes: [''],
            });
            this.frmNaturalBankAccounts = this.fb.group({
                bankAccounts: this.fb.array([])
            });
        } else {
            this.frmLegalPhoto = this.fb.group({
                photo: ['',]
            });
            this.frmLegalBasicData = this.fb.group({
                businessName: ['', Validators.required],
                address: ['', Validators.required],
                ruc: ['', [Validators.required, Validators.min(11)]],
                phone: ['', [Validators.required, Validators.min(7)]],
                group: ['', Validators.required],
                notes: ['', Validators.required],
            });
            this.frmLegalContacts = this.fb.group({
                contacts: this.fb.array([])
            });
            this.frmLegalBankAccounts = this.fb.group({
                bankAccounts: this.fb.array([])
            });
        }
    }

    fillForm() {
        if (this.providerType == 1) {
            // this.frmNaturalBasicData.patchValue(this.provider)
            this.frmNaturalBasicData.patchValue(this.provider)
            this.frmNaturalPhoto.patchValue({ photo: this.providerPhoto })
            if (this.data.action == 'update') {
                this.frmNaturalPhoto.patchValue(this.provider)
            }
        } else {
            this.frmLegalBasicData.patchValue(this.provider)
            this.frmLegalPhoto.patchValue({ photo: this.providerPhoto })
            if (this.data.action == 'update') {
                this.frmLegalPhoto.patchValue(this.provider)
            }
        }
    }

    onChangePhoto(photo: Blob) {
        if (photo) {
            console.log(photo);
            switch (this.providerType) {
                case 1: this.frmNaturalPhoto.setValue({ photo: photo }); break;
                case 2: this.frmLegalPhoto.setValue({ photo: photo }); break;
                default: break;
            }
        }
    }

    onCloseCancel() {
        this.thisDialogRef.close("Cancel")
    }

    getGroupList() {
        this.groupService.getList(this.currentEnterprise.id).subscribe(res => this.groupList = res);
    }
    // private refreshBankAccounts(bankAccount: BankAccount) {
    //     console.log(this.currentEnterprise.id, "id de empresa catual");
    //     this.bankAccounts.push(bankAccount);
    //     // this.service.getList(this.currentEnterprise.id).subscribe(
    //     //     res => this.groups = res.json()
    //     // )
    //     // console.log(this.groups);
    // }


    doAction() {
        if (this.providerType == 1) {
            if (this.frmNaturalPhoto.valid && this.frmNaturalBasicData.valid && this.frmNaturalBankAccounts.valid) {
                const dataProvider = Object.assign({}, { photo: this.providerPhoto }, this.frmNaturalBasicData.value, { type: "PERSONA" });
                if (this.data.action == 'create') {
                    this.providerService.create(dataProvider, this.currentEnterprise.id).subscribe(
                        res => {
                            this.bankAccounts.forEach(element => {
                                this.bankAccountService.create(element, res.id)
                            });
                            this.thisDialogRef.close({ cancelled: false })
                        }
                    )
                } else {
                    this.providerService.update(dataProvider, this.currentEnterprise.id).subscribe(res => {
                        this.thisDialogRef.close({ cancelled: false })
                    });

                }

            }
        } else {
            if (this.frmLegalPhoto.valid && this.frmLegalBasicData.valid && this.frmLegalContacts.valid && this.frmLegalBankAccounts.valid) {
                const dataProvider = Object.assign({}, { photo: this.providerPhoto }, this.frmLegalBasicData.value, { type: "EMPRESA" });
                console.log(this.providerPhoto, "photo");

                if (this.data.action == 'create') {
                    this.providerService.create(dataProvider, this.currentEnterprise.id).subscribe(
                        res => {
                            this.bankAccounts.forEach(element => {
                                this.bankAccountService.create(element, res.id).subscribe()
                            });
                            this.contacts.forEach(element => {
                                this.contactService.create(element, res.id).subscribe()
                            });
                            this.thisDialogRef.close({ cancelled: false })
                        }
                    )
                } else {
                    this.providerService.update(dataProvider, this.currentEnterprise.id).subscribe(res => {
                        this.thisDialogRef.close({ cancelled: false })
                    });
                }

            }
        }
    }

    //Modal CRUD BANK ACCOUNT
    refreshBankAccounts() {
        this.bankAccountService.getList(this.data.provider.id).subscribe(res => this.bankAccounts = res)
    }

    crudBankAccount(action: string, bankAccount: BankAccount = undefined) {
        if (action == 'delete') {
            this.deleteBankAccount(Object.assign({}, bankAccount));
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
            if (!result.cancelled && action == 'update') this.refreshBankAccounts()
        })
    }

    private deleteBankAccount(bankAccount: BankAccount) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar la cuenta bancaria ${bankAccount.number}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                if (this.provider.id) {
                    this.contactService.delete(bankAccount.id).subscribe(res => {
                        this.refreshBankAccounts()
                    })
                } else {
                    for (var index = 0; index < this.bankAccounts.length; index++) {
                        if (bankAccount.bankName == this.bankAccounts[index].bankName) this.bankAccounts.splice(index, 1)
                    }
                }

            }
        });
    }

    //MODAL CRUD CONTACTS
    refreshContacts() {
        this.contactService.getList(this.data.provider.id).subscribe(res => this.contacts = res)
    }

    crudContact(action: string, contact: Contact = undefined) {
        if (action == 'delete') {
            this.deleteContact(Object.assign({}, contact));
            return
        }
        let dialogRef = this.matDialog.open(ContactsModalCrudComponent, {
            width: '380px',
            data: {
                action: action,
                contact: Object.assign({}, contact),
                contacts: Object.assign(this.contacts),
                provider: this.provider
            }
        });
        dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
            if (!result.cancelled && this.provider.id) this.refreshContacts()
        })
    }

    private deleteContact(contact: Contact) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar el contacto ${contact.firstName} ${contact.lastName}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                if (this.provider.id) {
                    console.log(this.provider.id, "id provider");
                    this.contactService.delete(contact.id).subscribe(res => {
                        this.refreshContacts()
                    })
                } else {
                    for (var index = 0; index < this.bankAccounts.length; index++) {
                        if (contact.firstName == this.bankAccounts[index].bankName) this.bankAccounts.splice(index, 1)
                    }
                }
            }
        });
    }
}
