import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { Group } from "../../shared/models/group";
//modules

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

    constructor(private matDialog: MatDialog) {
    }

    ngOnInit() {
    }

    private refreshGroups() {
        // this.Groups.get().subscribe(es => this.groupList = es);
    }

    crud(action: string, group?: Group) {
        if (action == 'delete') {

        }
        let dialogRef = this.matDialog.open(GroupModalCrudComponent, {
            width: '750px',
            data: {
                action: action,
                group: Object.assign({}, group)
            }
        });
        dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
            // if (!result.cancelled) this.refreshGroups()
        })
    }

    private delete(group: Group) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `Eliminar el grupo ${group.name}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                // this.groups.delete(group).subscribe(() => this.refreshGroups());
            }
        });
    }

}
