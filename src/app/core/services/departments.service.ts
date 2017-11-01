import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Department } from '../../shared/models/department';
import { AsyncCrudService } from './contracts/async-crud-service';
import { Observable } from 'rxjs';
import { Specification } from './specifications/base/specification';

@Injectable()
export class DepartmentsService extends AuthenticatedService implements AsyncCrudService<Department>{
  
  get(specification?: Specification<Department>): Observable<Department[]> {
    return Observable.of([
      new Department({name: 'Salud', id: 1}),
      new Department({name: 'Tecnología', id: 2}),
      new Department({name: 'Juguetes', id: 3}),
      new Department({name: 'Digimones', id: 4}),
    ])
  }
  update(entity: Department): Observable<Department> {
    throw new Error("Method not implemented.");
  }
  create(entity: Department): Observable<Department> {
    throw new Error("Method not implemented.");
  }
  delete(entity: Department): Observable<Department> {
    throw new Error("Method not implemented.");
  }

  constructor(auth: AuthenticationService, http: HttpClient) {
    super(auth,http,'*****');
  }

}
