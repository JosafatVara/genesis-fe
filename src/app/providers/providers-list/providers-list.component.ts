import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//modules
import { ProviderService } from '../../core/services/providers.service'
import { Provider } from "../../shared/models/provider";
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';

//components
import { ProvidersModalCrudComponent } from "../providers-modal-crud/providers-modal-crud.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { ProvidersSearchPagedSpecification } from '../../core/services/specifications/provider-specification';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'providers-list',
    templateUrl: 'providers-list.component.html',
    styleUrls: ['providers-list.component.scss']
})
export class ProvidersListComponent implements OnInit {
    providers: Observable<Provider[]>;
    public currentUser: User;
    public currentEnterprise: Enterprise;
    public config: PaginationInstance;
    public searchFC: FormControl;

    constructor(
        private matDialog: MatDialog,
        private providerService: ProviderService,
        private users: UsersService,
        private enterprises: EnterprisesService
    ) {
        enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
        users.getCurrentUser().subscribe(u => this.currentUser = u);
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

    private load(page?: number){
        page = page || this.config.currentPage;
        this.config.currentPage = page;
        let specification = new ProvidersSearchPagedSpecification(this.searchFC.value || '',page,this.config.itemsPerPage);
        this.providerService.get(specification)
            .do( list => {
                this.config.totalItems = specification.size;
                this.providers = Observable.of(list);
            })
            .catch( err => {
                return Observable.of([])
            } ).subscribe();
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
            if(!result) return;
            this.load()
        })
    }

    private delete(provider: Provider) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar el proveedor ${provider.firstName}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) this.providerService.delete(provider.id).subscribe(() => this.load());
        });
    }
}
