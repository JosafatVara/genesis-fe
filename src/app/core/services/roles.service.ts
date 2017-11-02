import { Injectable } from '@angular/core';
import { Role } from '../../shared/models/role';
import { AsyncCrudService } from './contracts/async-crud-service';
import { AuthenticatedService } from './base/authenticated-service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RolesService extends AuthenticatedService implements AsyncCrudService<Role>{

  get(specification?: Specification<Role>): Observable<Role[]> {
    return Observable.of([
      new Role({name: 'Contador', id: 1}),
      new Role({name: 'Admin', id: 2}),
      new Role({name: 'RRHH', id: 3}),
      new Role({name: 'Vendedor', id: 4}),
    ])
  }
  update(entity: Role): Observable<Role> {
    throw new Error("Method not implemented.");
  }
  create(entity: Role): Observable<Role> {
    throw new Error("Method not implemented.");
  }
  delete(entity: Role): Observable<Role> {
    throw new Error("Method not implemented.");
  }

  constructor(auth: AuthenticationService, http: HttpClient) {
    super(auth,http,'*****');
  }
  
}
