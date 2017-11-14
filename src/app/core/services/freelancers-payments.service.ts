import { Injectable } from '@angular/core';
import { AuthenticatedService } from "./base/authenticated-service";
import { CrudService } from "./contracts/crud-service";
import { FreelancerPayment } from "../../shared/models/freelancer-payment";
import { QueryParamsSpecification } from "./specifications/contracts/query-params-specification";
import { Specification } from "./specifications/base/specification";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Freelancer } from "../../shared/models/freelancer";
import { Rxh } from "../../shared/models/rxh";

@Injectable()
export class FreelancersPaymentsService extends AuthenticatedService implements CrudService<FreelancerPayment> {

  private mockData: FreelancerPayment[] = [
    new FreelancerPayment({
      creationDate: new Date(),
      freelancer: new Freelancer({
        id: 1,
        firstName: 'Dinjo',
        lastName: 'Joestar'
      }),
      id: 1, 
      month: 10,
      year: 2017,
      rxhs: [
        new Rxh({
          id: 1,
          number: '12345678',
          concept: 'Desarrollo de Software',
          emissionDate: new Date(),
          ruc: '123456789101',
          totalAmmout: 10000,
          retentionAmmount: 1000,
          netTotalAmmount: 9000 
        })
      ]
    })
  ];

  constructor(auth: AuthenticationService, http: HttpClient){
    super(auth,http,'*****');
  }

  get(specification?: QueryParamsSpecification | Specification<FreelancerPayment>): Observable<FreelancerPayment[]> {
    return Observable.of(this.mockData);
  }
  update(entity: FreelancerPayment): Observable<FreelancerPayment> {
    throw new Error("Method not implemented.");
  }
  create(entity: FreelancerPayment): Observable<FreelancerPayment> {
    throw new Error("Method not implemented.");
  }
  delete(entity: FreelancerPayment): Observable<FreelancerPayment> {
    throw new Error("Method not implemented.");
  }
  getSync(specification?: QueryParamsSpecification | Specification<FreelancerPayment>): FreelancerPayment[] {
    throw new Error("Method not implemented.");
  }

}
