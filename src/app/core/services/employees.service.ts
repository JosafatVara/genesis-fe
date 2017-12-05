import { Injectable } from '@angular/core';
import { AuthenticatedService } from './base/authenticated-service';
import { CrudService } from './contracts/crud-service';
import { Employee } from '../../shared/models/employee';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { QueryParamsSpecification } from './specifications/contracts/query-params-specification';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Affiliation } from '../../shared/models/affiliation';
import { BankAccount } from '../../shared/models/bank-account';
import { EmployeesByNameSpecification, EmployeesSearchPagedSpecification } from "./specifications/employee-specification";
import { EnterprisesService } from './enterprises.service';
import { DatetimeHelperService } from "../utils/datetime-helper/datetime-helper.service";
import { AffiliationsService } from "./affiliations.service";
import { AffiliationsByChoiceSpecification } from "./specifications/affiliation-specification";

@Injectable()
export class EmployeesService extends AuthenticatedService implements CrudService<Employee> {

  private mockData: Employee[] = [
    new Employee({
      id: 1,
      firstName: 'Dinjo',
      lastName: 'Joestar',
      address: 'Somewhere over the rainbown',
      email: '666@gmail.com',
      dni: '12345678',
      workPosition: 'Desarrollador front-end',
      workFunctions: 'Elaboración de aplicaciones en entornos web',
      affiliation: new Affiliation({
        id: 1,
        description: 'AFP'
      }),
      pensionRegime: 'Prima',
      admissionDate: new Date(),
      pay: 2000.0,
      bankAccounts: [
        new BankAccount({
          id: 1,
          bankName: 'Interbank',
          number: '3937665523433',
          interbankNumber: '3937665523433'
        })
      ],
      lastDayPaid: new Date()
    })
  ];

  constructor(auth: AuthenticationService, http: HttpClient, private enterprises: EnterprisesService,
    private datetimeHelper: DatetimeHelperService, private affiliations: AffiliationsService) { 
    super(auth,http,'');
  }

  get(specification?: QueryParamsSpecification | Specification<Employee>): Observable<Employee[]> {
    return this.enterprises.getCurrentEnterprise().flatMap( curr =>{
      if(specification instanceof EmployeesByNameSpecification){
        let employeesWithName: Employee[] = [
          new Employee({ id: 1, firstName: 'dinjo', lastName: 'joestar' }),
          new Employee({ id: 2, firstName: 'billy', lastName: 'arredondo' }),
          new Employee({ id: 3, firstName: 'said', lastName: 'rat' }),
        ];
        return Observable.of( employeesWithName.filter( f => specification.isSatisfiedBy(f) ) );
      }
      if(specification instanceof EmployeesSearchPagedSpecification){
        return this.http.get(`${this.actionUrl}enterprises/${curr.id}/employees/planilla/`,
        { headers: this.authHttpHeaders, params: specification.toQueryParams() })
        .map( (result: {count: number, results: any[]}) => {
          specification.size = result.count;
          return result.results.map( be => this.mapBeToEmployee(be) );
        });
      }
      return Observable.of(this.mockData);
    });    
  }

  update(entity: Employee): Observable<Employee> {
    return this.http.patch(`${this.actionUrl}enterprises/employees/${entity.id}`,this.mapEmployeeToBe(entity)
    ,{headers: this.authHttpHeaders}).flatMap( (result: any) => {
      let updated = this.mapBeToEmployee(result);
      let newAccounts = entity.bankAccounts.filter( ba => ba.id == undefined );
      let existingAccounts = entity.bankAccounts.filter( ba => ba.id != undefined );
      let deletedAccounts = updated.bankAccounts
        .filter( ba => entity.bankAccounts.find( beba => beba.id == ba.id ) == null );
      if(result.bank_accounts.length == 0 && entity.bankAccounts.length == 0){
        return Observable.of(entity);
      }else{
        let bankAccountCreations = newAccounts.map( ba => 
          this.http.post(`${this.actionUrl}enterprises/employee/${entity.id}/bankaccounts/`, this.mapBankAccountToBe(ba),
          { headers: this.authHttpHeaders } ).first() );
        let bankAccountUpdates = existingAccounts.map( ba =>         
          this.http.patch(`${this.actionUrl}enterprises/bankaccounts/${ba.id}`, this.mapBankAccountToBe(ba),
          { headers: this.authHttpHeaders } ).first() );
        let bankAccountsDeletions = deletedAccounts.map( ba =>         
          this.http.delete(`${this.actionUrl}enterprises/bankaccounts/${ba.id}`,
          { headers: this.authHttpHeaders } ).first() );
        let bankAccountCrudTransactions = bankAccountCreations.concat(bankAccountUpdates).concat(bankAccountsDeletions);
        return Observable.zip(...bankAccountCrudTransactions).map( () => {
          return entity;
        });
      }
        
    });
  }

  create(entity: Employee): Observable<Employee> {
    return this.enterprises.getCurrentEnterprise().flatMap( curr => {
      return this.http.post(`${this.actionUrl}enterprises/${curr.id}/employees/`,this.mapEmployeeToBe(entity)
      ,{headers: this.authHttpHeaders}).flatMap( result => {        
        let created = this.mapBeToEmployee(result);
        let bankAccountCreations = entity.bankAccounts.map( ba => 
          this.http.post(`${this.actionUrl}enterprises/employee/${created.id}/bankaccounts/`, this.mapBankAccountToBe(ba),
          { headers: this.authHttpHeaders } ).first() );
        return Observable.zip(...bankAccountCreations).map( () => {
          return created;
        });
      });
    });
  }

  delete(entity: Employee): Observable<Employee> {
    return this.http.delete(`${this.actionUrl}enterprises/employees/${entity.id}`,{headers: this.authHttpHeaders})
    .map( result => {
      return entity;
    });
  }
  getSync(specification?: QueryParamsSpecification | Specification<Employee>): Employee[] {
    throw new Error("Method not implemented.");
  }

  mapBeToEmployee(be: any): Employee{
    let toReturn = new Employee({
      id: be.id,
      photoPublicUrl: be.image,
      firstName: be.first_name,
      lastName: be.last_name,
      dni: be.dni,
      address: be.addrees,
      admissionDate: new Date(be.time_start+'T00:00:00'),
      affiliation: this.affiliations.getSync(new AffiliationsByChoiceSpecification(be.membership))[0],
      cuspp: be.cussp,
      email: be.email,
      pay: be.salary,
      pensionRegime: be.name_membership,
      situation: be.situation,
      workPosition: be.position,
      workFunctions: be.functions,
      bankAccounts: be.bank_accounts.map( 
        ba => new BankAccount({ 
          id: ba.id, 
          bankName: ba.bank, 
          number: ba.bank_account,
          interbankNumber: ba.interbank_account
        }) )
    });
    return toReturn;
  }

  mapEmployeeToBe(employee: Employee): FormData{
    let formData = new FormData();
    let auxObj: any = {
      first_name: employee.firstName,
      last_name: employee.lastName,
      type: 'PLANILLA',
      membership: employee.affiliation.choice,
      name_membership: employee.pensionRegime,
      time_start: this.datetimeHelper.toLocalDate(employee.admissionDate),
      dni: employee.dni,
      addrees: employee.address,
      email: employee.email,
      position: employee.workPosition,
      salary: employee.pay,
      functions: employee.workFunctions,
      image: employee.photo,
      cussp: employee.cuspp,
      situation: employee.situation
    };
    Object.entries(auxObj).forEach( (field) =>{
      if(field[1] != undefined){
        formData.append(field[0],field[1]);
      }
    });
    return formData;
  }

  mapBankAccountToBe(bankAccount: BankAccount): any{
    return {
      bank_account: bankAccount.number,
      bank: bankAccount.bankName,
      interbank_account: bankAccount.bankName
    };
  }
}
