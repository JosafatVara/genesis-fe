import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { AsyncCrudService } from './contracts/async-crud-service';
import { Enterprise } from '../../shared/models/enterprise';
import { Specification } from '../../shared/specifications/base/specification';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EnterprisesService extends AuthenticatedService implements AsyncCrudService<Enterprise> {
  
  protected currentEnterprise: BehaviorSubject<Enterprise>;
  
  constructor(auth: AuthenticationService, http: HttpClient){
    super(auth, http, '**********');
    this.currentEnterprise = new BehaviorSubject<Enterprise>(new Enterprise());
  }
  
  public get(specification?: Specification<Enterprise>): Observable<Enterprise[]> {
    return Observable.of([]);
  }

  public update(entity: Enterprise): Observable<Enterprise> {
    return Observable.of(new Enterprise());
  }

  public create(entity: Enterprise): Observable<Enterprise> {
    return Observable.of(new Enterprise());
  }
  
  public delete(entity: Enterprise): Observable<Enterprise> {
    return Observable.of(new Enterprise());
  }

  public getCurrentEnterprise(): Observable<Enterprise>{
    return this.currentEnterprise.asObservable();
  }
}
