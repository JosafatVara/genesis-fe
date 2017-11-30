import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CrudService } from './contracts/crud-service';
import { ProviderPayment } from '../../shared/models/provider-payment';
import { Provider } from '../../shared/models/provider';
import { Rxh } from '../../shared/models/rxh';
import { AuthenticationService } from './authentication.service';
import { AuthenticatedService } from './base/authenticated-service';
import { QueryParamsSpecification } from './specifications/contracts/query-params-specification';
import { Specification } from './specifications/base/specification';

@Injectable()
export class ProvidersPaymentsService extends AuthenticatedService implements CrudService<ProviderPayment> {

  private mockData: ProviderPayment[] = [
    new ProviderPayment({
      creationDate: new Date(),
      provider: new Provider({
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

  get(specification?: QueryParamsSpecification | Specification<ProviderPayment>): Observable<ProviderPayment[]> {
    return Observable.of(this.mockData);
  }
  update(entity: ProviderPayment): Observable<ProviderPayment> {
    throw new Error("Method not implemented.");
  }
  create(entity: ProviderPayment): Observable<ProviderPayment> {
    throw new Error("Method not implemented.");
  }
  delete(entity: ProviderPayment): Observable<ProviderPayment> {
    throw new Error("Method not implemented.");
  }
  getSync(specification?: QueryParamsSpecification | Specification<ProviderPayment>): ProviderPayment[] {
    throw new Error("Method not implemented.");
  }

}
