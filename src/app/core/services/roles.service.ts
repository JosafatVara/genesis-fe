import { Injectable } from '@angular/core';
import { Role } from '../../shared/models/role';
import { CrudService } from './contracts/crud-service';
import { AuthenticatedService } from './base/authenticated-service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RolesService extends AuthenticatedService implements CrudService<Role>{

  private mockData: Role[] = [
    new Role({name: 'Administrador', id: 1}),
  ];

  getSync(specification?: Specification<Role>): Role[] {
    if(specification){
      return this.mockData.filter(d=>specification.isSatisfiedBy(d));      
    }
    return this.mockData;
  }

  get(specification?: Specification<Role>): Observable<Role[]> {
    return Observable.of(this.mockData);
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
