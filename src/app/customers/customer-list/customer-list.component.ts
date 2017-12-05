import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//modules
import { CustomerService } from '../../core/services/customers.service'
import { Customer } from "../../shared/models/customer";
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
import { CustomerModalCrudComponent } from "../customer-modal-crud/customer-modal-crud.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { PaginationInstance } from 'ngx-pagination';
import { CustomersSearchPagedSpecification } from '../../core/services/specifications/customer-specification';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'customer-list',
    templateUrl: 'customer-list.component.html',
    styleUrls: ['customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
    customers: Observable<any[]>;
    public currentEnterprise: Enterprise;
    public config: PaginationInstance;
    public searchFC: FormControl

    constructor(
        private matDialog: MatDialog,
        private customerService: CustomerService,
    ) {
        // users.getCurrentUser().subscribe(u => this.currentUser = u);
        this.config = {
          id: 'pagination',
          itemsPerPage: 5,
          currentPage: 1
        };
    }

    ngOnInit() {
        this.searchFC = new FormControl();
        this.searchFC.valueChanges.debounceTime(500).subscribe( () => this.load() );
        this.load();
    }

    load(page?: number){
        page = page || this.config.currentPage;
        this.config.currentPage = page;
        let specification = new CustomersSearchPagedSpecification(this.searchFC.value || '',page,this.config.itemsPerPage);
        this.customerService.getList(specification)
            .do( list => {
                this.config.totalItems = specification.size;
                this.customers = Observable.of(list);
            })
            .catch( err => {
                return Observable.of([])
            } ).subscribe();
    }

    private refreshCustomers() {
        // this.customerService.getList(this.currentEnterprise.id).subscribe(res => this.customers = res);
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
        dialogRef.afterClosed().subscribe((result: { cancelled: boolean } | string) => {
            if(result != "" || result){
                this.load()
            }
        })
    }

    private delete(provider: Customer) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar el cliente ${provider.firstName}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) this.customerService.delete(provider.id).subscribe(() => this.load());
        });
    }
}
