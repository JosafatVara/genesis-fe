import { Customer } from './../../shared/models/customer';
import { Group } from './../../shared/models/group';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AuthenticatedService } from './base/authenticated-service';
import { EnterprisesService } from './enterprises.service';
import { Specification } from './specifications/base/specification';
import { CustomersSearchPagedSpecification } from './specifications/customer-specification';
import { count } from 'rxjs/operator/count';

@Injectable()
export class CustomerService extends AuthenticatedService {

    nameModule = 'purchases/';
    token: string;

    constructor(http: HttpClient, auth: AuthenticationService, private enterpries: EnterprisesService) {
        super(auth, http, '');
        this.token = JSON.parse(localStorage.getItem("token"));
    }

    public getList(specification: Specification<Customer>): Observable<Customer[]> {
        if(specification instanceof CustomersSearchPagedSpecification){
            return this.enterpries.getCurrentEnterprise().flatMap( curr => {
                return this.http.get(`${this.actionUrl}enterprises/${curr.id}/clients`, 
                    { headers: this.authHttpHeaders, params: specification.toQueryParams() })
                .map((result: { count: number, page_number: number, page: number, results: any[] }) => {
                    specification.size = result.count;
                    let customers: Customer[] = [];
                    result.results.forEach(r => {
                        customers = customers.concat([this.mapBeToCustomer(r)]);
                    });
                    return customers;
                });
            });
        }
        return Observable.of([]);
        
    }

    public create(data, id): Observable<Customer> {
        let formData: FormData = new FormData();
        formData.append('business_name', data.businessName);
        formData.append('image', data.photo);
        formData.append('first_name', data.firstName);
        formData.append('last_name', data.lastName);
        formData.append('type', data.type);
        formData.append('cellphone', data.cellphone);
        formData.append('fiscal_address', data.address);
        formData.append('ruc', data.ruc);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('position', data.position);
        let headers: HttpHeaders = this.authHttpHeaders;
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.actionUrl + 'enterprises/' + id + '/clients', formData, { headers: headers }).map(result => {
            return this.mapBeToCustomer(result);
        });
    }

    public update(data, id): Observable<Customer> {
        let formData: FormData = new FormData();
        formData.append('business_name', data.businessName);
        formData.append('first_name', data.firstName);
        formData.append('last_name', data.lastName);
        formData.append('type', data.type);
        formData.append('cellphone', data.cellphone);
        formData.append('fiscal_address', data.address);
        formData.append('ruc', data.ruc);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('position', data.position);
        // if (data.photo[0] != 'h') {
        if (data.photo.toString()[0] != 'h') formData.append('image', data.photo);

        formData.append('image', data.photo);
        // }
        let headers: HttpHeaders = this.authHttpHeaders;
        headers = headers.append('Accept', 'application/json');
        return this.http.patch(this.actionUrl + `enterprises/clients/` + id, formData, { headers: headers }).map(result => {
            return this.mapBeToCustomer(result);
        });
    }

    public delete(id): Observable<any> {
        return this.http
            .delete(this.actionUrl + `enterprises/clients/` + id, { headers: this.authHttpHeaders });
    }

    private mapBeToCustomer(be: any) {
        return new Customer({
            id: be.id,
            businessName: be.business_name,
            photo: be.image,
            firstName: be.first_name,
            lastName: be.last_name,
            type: be.type,
            cellphone: be.cellphone,
            address: be.fiscal_address,
            ruc: be.ruc,
            phone: be.phone,
            notes: be.details,
            numOrders: be.orders,
            pendingAmount: be.pending_amount,
            email: be.email,
            position: be.position,
        });
    }

}
