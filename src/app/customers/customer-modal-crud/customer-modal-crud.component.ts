import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//modules
import { Customer } from "../../shared/models/customer";
import { Contact } from '../../shared/models/contact';
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { CustomerService } from '../../core/services/customers.service'
import { UsersService } from '../../core/services/users.service';
import { ContactsService } from '../../core/services/contacs.service';
//components
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { ContactModalCrudComponent } from "../contact-modal-crud/contact-modal-crud.component";

@Component({
    moduleId: module.id,
    selector: 'customer-modal-crud',
    templateUrl: 'customer-modal-crud.component.html',
    styleUrls: ['customer-modal-crud.component.scss']
})
export class CustomerModalCrudComponent {
    public currentEnterprise: Enterprise;
    customerType: number;
    btnLabel: string;
    loader: boolean;
    isLinear = true;
    // customerPhoto: any;
    customer: any;
    // photo: Blob;
    customerPhoto: any;

    frmNaturalPhoto: FormGroup;
    frmNaturalBasicData: FormGroup;

    frmLegalPhoto: FormGroup;
    frmLegalBasicData: FormGroup;
    frmLegalContacts: FormGroup;

    contacts = [];

    constructor(
        private matDialog: MatDialog,
        public thisDialogRef: MatDialogRef<CustomerModalCrudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, customer: Customer },
        private fb: FormBuilder,
        private customerService: CustomerService,
        private contactService: ContactsService,
        private enterprises: EnterprisesService,
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
        if (this.data.action == 'create') { this.customerType = 0; }
        else {
            if (this.data.customer.type == 'PERSONA') { this.customerType = 1; }
            else { this.customerType = 2; }
            this.selectPerson(this.customerType);
            // this.refreshContacts();
        }
    }

    selectPerson(selected) {
        this.customerType = selected;
        this.customer = this.data.action == 'create' ? new Customer() : this.data.customer;
        this.createForm();
        this.fillForm();
        this.customerPhoto = this.customer.photo;
    }

    setBtnLabel() {
        switch (this.data.action) {
            case 'create': this.btnLabel = 'crear'; break;
            case 'update': this.btnLabel = 'guardar'; break;
            default: break;
        }
    }

    createForm() {
        if (this.customerType == 1) {
            this.frmNaturalPhoto = this.fb.group({
                photo: ['']
            });
            this.frmNaturalBasicData = this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                ruc: ['', [Validators.required, Validators.min(11)]],
                cellphone: ['', [Validators.required, Validators.min(9)]],
                address: ['', Validators.required],
                phone: ['', [Validators.required, Validators.min(7)]],
                email: ['', [Validators.required, Validators.email]],
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

            });
            this.frmLegalContacts = this.fb.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                position: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                cellphone: ['', [Validators.required, Validators.min(7)]],
            });
        }
    }

    fillForm() {
        if (this.customerType == 1) {
            this.frmNaturalBasicData.patchValue(this.customer)
            this.frmNaturalPhoto.patchValue({ photo: this.customerPhoto })
            if (this.data.action == 'update') this.frmNaturalPhoto.patchValue(this.customer)
        } else {
            this.frmLegalBasicData.patchValue(this.customer)
            this.frmLegalContacts.patchValue(this.customer)
            this.frmLegalPhoto.patchValue({ photo: this.customerPhoto })
            if (this.data.action == 'update') this.frmLegalPhoto.patchValue(this.customer)
        }
    }

    onChangePhoto(photo: Blob) {
        if (photo) {
            console.log(photo);
            switch (this.customerType) {
                case 1: this.frmNaturalPhoto.setValue({ photo: photo }); break;
                case 2: this.frmLegalPhoto.setValue({ photo: photo }); break;
                default: break;
            }
        }
    }

    onCloseCancel() {
        this.thisDialogRef.close("Cancel")
    }

    doAction() {
        if (this.customerType == 1) {
            if (this.frmNaturalBasicData.valid) {
                const dataProvider = Object.assign({}, { photo: this.customerPhoto }, this.frmNaturalBasicData.value, { type: "PERSONA" });
                if (this.data.action == 'create') {
                    this.customerService.create(dataProvider, this.currentEnterprise.id).subscribe(res => { 
                        this.thisDialogRef.close(res);
                    })
                } else {
                    this.customerService.update(dataProvider, this.data.customer.id).subscribe( res => {
                        this.thisDialogRef.close({ cancelled: false });
                    });
                }

            }
        } else {
            if (this.frmLegalBasicData.valid && this.frmLegalContacts.valid) {
                // if (this.frmLegalPhoto.valid && this.frmLegalBasicData.valid && this.frmLegalContacts.valid) {
                const dataProvider = Object.assign({}, { photo: this.customerPhoto }, this.frmLegalBasicData.value, this.frmLegalContacts.value, { type: "EMPRESA" });
                if (this.data.action == 'create') {
                    this.customerService.create(dataProvider, this.currentEnterprise.id).subscribe(
                        res => {
                            // this.contacts.forEach(element => {
                            //     this.contactService.create(element, res.id).subscribe()
                            // });
                            this.thisDialogRef.close({ cancelled: false })
                        }
                    )
                } else {
                    this.customerService.update(dataProvider, this.data.customer.id).subscribe(res =>
                        this.thisDialogRef.close({ cancelled: false }));
                }
            }
        }
    }


    protected validate(): boolean {
        this.customer.photo = this.customerPhoto;
        this.customer.photoFileName = this.customerPhoto.name;
        return this.customer.photo != undefined && this.customer.photo != "";
    }
    
    //MODAL CRUD CONTACTS
    refreshContacts() {
        this.contactService.getList(this.data.customer.id).subscribe(res => this.contacts = res)
    }

    crudContact(action: string, contact: Contact = undefined) {
        if (action == 'delete') {
            this.deleteContact(Object.assign({}, contact));
            return
        }
        let dialogRef = this.matDialog.open(ContactModalCrudComponent, {
            width: '380px',
            data: {
                action: action,
                contact: Object.assign({}, contact),
                contacts: Object.assign(this.contacts),
                customer: this.customer
            }
        });
        dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
            if (!result.cancelled && this.customer.id) this.refreshContacts()
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
                if (this.customer.id) {
                    console.log(this.customer.id, "id provider");
                    this.contactService.delete(contact.id).subscribe(res => {
                        this.refreshContacts()
                    })
                } else {
                    for (var index = 0; index < this.contacts.length; index++) {
                        if (contact.firstName == this.contacts[index].bankName) this.contacts.splice(index, 1)
                    }
                }
            }
        });
    }
}