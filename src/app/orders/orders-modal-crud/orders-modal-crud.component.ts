import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroupService } from '../../core/services/groups.service'
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { Order } from "../../shared/models/order";

@Component({
    moduleId: module.id,
    selector: 'orders-modal-crud',
    templateUrl: 'orders-modal-crud.component.html',
    styleUrls: ['orders-modal-crud.component.scss']
})
export class OrdersModalCrudComponent {
    public currentEnterprise: Enterprise;
    loader: boolean;
    btnLabel: string;
    groupForm: FormGroup;
    constructor(
        public thisDialogRef: MatDialogRef<OrdersModalCrudComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { action: string, order: Order },
        private fb: FormBuilder,
        private groupService: GroupService,
        private enterprises: EnterprisesService
    ) {
        enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
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
            client: [data, Validators.required],
            name: [data, Validators.required],
            quantity: [data, Validators.required]
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
        this.data.action == 'update' ? this.validateForm(this.data.order.orderName) : this.validateForm('');
    }

    doAction() {
        switch (this.data.action) {
            case 'create':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    // this.service.create(value, this.currentEnterprise.id).subscribe(res => this.thisDialogRef.close({ cancelled: false }))
                }
                break;
            case 'update':
                if (this.groupForm.valid) {
                    const value = this.groupForm.value;
                    // this.service.update(value, this.data.order.id).subscribe(res => this.thisDialogRef.close({ cancelled: false }))
                }
                break;
            default:
                break;
        }
    }
}
