import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { AuthenticatedService } from './base/authenticated-service';
import { AuthenticationService } from './authentication.service';
import { User } from '../../shared/models/user';
import { AsyncCrudService } from './contracts/async-crud-service';
import { Specification } from './specifications/base/specification';

@Injectable()
export class UsersService extends AuthenticatedService implements AsyncCrudService<User> {

  protected currentUser: BehaviorSubject<User>; 

  constructor(auth: AuthenticationService, http: HttpClient) {
    super(auth,http,'******')
    this.currentUser = new BehaviorSubject<User>(new User({email: '****', firstName: 'Dinjo', lastName: 'Joestar'}));
  }

  public get(specification: Specification<User>): Observable<User[]> {
    throw new Error("Method not implemented.");
  }

  public update(entity: User): Observable<User> {
    throw new Error("Method not implemented.");
  }

  public create(entity: User): Observable<User> {
    throw new Error("Method not implemented.");
  }
  
  public delete(entity: User): Observable<User> {
    throw new Error("Method not implemented.");
  }

  public getCurrentUser(): Observable<User>{
    return this.currentUser.asObservable();
  }

}
