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

  protected mockStock = 10;
  protected mockData: Array<User>;
  protected currentUser: BehaviorSubject<User>; 

  constructor(auth: AuthenticationService, http: HttpClient) {
    super(auth,http,'******')
    this.mockData = this.genMock();
    this.currentUser = new BehaviorSubject<User>(this.mockData[2]);
  }

  public get(specification?: Specification<User>): Observable<User[]> {
    if(!specification){
      return Observable.of(this.mockData);
    }
    if(specification instanceof Specification){      
      return Observable.of(this.mockData.filter( e => specification.isSatisfiedBy(e))).delay(500);
    }
  }

  public update(entity: User): Observable<User> {
    let indexToUpdate = this.mockData.findIndex( e => e.id == entity.id);
    this.mockData[indexToUpdate] = entity;
    return Observable.of(entity);
  }

  public create(entity: User): Observable<User> {
    entity.id = this.mockData.length == 0 ? 0 : this.mockData[this.mockData.length-1].id+1;
    this.mockData = this.mockData.concat([entity]);
    return Observable.of(entity);
  }
  
  public delete(entity: User): Observable<User> {
    let indexToRemove = this.mockData.findIndex( e => e.id == entity.id);
    this.mockData.splice(indexToRemove,1);
    return Observable.of(entity);
  }

  public getCurrentUser(): Observable<User>{
    return this.currentUser.asObservable();
  }

  private genMock(): Array<User>{
    let mock: Array<User> = [];
    for(let i: number = 0; i < this.mockStock; i++){
      mock = mock.concat([new User({
        id: i,
        firstName: this.makeRandomString(8),
        lastName: this.makeRandomString(10),
        email: this.makeRandomString(5)+'@'+this.makeRandomString(3)+'.'+this.makeRandomString(3),
        lastConnection: new Date()
      })]);
    }
    return mock;
  }
}
