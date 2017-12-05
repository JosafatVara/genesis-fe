import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { EmployeesService } from '../../core/services/employees.service';
import { Employee } from '../../shared/models/employee';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { DialogStaffDetailsComponent } from '../dialog-staff-details/dialog-staff-details.component';
import { Observable } from 'rxjs/Observable';
import { PaginationInstance } from 'ngx-pagination';
import { FormControl } from '@angular/forms';
import { EmployeesSearchPagedSpecification } from '../../core/services/specifications/employee-specification';

@Component({
  selector: 'gen-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  public inDashboard: boolean;
  public employeeList: Observable<Array<Employee>>;
  public config: PaginationInstance;
  public searchFC: FormControl;

  constructor(private employees: EmployeesService, route: ActivatedRoute,private matDialog: MatDialog) {
    route.data.subscribe( (data: {inDashboard:boolean}) => this.inDashboard = data.inDashboard);
    this.config = {
      id: 'pagination',
      itemsPerPage: 5,
      currentPage: 1
    };
  }

  //#region lyfecycle
  ngOnInit() {
    this.searchFC = new FormControl();
    this.searchFC.valueChanges.debounceTime(500).subscribe( () => this.load() );
    this.load();
  }
  //#endregion  
  load(page?: number){
      page = page || this.config.currentPage;
    this.config.currentPage = page;
    let specification = new EmployeesSearchPagedSpecification(this.searchFC.value || '',page,this.config.itemsPerPage);
    this.employees.get(specification)
        .do( list => {
            this.config.totalItems = specification.size;
            this.employeeList = Observable.of(list);
        })
        .catch( err => {
            return Observable.of([])
        } ).subscribe();
  }

  public crud(mode: string, employee: Employee = undefined ){
    if(mode=='delete'){
      this.delete(Object.assign({},employee));
      return;
    }
    let dialogRef = this.matDialog.open(DialogStaffDetailsComponent,{
      disableClose: true,
      width: '80%',
      data: {
        mode: mode,
        employee: Object.assign({},employee)
      }
    });
    dialogRef.afterClosed().subscribe( (result: { cancelled: boolean }) => {
      if(result&&!result.cancelled){
        this.load();
      }
    });
  }

  private delete(employee: Employee){
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Eliminar al trabajador ${employee.firstName} ${employee.lastName}?`
      }
    });
    dialogRef.afterClosed().subscribe( confirm => {
      if(confirm){
        this.employees.delete(employee).subscribe( () => this.load());
      }
    });
  }


}
