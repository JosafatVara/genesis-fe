import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//modules
import { CustomerService } from '../../core/services/customers.service'
import { Customer } from "../../shared/models/customer";
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
//components
import { CustomerModalCrudComponent } from "../customer-modal-crud/customer-modal-crud.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
    moduleId: module.id,
    selector: 'customer-list',
    templateUrl: 'customer-list.component.html',
    styleUrls: ['customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
    customers: any = [];
    public currentUser: User;
    public currentEnterprise: Enterprise;
    constructor(
        private matDialog: MatDialog,
        private customerService: CustomerService,
        private users: UsersService,
        private enterprises: EnterprisesService
    ) {
        enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
        users.getCurrentUser().subscribe(u => this.currentUser = u);
    }

    ngOnInit() {
        this.refreshCustomers();
    }

    private refreshCustomers() {
        this.customerService.getList(this.currentEnterprise.id).subscribe(res => this.customers = res);
    }

    crud(action: string, customer: Customer = undefined) {
        if (action == 'delete') {
            this.delete(Object.assign({}, customer));
            return
        }
        let dialogRef = this.matDialog.open(CustomerModalCrudComponent, {
            width: '800px',
            data: {
                action: action,
                customer: Object.assign({}, customer)
            }
        });
        dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
            // if (!result.cancelled) 
            this.refreshCustomers()
        })
    }

    private delete(provider: Customer) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar el cliente ${provider.firstName}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) this.customerService.delete(provider.id).subscribe(() => this.refreshCustomers());
        });
    }
}
