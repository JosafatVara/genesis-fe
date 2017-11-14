import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { CrudService } from './contracts/crud-service';
import { Payment } from '../../shared/models/payment';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { QueryParamsSpecification } from './specifications/contracts/query-params-specification';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../shared/models/employee';

@Injectable()
export class PaymentsService extends AuthenticatedService implements CrudService<Payment>{

  private mockData: Payment[] = [
    new Payment({
      paymentDate: new Date(),
      employee: new Employee({
        id: 1,
        firstName: 'Dinjo',
        lastName: 'Joestar'
      }),
      totalContributions: 152151.00,      
    })
  ];

  constructor(auth: AuthenticationService, http: HttpClient){
    super(auth,http,'*****');
  }

  get(specification?: QueryParamsSpecification | Specification<Payment>): Observable<Payment[]> {
    return Observable.of(this.mockData);
  }
  update(entity: Payment): Observable<Payment> {
    throw new Error("Method not implemented.");
  }
  create(entity: Payment): Observable<Payment> {
    throw new Error("Method not implemented.");
  }
  delete(entity: Payment): Observable<Payment> {
    throw new Error("Method not implemented.");
  }
  getSync(specification?: QueryParamsSpecification | Specification<Payment>): Payment[] {
    throw new Error("Method not implemented.");
  }
}
