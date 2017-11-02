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

  protected mockStock = 10;
  protected mockData: Array<Enterprise>;
  protected mockEnterprises: Array<Enterprise>;
  protected currentEnterprise: BehaviorSubject<Enterprise>;
  
  constructor(auth: AuthenticationService, http: HttpClient){
    super(auth, http, '**********');
    this.mockData = this.genMock();
    this.currentEnterprise = new BehaviorSubject<Enterprise>(this.mockData[2]);
  }
  
  public get(specification?: QueryParamsSpecification | Specification<Enterprise>): Observable<Enterprise[]> {
    if(!specification){
      return Observable.of(this.mockData);
    }
    if(specification instanceof Specification){      
      return Observable.of(this.mockData.filter( e => specification.isSatisfiedBy(e))).delay(500);
    }
  }

  public update(entity: Enterprise): Observable<Enterprise> {
    let indexToUpdate = this.mockData.findIndex( e => e.id == entity.id);
    this.mockData[indexToUpdate] = entity;
    return Observable.of(new Enterprise());
  }

  public create(entity: Enterprise): Observable<Enterprise> {
    entity.id = this.mockData.length == 0 ? 0 : this.mockData[this.mockData.length-1].id+1;
    this.mockData = this.mockData.concat([entity]);
    return Observable.of(entity);
  }
  
  public delete(entity: Enterprise): Observable<Enterprise> {
    let indexToRemove = this.mockData.findIndex( e => e.id == entity.id);
    this.mockData.splice(indexToRemove,1);
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