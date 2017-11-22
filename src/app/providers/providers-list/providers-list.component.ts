import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//modules
import { ProviderService } from '../../core/services/providers.service'
import { Provider } from "../../shared/models/provider";
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
//components
import { ProvidersModalCrudComponent } from "../providers-modal-crud/providers-modal-crud.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
    moduleId: module.id,
    selector: 'providers-list',
    templateUrl: 'providers-list.component.html',
    styleUrls: ['providers-list.component.scss']
})
export class ProvidersListComponent implements OnInit {
    providers: any = [];
    public currentUser: User;
    public currentEnterprise: Enterprise;
    constructor(
        private matDialog: MatDialog,
        private providerService: ProviderService,
        private users: UsersService,
        private enterprises: EnterprisesService
    ) {
        enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
        users.getCurrentUser().subscribe(u => this.currentUser = u);
    }

    ngOnInit() {
        this.refreshProviders();
    }

    private refreshProviders() {
        this.providerService.getList(this.currentEnterprise.id).subscribe(res => this.providers = res);
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
                provider: Object.assign({}, provider)
            }
        });
        dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
            // if (!result.cancelled) 
            this.refreshProviders()
        })
    }

    private delete(provider: Provider) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar el proveedor ${provider.firstName}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) this.providerService.delete(provider.id).subscribe(() => this.refreshProviders());
        });
    }
}
