import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { Service } from '../../core/services/groups.service'
// import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
// import { Enterprise } from '../../shared/models/enterprise';
//modules
import { ToastService } from "../../core/utils/toast/toast.service";
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
        @Inject(MAT_DIALOG_DATA) public data: { action: string, contact: Contact, contacts: Contact[] },
        private fb: FormBuilder,
        private toast: ToastService
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
            // array.forEach(element => {

            // });
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

    // setValidateForm() {
    //     if (this.data.action == 'update') {
    //         // this.validateForm(this.data.bankAccount.bankName)
    //         // this.validateForm(this.data.bankAccount.number)
    //         console.log(this.data.bankAccount,"update");

    //     } else {
    //         this.validateForm('')
    //         console.log(this.data.bankAccount,"create");

    //     }
    // }

    doAction() {
        switch (this.data.action) {
            case 'create':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    for (var index = 0; index < this.data.contacts.length; index++) {
                        if (value.phone == this.data.contacts[index].phone || value.email == this.data.contacts[index].email) {
                            this.toast.error('El contacto ya existe');
                            return
                        }
                    }
                    this.data.contacts.push(value);
                    this.thisDialogRef.close({ cancelled: false })
                }
                break;
            case 'update':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    console.log(this.positionUpdate);
                    for (var index = 0; index < this.data.contacts.length; index++) {
                        if ((value.phone == this.data.contacts[index].phone || value.email == this.data.contacts[index].email) && index != this.positionUpdate) {
                            this.toast.error('El contacto ya existe');
                            return
                        }
                        this.data.contacts.splice(this.positionUpdate, 1);
                    }
                    this.data.contacts.push(value);
                    this.thisDialogRef.close({ cancelled: false })
                }
                break;
            default:
                break;
        }
    }
}
