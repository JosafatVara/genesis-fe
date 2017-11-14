import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { CrudService } from './contracts/crud-service';
import { EmployeesQuantity } from '../../shared/models/employees-quantity';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Specification } from './specifications/base/specification';

@Injectable()
export class EmployeesQuantitiesService extends AuthenticatedService implements CrudService<EmployeesQuantity> {
  getSync(specification?: Specification<EmployeesQuantity>): EmployeesQuantity[] {
    if(specification){
      return this.employeesQuantityList.filter(e=>specification.isSatisfiedBy(e)); 
    }
    return this.employeesQuantityList;
  }
  private employeesQuantityList: EmployeesQuantity[] = [
    new EmployeesQuantity({quantityDescription: 'TENTOTWENTY', id: 1}),
  ];

  get(specification?: Specification<EmployeesQuantity>): Observable<EmployeesQuantity[]> {
      return Observable.of(this.employeesQuantityList);
  }
  update(entity: EmployeesQuantity): Observable<EmployeesQuantity> {
    throw new Error("Method not implemented.");
  }
  create(entity: EmployeesQuantity): Observable<EmployeesQuantity> {
    throw new Error("Method not implemented.");
  }
  delete(entity: EmployeesQuantity): Observable<EmployeesQuantity> {
    throw new Error("Method not implemented.");
  }

  constructor(auth: AuthenticationService, http: HttpClient) {
    super(auth,http,'********');
  }

}
