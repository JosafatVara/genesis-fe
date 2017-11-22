import { Provider } from './../../shared/models/provider';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//modules
import { ToastService } from "../../core/utils/toast/toast.service";
import { ContactsService } from './../../core/services/contacs.service';
//components
import { Contact } from "../../shared/models/contact";


@Component({
    moduleId: module.id,
    selector: 'contacts-modal-crud',
    templateUrl: 'contacts-modal-crud.component.html',
    styleUrls: ['contacts-modal-crud.component.scss']
})
export class ContactsModalCrudComponent {
    // public currentEnterprise: Enterprise;
    loader: boolean;
    btnLabel: string;
    groupForm: FormGroup;
    positionUpdate: number;
    constructor(
        public thisDialogRef: MatDialogRef<ContactsModalCrudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, contact: Contact, contacts: Contact[], provider: Provider },
        private fb: FormBuilder,
        private toast: ToastService,
        private contactsService: ContactsService,

    ) { }

    ngOnInit() {
        this.validateForm(this.data.contact);
        this.setBtnLabel();
        this.getPosition();
    }

    cancel() {
        this.thisDialogRef.close({ cancelled: true })
    }

    validateForm(data) {
        this.groupForm = this.fb.group({
            firstName: [data.firstName, Validators.required],
            lastName: [data.lastName, Validators.required],
            position: [data.position, Validators.required],
            phone: [data.phone, [Validators.required, Validators.min(1)]],
            email: [data.email, [Validators.required, Validators.email]],
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
            for (var index = 0; index < this.data.contacts.length; index++) {
                if (
                    this.data.contact.phone == this.data.contacts[index].phone &&
                    this.data.contact.email == this.data.contacts[index].email
                ) {
                    this.positionUpdate = index;
                }
            }
        }
    }

    doAction() {
        switch (this.data.action) {
            case 'create':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    for (var index = 0; index < this.data.contacts.length; index++) {
                        // if (value.phone == this.data.contacts[index].phone || value.email == this.data.contacts[index].email) {
                        //     this.toast.error('El contacto ya existe');
                        //     return
                        // }
                    }
                    console.log(this.data.provider.id);
                    this.data.provider.id ? this.contactsService.create(value, this.data.provider.id).subscribe() : this.data.contacts.push(value)
                    this.thisDialogRef.close({ cancelled: false })
                }
                break;
            case 'update':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    console.log(this.positionUpdate);
                    for (var index = 0; index < this.data.contacts.length; index++) {
                        // if ((value.phone == this.data.contacts[index].phone || value.email == this.data.contacts[index].email) && index != this.positionUpdate) {
                        //     this.toast.error('El contacto ya existe');
                        //     return
                        // }
                        this.data.contacts.splice(this.positionUpdate, 1);
                    }
                    console.log(this.data.provider.id);
                    this.data.provider.id ? this.contactsService.update(value, this.data.provider.id).subscribe() : this.data.contacts.push(value)
                    // this.data.contacts.push(value);
                    this.thisDialogRef.close({ cancelled: false })
                }
                break;
            default: break;
        }
    }
}
