import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//modules
import { GroupService } from '../../core/services/groups.service'
import { Order } from "../../shared/models/order";
import { EnterprisesService, EnterpriseListDataSource } from '../../core/services/enterprises.service';
import { Enterprise } from '../../shared/models/enterprise';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';
//components
import { ReportModalCrudComponent } from "../report-modal-crud/report-modal-crud.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";



@Component({
    moduleId: module.id,
    selector: 'report-list',
    templateUrl: 'report-list.component.html',
    styleUrls: ['report-list.component.scss']
})
export class ReportListComponent {
    groups: any = [];
    days: any = [];
    months: any = [];
    years: any = [];
    date: any;

    public currentUser: User;
    public currentEnterprise: Enterprise;
    constructor(
        private matDialog: MatDialog,
        private groupService: GroupService,
        private users: UsersService,
        private enterprises: EnterprisesService
    ) {
        enterprises.getCurrentEnterprise().subscribe(e => this.currentEnterprise = e);
        users.getCurrentUser().subscribe(u => this.currentUser = u);
    }

    ngOnInit() {
        // this.refreshGroups();
        this.date = {
            day: '',
            month: '',
            year: ''
        }
        this.days = [
            { value: 'todos' },
            { value: 'lunes' },
            { value: 'martes' },
            { value: 'miercoles' },
            { value: 'jueves' },
            { value: 'viernes' },
            { value: 'sábado' },
            { value: 'domingo' },
        ];
        this.months = [
            { value: 'todos' },
            { value: 'Enero' },
            { value: 'Febrero' },
            { value: 'Marzo' },
            { value: 'Abril' },
            { value: 'Mayo' },
            { value: 'Junio' },
            { value: 'Julio' },
            { value: 'Agosto' },
            { value: 'Setiembre' },
            { value: 'Octubre' },
            { value: 'Noviembre' },
            { value: 'Diciembre' },
        ];
        this.years = [
            { value: '2017' },
            { value: '2018' },
            { value: '2019' },
        ];
    }
    private refreshGroups() {
        // console.log(this.currentEnterprise.id, "id de empresa catual");

        // this.groupService.getList(this.currentEnterprise.id).subscribe(
        //     res => this.groups = res
        // )
        // console.log(this.groups);
    }

    crud(action: string, order: Order = undefined) {
        if (action == 'delete') {
            this.delete(Object.assign({}, order));
            return
        }
        let dialogRef = this.matDialog.open(ReportModalCrudComponent, {
            width: '440px',
            data: {
                action: action,
                order: Object.assign({}, order)
            }
        });
        dialogRef.afterClosed().subscribe((result: { cancelled: boolean }) => {
            if (!result.cancelled) this.refreshGroups()
        })
    }

    private delete(order: Order) {
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: `¿Esta seguro de eliminar la orden ${order.orderName}?`
            }
        });
        dialogRef.afterClosed().subscribe(confirm => {
            // if (confirm) this.service.delete(order.id).subscribe(() => this.refreshGroups());
        });
    }
}
