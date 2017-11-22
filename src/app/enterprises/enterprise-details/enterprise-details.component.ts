import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Enterprise } from '../../shared/models/enterprise';
import { EnterprisesService } from '../../core/services/enterprises.service';
import { Router } from '@angular/router';
import { Department } from '../../shared/models/department';
import { EmployeesQuantity } from '../../shared/models/employees-quantity';
import { DepartmentsService } from '../../core/services/departments.service';
import { EmployeesQuantitiesService } from '../../core/services/employees-quantities.service';
import { CrudComponent } from '../../shared/components/base/crud-component';
import { Observable } from 'rxjs/Observable';
import { ImagesService } from '../../core/utils/images/images.service';

@Component({
  selector: 'gen-enterprise-details',
  templateUrl: './enterprise-details.component.html',
  styleUrls: ['./enterprise-details.component.scss']
})
export class EnterpriseDetailsComponent extends CrudComponent<Enterprise> implements OnInit {  

  @Input('enterprise') enterprise: Enterprise;
  enterprisePhoto: any;
  public departmentList: Array<Department>;
  public employeesQuantityList: Array<EmployeesQuantity>;
  private enterprises: EnterprisesService;
  private router: Router;

  constructor(enterprises: EnterprisesService, router: Router, private departments: DepartmentsService
    , private employeesQuantities: EmployeesQuantitiesService, private images: ImagesService){ 
    super(enterprises);
    this.managedEntity = new Enterprise();
    this.employeesQuantityList = [new EmployeesQuantity({quantityDescription: '---'})];
    this.departmentList = [new Department({name: '---'})];
    this.enterprises = enterprises;
  }

  ngOnInit() {
    this.validateMode();
    this.managedEntity = this.enterprise || this.managedEntity;
    // if(this.managedEntity.photo){
    //   this.enterprisePhoto = this.managedEntity.photo;
    // }
    // if(this.managedEntity.photoPublicUrl){
    //   this.images.getBlobFromImageUrl(this.managedEntity.photoPublicUrl).subscribe( blob =>{
    //     this.enterprisePhoto = blob
    //   });    
    // }    
    Observable.forkJoin(
      this.departments.get(),this.employeesQuantities.get()).subscribe( results => {
        this.departmentList = results[0];
        this.employeesQuantityList = results[1];
        this.fillSelects();
      });
  }

  private fillSelects(): void{
    if(this.mode=='create'){
      this.managedEntity.department = this.departmentList[0];
      this.managedEntity.employeesQuantity = this.employeesQuantityList[0];
    }else{
      this.managedEntity.department = 
      this.managedEntity.department? this.departmentList.find( d => d.id == this.managedEntity.department.id) : undefined;
      this.managedEntity.employeesQuantity = 
      this.managedEntity.employeesQuantity? this.employeesQuantityList.find( eq => eq.id == this.managedEntity.employeesQuantity.id) : undefined;
    }
  }

  public get title(): string{
    return 'Datos de tu empresa';
  }

  public get buttonLabel(): string{
    let lbl = "";
    switch (this.mode){
      case 'create': lbl = 'Crear Empresa'; break;
      case 'update': lbl = 'Actualizar Empresa'; break;
      case 'read': lbl = 'OK'; break;
      default: lbl = '---'; break;
    }
    return lbl;
  }

  protected validate(): boolean{
    this.managedEntity.photo = this.enterprisePhoto;
    this.managedEntity.photoFileName = this.enterprisePhoto.name;
    return this.managedEntity.photo != undefined;
  }

}
