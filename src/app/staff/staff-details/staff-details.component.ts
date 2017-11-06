import { Component, OnInit, Input } from '@angular/core';
import { CrudComponent } from "../../shared/components/base/crud-component";
import { Employee } from "../../shared/models/employee";
import { EmployeesService } from "../../core/services/employees.service";
import { ImagesService } from "../../core/utils/images.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'gen-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent extends CrudComponent<Employee> implements OnInit{
  
  @Input('employee') employee: Employee;
  protected title: string;
  protected buttonLabel: string;
  employeePhoto: any;
  frmPersonalInformation: FormGroup

  constructor(employees: EmployeesService,private images: ImagesService) { 
    super(employees);
  }

  ngOnInit() {
    this.managedEntity = this.employee || this.managedEntity;
    this.images.getBlobFromImageUrl(this.managedEntity.photoPublicUrl).subscribe( image => {
      this.employeePhoto = image;
    });
  }

  //#region FormManagement

  //#endregion

}
