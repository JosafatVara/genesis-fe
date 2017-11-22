import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';

import { EntityDataSource } from './base/entity-data-source';
import { AuthenticatedService } from './base/authenticated-service';
import { CrudService } from './contracts/crud-service';
import { Enterprise } from '../../shared/models/enterprise';
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
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class EnterprisesService extends AuthenticatedService implements CrudService<Enterprise>{

  protected mockStock = 10;
  protected mockData: Array<Enterprise>;
  protected mockEnterprises: Array<Enterprise>;
  protected currentEnterprise: BehaviorSubject<Enterprise>;
  private premanagementEntepriseList: Array<Enterprise>;
  
  constructor(auth: AuthenticationService, http: HttpClient, private departments: DepartmentsService
    , private employeesQuantities: EmployeesQuantitiesService, private storage: LocalStorageService){
    super(auth, http, '');
    this.mockData = this.genMock();
    this.currentEnterprise = new BehaviorSubject<Enterprise>(undefined);
  }
  
  public get(specification?: QueryParamsSpecification | Specification<Enterprise>): Observable<Enterprise[]> {
    if(!specification){
      // if(!this.currentEnterprise.value){
      //   if(!this.premanagementEntepriseList){
          // return this.http
          // .get<any[]>(this.actionUrl+'accounts/enterprises/users/me/',{headers: this.authHttpHeaders})
          // .map( results => {
          //   let enterprises: Enterprise[] = [];
          //   results
          //     .filter( r => r.enterprise_selected? r.enterprise_selected.is_enabled : false)
          //     .forEach( r => {
          //       enterprises = enterprises.concat([ this.mapBeToEnterprise(r.enterprise_selected) ]);
          //     });
          //     this.premanagementEntepriseList = enterprises;
          //   return enterprises;
          // });
        // }else{
        //   return Observable.of(this.premanagementEntepriseList);
        // }
      // }
      return this.http
        .get<any[]>(this.actionUrl+'accounts/enterprises/users/me/',{headers: this.authHttpHeaders})
        .map( results => {
          let enterprises: Enterprise[] = [];
          results
            .filter( r => r.enterprise_selected? r.enterprise_selected.is_enabled : false)
            .forEach( r => {
              enterprises = enterprises.concat([ this.mapBeToEnterprise(r.enterprise_selected) ]);
            });
          return enterprises;
        });
    }
    if(specification instanceof Specification){      
      return Observable.of(this.mockData.filter( e => specification.isSatisfiedBy(e))).delay(500);
    }
    // return Observable.of(this.mockData).delay(500);
  }
  
  getSync(specification?: QueryParamsSpecification | Specification<Enterprise>): Enterprise[] {
    throw new Error("Method not implemented.");
  }

  public update(entity: Enterprise): Observable<Enterprise> {
    let formData: FormData = new FormData();
    formData.append('name', entity.name);
    if(entity.photo){
      formData.append('image', entity.photo, entity.photoFileName);
    }    
    formData.append('business_name', entity.businessName);
    formData.append('ruc', entity.ruc);
    formData.append('address', entity.address);
    formData.append('rubro', entity.department.name.toUpperCase());
    formData.append('num_employees', entity.employeesQuantity.quantityDescription);
    formData.append('business_name', entity.businessName);
    formData.append('is_enabled', 'true');
    let headers: HttpHeaders = this.authHttpHeaders;
    headers = headers.append('Accept', 'application/json');
    return this.http.patch(this.actionUrl+`enterprises/${entity.id.toString()}`,formData,{headers: headers}).map( result => {
      return entity;
    });
  }

  public create(entity: Enterprise): Observable<Enterprise> {
    let formData: FormData = new FormData();
    formData.append('name', entity.name);
    formData.append('image', entity.photo, entity.photoFileName);
    formData.append('business_name', entity.businessName);
    formData.append('ruc', entity.ruc);
    formData.append('address', entity.address);
    formData.append('rubro', entity.department.name.toUpperCase());
    formData.append('num_employees', entity.employeesQuantity.quantityDescription);
    formData.append('business_name', entity.businessName);
    formData.append('is_enabled', 'true');
    let headers: HttpHeaders = this.authHttpHeaders;
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.actionUrl+'enterprises/',formData,{headers: headers}).map( result => {
      return this.mapBeToEnterprise(result);
    });
  }
  
  public delete(entity: Enterprise): Observable<Enterprise> {
    return this.http.delete(`${this.actionUrl}enterprises/${entity.id.toString()}`, {headers: this.authHttpHeaders})
      .map( result => {
        return entity;
      });
  }

  public getCurrentEnterprise(): Observable<Enterprise>{
    // if(this.auth.clearLogout){
    //   this.currentEnterprise.next(undefined);
    //   this.auth.clearLogout = false;
    // }
    if(!this.currentEnterprise.value){
      this.currentEnterprise.next(this.storage.load<Enterprise>('current-enterprise') as Enterprise);
    }
    return this.currentEnterprise.asObservable();
  }

  public setCurrentEnterprise(enterprise: Enterprise): Observable<Enterprise>{
    this.currentEnterprise.next(enterprise);
    this.storage.save('current-enterprise', this.currentEnterprise.value);
    return this.currentEnterprise.asObservable();
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
      photoPublicUrl: this.clearBaseUrl+beEntity.image,
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