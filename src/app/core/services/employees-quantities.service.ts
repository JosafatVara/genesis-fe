import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { AsyncCrudService } from './contracts/async-crud-service';
import { EmployeesQuantity } from '../../shared/models/employees-quantity';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Specification } from './specifications/base/specification';

@Injectable()
export class EmployeesQuantitiesService extends AuthenticatedService implements AsyncCrudService<EmployeesQuantity> {

  get(specification?: Specification<EmployeesQuantity>): Observable<EmployeesQuantity[]> {
    return Observable.of([
      new EmployeesQuantity({quantityDescription: 'De 1 a 10'}),
      new EmployeesQuantity({quantityDescription: 'De 10 a 50'}),
      new EmployeesQuantity({quantityDescription: 'De 50 a 100'}),
    ]);
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
