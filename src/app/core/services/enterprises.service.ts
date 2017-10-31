import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { AsyncCrudService } from './contracts/async-crud-service';
import { Enterprise } from '../../shared/models/enterprise';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { EntityDataSource } from './base/entity-data-source';
import { MatPaginator } from '@angular/material';
import { Sorter } from './shared/sorter';
import { Refresher } from './shared/refresher';
import { QueryParamsSpecification } from './specifications/contracts/query-params-specification';
import { Specification } from './specifications/base/specification';
import { EnterprisePagedSpecification } from './specifications/entreprise-specification';
import { PaginationSpecification } from './specifications/base/pagination-specification';

@Injectable()
export class EnterprisesService extends AuthenticatedService implements AsyncCrudService<Enterprise>{

  protected mockStock = 0;
  protected mockEnterprises: Array<Enterprise>;
  protected currentEnterprise: BehaviorSubject<Enterprise>;
  
  constructor(auth: AuthenticationService, http: HttpClient){
    super(auth, http, '**********');
    this.mockEnterprises = this.genMock();
    this.currentEnterprise = new BehaviorSubject<Enterprise>(this.mockEnterprises[2]);
  }
  
  public get(specification?: QueryParamsSpecification | Specification<Enterprise>): Observable<Enterprise[]> {
    if(!specification){
      return Observable.of(this.mockEnterprises);
    }
    if(specification instanceof Specification){      
      return Observable.of(this.mockEnterprises.filter( e => specification.isSatisfiedBy(e))).delay(500);
    }
  }

  public update(entity: Enterprise): Observable<Enterprise> {
    return Observable.of(new Enterprise());
  }

  public create(entity: Enterprise): Observable<Enterprise> {
    entity.id = this.mockEnterprises.length == 0 ? 0 : this.mockEnterprises[this.mockEnterprises.length-1].id+1;
    this.mockEnterprises = this.mockEnterprises.concat([entity]);
    return Observable.of(entity);
  }
  
  public delete(entity: Enterprise): Observable<Enterprise> {
    return Observable.of(new Enterprise());
  }

  public getCurrentEnterprise(): Observable<Enterprise>{
    return this.currentEnterprise.asObservable();
  }

  public setCurrentEnterprise(enterprise: Enterprise): void{
    this.currentEnterprise.next(enterprise);
  }

  private genMock(): Array<Enterprise>{
    let mock: Array<Enterprise> = [];
    for(let i: number = 0; i < this.mockStock; i++){
      mock = mock.concat([new Enterprise({
        id: i,
        adminsQuantity: Math.ceil(Math.random()*10),
        name: this.makeRandomString(10),
        ruc: this.makeRandomNumber(8)
      })]);
    }
    return mock;
  }

  private makeRandomString(length: number){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  private makeRandomNumber(length: number){
    var text = "";
    var possible = "1234567890";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}

export class EnterpriseListDataSource extends EntityDataSource<Enterprise>{

  private enterprises: EnterprisesService;

  constructor(enterprises: EnterprisesService, paginator: MatPaginator, sorter: Sorter, refresher: Refresher){
    super(enterprises,paginator,sorter,refresher);
  }  
  
  protected getSpecification(): QueryParamsSpecification {
    let pageIndex = this.paginator? this.paginator.pageIndex : 0;
    let pageSize = this.paginator? this.paginator.pageSize : 10;
    return new EnterprisePagedSpecification(new PaginationSpecification(pageIndex,pageSize));
  }

}