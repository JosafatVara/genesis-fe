import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { CrudService } from './contracts/crud-service';
import { StaffPayment } from '../../shared/models/staff-payment';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { QueryParamsSpecification } from './specifications/contracts/query-params-specification';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../shared/models/employee';

@Injectable()
export class StaffPaymentsService extends AuthenticatedService implements CrudService<StaffPayment>{

  private mockData: StaffPayment[] = [
    new StaffPayment({
      paymentDate: new Date(),
      employee: new Employee({
        id: 1,
        firstName: 'Dinjo',
        lastName: 'Joestar'
      }),
      netTotalAmmount: 152151.00,      
    })
  ];

  constructor(auth: AuthenticationService, http: HttpClient){
    super(auth,http,'*****');
  }

  get(specification?: QueryParamsSpecification | Specification<StaffPayment>): Observable<StaffPayment[]> {
    return Observable.of(this.mockData);
  }
  update(entity: StaffPayment): Observable<StaffPayment> {
    throw new Error("Method not implemented.");
  }
  create(entity: StaffPayment): Observable<StaffPayment> {
    throw new Error("Method not implemented.");
  }
  delete(entity: StaffPayment): Observable<StaffPayment> {
    throw new Error("Method not implemented.");
  }
  getSync(specification?: QueryParamsSpecification | Specification<StaffPayment>): StaffPayment[] {
    throw new Error("Method not implemented.");
  }
}
