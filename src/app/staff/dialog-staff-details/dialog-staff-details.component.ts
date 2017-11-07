import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from '../../shared/models/employee';
import { EmployeesService } from '../../core/services/employees.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '../../shared/components/base/base-component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gen-dialog-staff-details',
  templateUrl: './dialog-staff-details.component.html',
  styleUrls: ['./dialog-staff-details.component.scss']
})
export class DialogStaffDetailsComponent extends BaseComponent implements OnInit {

  public mode: string
  public employee: Employee;

  constructor(private employees: EmployeesService, private dialogRef: MatDialogRef<DialogStaffDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, employee: Employee}) {
    super();
    this.mode = data.mode || 'read';
    this.employee = data.mode == 'create'? new Employee() : data.employee;
  }

  ngOnInit() {
  }

  onCrudComponentFinish(employee: Employee){
    this.loadingOn();
    let observable: Observable<Employee>;
    switch(this.mode){
      case 'create':
        observable = this.employees.create(employee);
        break;
      case 'update':
        observable = this.employees.update(employee);
        break;
      default:
        observable = Observable.of(undefined);
    }
    observable.subscribe( e => {
      if(e!=undefined){
        this.dialogRef.close({cancelled:false});
      }else{

      }
    },err=>{this.loadingOff();},()=>{this.loadingOff()});
  }


}
