import { Injectable } from '@angular/core';
import { Freelancer } from '../../shared/models/freelancer';
import { AuthenticatedService } from './base/authenticated-service';
import { CrudService } from './contracts/crud-service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Specification } from './specifications/base/specification';
import { QueryParamsSpecification } from './specifications/contracts/query-params-specification';
import { Observable } from 'rxjs/Observable';
import { Affiliation } from '../../shared/models/affiliation';
import { BankAccount } from '../../shared/models/bank-account';

@Injectable()
export class FreelancersService extends AuthenticatedService implements CrudService<Freelancer>{

  private mockData: Freelancer[] = [
    new Freelancer({
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

  get(specification?: QueryParamsSpecification | Specification<Freelancer>): Observable<Freelancer[]> {
    return Observable.of(this.mockData);
  }
  update(entity: Freelancer): Observable<Freelancer> {
    throw new Error("Method not implemented.");
  }
  create(entity: Freelancer): Observable<Freelancer> {
    throw new Error("Method not implemented.");
  }
  delete(entity: Freelancer): Observable<Freelancer> {
    throw new Error("Method not implemented.");
  }
  getSync(specification?: QueryParamsSpecification | Specification<Freelancer>): Freelancer[] {
    throw new Error("Method not implemented.");
  }

}
