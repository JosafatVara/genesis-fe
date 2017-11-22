import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { AuthenticatedService } from './base/authenticated-service';
import { AuthenticationService } from './authentication.service';
import { User } from '../../shared/models/user';
import { CrudService } from './contracts/crud-service';
import { Specification } from './specifications/base/specification';
import { UsersInEnterpriseSpecification, UsersSearchPagedSpecification } from './specifications/user-specification';
import { RolesService } from './roles.service';
import { RolesByNameSpecification } from './specifications/role-specification';
import { EnterprisesService } from './enterprises.service';
import { QueryParamsSpecification } from './specifications/contracts/query-params-specification';
import { count } from 'rxjs/operator/count';

@Injectable()
export class UsersService extends AuthenticatedService implements CrudService<User> {  

  protected mockStock = 10;
  protected mockData: Array<User>;
  protected currentUser: BehaviorSubject<User>; 

  constructor(auth: AuthenticationService, http: HttpClient, private roles: RolesService, 
      private enterprises: EnterprisesService) {
    super(auth,http,'')
    // this.mockData = this.genMock();
    this.currentUser = new BehaviorSubject<User>(undefined);
  }

  public get(specification?: Specification<User>): Observable<User[]> {
    if(!specification){
      return Observable.of(this.mockData);
    }
    // if(specification instanceof UsersInEnterpriseSpecification){
    //   return this.http
    //   .get<any[]>(`${this.actionUrl}enterprises/${specification.enterprise.id}/users`, {headers: this.authHttpHeaders})
    //   .map( (results: { count: number, num_pages: 1, page: any[] }[]) => {
    //     let userList: User[] = [];
    //     results[0].page.forEach( r => {
    //       userList = userList.concat([ this.mapBeToUser(r) ]);
    //     });
    //     return userList; 
    //   });
    // }
    if(specification instanceof UsersSearchPagedSpecification){
      return this.enterprises.getCurrentEnterprise()
      .flatMap( e => { 
        return this.http
        .get<any[]>(`${this.actionUrl}enterprises/${e.id}/users`, {headers: this.authHttpHeaders})
        .map( (results: { count: number, num_pages: 1, page: any[] }[]) => {
          specification.size = results[0].count;
          let userList: User[] = [];
          results[0].page.forEach( r => {
            userList = userList.concat([ this.mapBeToUser(r) ]);
          });
          return userList; 
        }); 
      });      
    }
    if(specification instanceof Specification){      
      return Observable.of(this.mockData.filter( e => specification.isSatisfiedBy(e))).delay(500);
    }
  }

  getSync(specification?: Specification<User>): User[] {
    throw new Error("Method not implemented.");
  }

  public update(entity: User): Observable<User> {
    let formData = new FormData();
    formData.append('first_name',entity.firstName);
    formData.append('last_name',entity.lastName);
    formData.append('picture',entity.photo, entity.photoFileName);
    return this.http
      .put(`${this.actionUrl}accounts/user/${entity.id}/update`,formData, {headers: this.authHttpHeaders})
      .map( u => {return entity});
  }

  public create(entity: User): Observable<User> {
    let formData = new FormData();
    formData.append('email', entity.email);
    formData.append('password',entity.password);
    formData.append('first_name',entity.firstName);
    formData.append('last_name',entity.lastName);
    formData.append('role',entity.role.id.toString());
    formData.append('picture',entity.photo, entity.photoFileName);
    return this.enterprises.getCurrentEnterprise().flatMap( e => {
      return this.http
        .post(`${this.actionUrl}accounts/enterprises/${e.id}/newuser`,formData, {headers: this.authHttpHeaders})
        .map( u => {return entity});
    });    
  }
  
  public delete(entity: User): Observable<User> {
    return this.http
      .delete(`${this.actionUrl}accounts/user/${entity.id}/destroy/`,{headers: this.authHttpHeaders})
      .map( result => entity );
  }

  public getCurrentUser(): Observable<User>{
    if(!this.currentUser.value){
      return this.http.get(`${this.actionUrl}accounts/user/retrieve/`,{headers: this.authHttpHeaders}).map( r => {
        this.currentUser.next(this.mapBeToUser(r));
        return  this.currentUser.value
      });
    }else{
      return this.currentUser.asObservable();
    }    
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

  private mapBeToUser(entity: any): User{
    return new User({
      id: entity.id,
      firstName: entity.first_name,
      lastName: entity.last_name,
      email: entity.email,
      photoPublicUrl: entity.picture,
      role: this.roles.getSync(new RolesByNameSpecification(entity.role))[0]
    });
  }
}
