import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Department } from '../../shared/models/department';
import { CrudService } from './contracts/crud-service';
import { Observable } from 'rxjs';
import { Specification } from './specifications/base/specification';

@Injectable()
export class DepartmentsService extends AuthenticatedService implements CrudService<Department>{

  getSync(specification?: Specification<Department>): Department[] {
    if(specification){
      return this.deparmentList.filter(d=>specification.isSatisfiedBy(d));      
    }
    return this.deparmentList;
  }
  
  private deparmentList: Department[] = [
    new Department({name: 'Salud', id: 1}),
  ];

  get(specification?: Specification<Department>): Observable<Department[]>{
      return Observable.of(this.deparmentList)
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
