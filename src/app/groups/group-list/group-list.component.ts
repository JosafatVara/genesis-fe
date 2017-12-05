import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";


//modules
import { GroupService } from '../../core/services/groups.service'
import { Group } from "../../shared/models/group";
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
// import { Refresher } from '../../core/services/shared/refresher';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
//components
import { GroupModalCrudComponent } from "../group-modal-crud/group-modal-crud.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { Observable } from 'rxjs/Observable';
import { PaginationInstance } from 'ngx-pagination';
import { GroupsSearchPagedSpecification } from '../../core/services/specifications/group-specification';



@Component({
    moduleId: module.id,
    selector: 'group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.scss']
})
export class GroupListComponent implements OnInit {

    groups: Observable<Group[]>;
    public currentUser: User;
    public currentEnterprise: Enterprise;
    public config: PaginationInstance;
    public searchFC: FormControl;

    constructor(
        private matDialog: MatDialog,
        private groupService: GroupService,
        private users: UsersService,
        private enterprises: EnterprisesService) {
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
        let specification = new GroupsSearchPagedSpecification(this.searchFC.value || '',page,this.config.itemsPerPage);
        this.groupService.getList(specification)
            .do( list => {
                this.config.totalItems = specification.size;
                this.groups = Observable.of(list);
            })
            .catch( err => {
                return Observable.of([])
            } ).subscribe();
    }

    // private refreshGroups() {
    //     this.groupService.getList(this.currentEnterprise.id).subscribe(
    //         res => this.groups = res
    //         // console.log(res);

    //     )
    //     console.log(this.groups, "gruipos");

    // }

    crud(action: string, group: Group = undefined) {
        if (action == 'delete') {
            this.delete(Object.assign({}, group));
            return
        }
        let dialogRef = this.matDialog.open(GroupModalCrudComponent, {
            width: '350px',
            data: {
                action: action,
                group: Object.assign({}, group)
            }
        });
        dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
            if (!result.cancelled) this.load()
        })
    }

    private delete(group: Group) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar el grupo ${group.name}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) this.groupService.delete(group).subscribe(() => this.load());
        });
    }
}
