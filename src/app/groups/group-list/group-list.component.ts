import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


//modules
import { Service } from '../../core/services/groups.service'
import { Group } from "../../shared/models/group";
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
// import { Refresher } from '../../core/services/shared/refresher';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
//components
import { GroupModalCrudComponent } from "../group-modal-crud/group-modal-crud.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";



@Component({
    moduleId: module.id,
    selector: 'group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.scss']
})
export class GroupListComponent implements OnInit {

    groups: any = [];
    public currentUser: User;
    public currentEnterprise: Enterprise;
    constructor(private matDialog: MatDialog, private service: Service, private users: UsersService, private enterprises: EnterprisesService) {
        enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
        users.getCurrentUser().subscribe(u => this.currentUser = u);
    }

    ngOnInit() {
        this.refreshGroups();
    }

    private refreshGroups() {
        this.service.getList(this.currentEnterprise.id).subscribe(
            res => this.groups = res
            // console.log(res);

        )
        console.log(this.groups, "gruipos");

    }

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
            if (!result.cancelled) this.refreshGroups()
        })
    }

    private delete(group: Group) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar el grupo ${group.name}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) this.service.delete(group).subscribe(() => this.refreshGroups());
        });
    }
}
