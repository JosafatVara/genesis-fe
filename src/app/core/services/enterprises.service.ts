import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { CrudService } from './contracts/crud-service';
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
import { DepartmentsService } from './departments.service';
import { EmployeesQuantitiesService } from './employees-quantities.service';
import { DepartmentsByNameSpecification } from './specifications/department-specification';
import { EmployeesQuantitiesByDescriptionSpecification } from './specifications/employees-quantity-specification';

@Injectable()
export class EnterprisesService extends AuthenticatedService implements CrudService<Enterprise>{

  protected mockStock = 10;
  protected mockData: Array<Enterprise>;
  protected currentEnterprise: BehaviorSubject<Enterprise>;
  
  constructor(auth: AuthenticationService, http: HttpClient, private departments: DepartmentsService
    , private employeesQuantities: EmployeesQuantitiesService){
    super(auth, http, '');
    this.mockData = this.genMock();
    this.currentEnterprise = new BehaviorSubject<Enterprise>(this.mockData[2]);
  }
  
  public get(specification?: QueryParamsSpecification | Specification<Enterprise>): Observable<Enterprise[]> {
    if(!specification){
      return this.http
        .get<any[]>(this.actionUrl+'accounts/enterprises/users/me/',{headers: this.authHttpHeaders})
        .map( result => {
          let enterprises: Enterprise[] = [];
          result.forEach( r => {
            enterprises = enterprises.concat([ this.mapBeToEnterprise(r.enterprise_selected) ]);
          });
          return enterprises;
        });
    }
    if(specification instanceof Specification){      
      return Observable.of(this.mockData.filter( e => specification.isSatisfiedBy(e))).delay(500);
    }
  }
  
  getSync(specification?: QueryParamsSpecification | Specification<Enterprise>): Enterprise[] {
    throw new Error("Method not implemented.");
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
    // let formData
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

  private mapBeToEnterprise(beEntity: any): Enterprise{
    return new Enterprise({
      businessName: beEntity.business_name,
      photoPublicUrl: beEntity.image,
      address: beEntity.address,
      ruc: beEntity.ruc,
      id: beEntity.id,
      department: this.departments.getSync(new DepartmentsByNameSpecification(beEntity.rubro))[0],
      employeesQuantity: this.employeesQuantities.getSync(new EmployeesQuantitiesByDescriptionSpecification(beEntity.num_employees))[0],
      name: beEntity.name,
      adminsQuantity: beEntity.num_users
    });
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