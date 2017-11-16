import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//modules
import { Service } from '../../core/services/providers.service'
import { Provider } from "../../shared/models/provider";
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
import { Group } from "../../shared/models/group";
//components
import { ProvidersModalCrudComponent } from "../providers-modal-crud/providers-modal-crud.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";


@Component({
    moduleId: module.id,
    selector: 'contacts-modal-crud',
    templateUrl: 'contacts-modal-crud.component.html',
    styleUrls: ['contacts-modal-crud.component.scss']
})
export class ContactsModalCrudComponent implements OnInit {
    public currentEnterprise: Enterprise;
    loader: boolean;
    btnLabel: string;
    providers: any = [];
    groupForm: FormGroup;
    constructor(
        public thisDialogRef: MatDialogRef<ContactsModalCrudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, group: Group },
        private fb: FormBuilder,
        private service: Service,
        private enterprises: EnterprisesService,
        private matDialog: MatDialog,
        private users: UsersService,
    ) {
        enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
    }
    ngOnInit() {
        this.setValidateForm();
        this.setBtnLabel();
        this.refreshProviders();
    }

    cancel() {
        this.thisDialogRef.close({ cancelled: true })
    }

    validateForm(data) {
        this.groupForm = this.fb.group({
            name: [data, Validators.required]
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
        this.data.action == 'update' ? this.validateForm(this.data.group.name) : this.validateForm('');
    }

    doAction() {
        switch (this.data.action) {
            case 'create':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    this.service.create(value, this.currentEnterprise.id).subscribe(
                        (res) => {
                            this.thisDialogRef.close({ cancelled: false });
                        },
                        (err) => {
                        }
                    )
                }
                break;
            case 'update':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    this.service.update(value, this.data.group.id).subscribe(
                        (res) => {
                            this.thisDialogRef.close({ cancelled: false });
                        },
                        (err) => {
                        }
                    )
                }
                break;
            default:
                break;
        }
        if (this.data.action == 'update') {

        } else {

        }
    }

    private refreshProviders() {
        this.service.getList(0).subscribe(
            res => this.providers = res.json()
        )
        console.log(this.providers, "holi bolio");

    }

    crud(action: string, provider: Provider = undefined) {
        if (action == 'delete') {
            this.delete(Object.assign({}, provider));
            return
        }
        let dialogRef = this.matDialog.open(ProvidersModalCrudComponent, {
            width: '800px',
            data: {
                action: action,
                group: Object.assign({}, provider)
            }
        });
        dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
            if (!result.cancelled) this.refreshProviders()
        })
    }

    private delete(provider: Provider) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar el proveedor ${provider.firstName}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) this.service.delete(provider.id).subscribe(() => this.refreshProviders());
        });
    }

}
