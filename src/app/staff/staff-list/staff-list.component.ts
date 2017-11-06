import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { EmployeesService } from '../../core/services/employees.service';
import { Employee } from '../../shared/models/employee';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { DialogStaffDetailsComponent } from '../dialog-staff-details/dialog-staff-details.component';

@Component({
  selector: 'gen-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  public inDashboard: boolean;
  public employeeList: Array<Employee>;

  constructor(private employees: EmployeesService, route: ActivatedRoute,private matDialog: MatDialog) {
    route.data.subscribe( (data: {inDashboard:boolean}) => this.inDashboard = data.inDashboard);
  }

  //#region lyfecycle
  ngOnInit() {
    this.refreshEmployeeList();
  }
  //#endregion
  

  private refreshEmployeeList(){
    this.employees.get().subscribe( es => this.employeeList = es );
  }

  public crud(mode: string, employee: Employee = undefined ){
    if(mode=='delete'){
      this.delete(Object.assign({},employee));
      return;
    }
    let dialogRef = this.matDialog.open(DialogStaffDetailsComponent,{
      disableClose: true,
      width: '750px',
      data: {
        mode: mode,
        user: Object.assign({},employee)
      }
    });
    dialogRef.afterClosed().subscribe( (result: { cancelled: boolean }) => {
      if(result&&!result.cancelled){
        this.refreshEmployeeList();
      }
    });
  }

  private delete(employee: Employee){
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Eliminar el usuario ${employee.firstName} ${employee.lastName}?`
      }
    });
    dialogRef.afterClosed().subscribe( confirm => {
      if(confirm){
        this.employees.delete(employee).subscribe( () => this.refreshEmployeeList());
      }
    });
  }


}
