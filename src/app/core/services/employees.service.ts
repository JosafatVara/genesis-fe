import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { CrudService } from './contracts/crud-service';
import { Employee } from '../../shared/models/employee';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { QueryParamsSpecification } from './specifications/contracts/query-params-specification';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Affiliation } from '../../shared/models/affiliation';
import { BankAccount } from '../../shared/models/bank-account';

@Injectable()
export class EmployeesService extends AuthenticatedService implements CrudService<Employee> {

  private mockData: Employee[] = [
    new Employee({
      id: 1,
      firstName: 'Dinjo',
      lastName: 'Joestar',
      address: 'Somewhere over the rainbown',
      email: '666@gmail.com',
      dni: '12345678',
      workPosition: 'Desarrollador front-end',
      workFunctions: 'Elaboración de aplicaciones en entornos web',
      affiliation: new Affiliation({
        id: 1,
        description: 'AFP'
      }),
      affiliationName: 'Prima',
      admissionDate: new Date(),
      pay: 2000.0,
      bankAccounts: [
        new BankAccount({
          id: 1,
          bankName: 'Interbank',
          number: '3937665523433',
          interbankNumber: '3937665523433'
        })
      ],
      lastDayPaid: new Date()
    })
  ];

  constructor(auth: AuthenticationService, http: HttpClient) { 
    super(auth,http,'******');
  }

  get(specification?: QueryParamsSpecification | Specification<Employee>): Observable<Employee[]> {
    return Observable.of(this.mockData);
  }
  update(entity: Employee): Observable<Employee> {
    throw new Error("Method not implemented.");
  }
  create(entity: Employee): Observable<Employee> {
    throw new Error("Method not implemented.");
  }
  delete(entity: Employee): Observable<Employee> {
    throw new Error("Method not implemented.");
  }
  getSync(specification?: QueryParamsSpecification | Specification<Employee>): Employee[] {
    throw new Error("Method not implemented.");
  }


}
