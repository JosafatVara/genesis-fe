import { Customer } from './../../shared/models/customer';
import { Group } from './../../shared/models/group';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AuthenticatedService } from './base/authenticated-service';

@Injectable()
export class CustomerService extends AuthenticatedService {

    nameModule = 'purchases/';
    token: string;

    constructor(http: HttpClient, auth: AuthenticationService) {
        super(auth, http, '');
        this.token = JSON.parse(localStorage.getItem("token"));
    }

    public getList(id): Observable<Customer[]> {
        return this.http.get(`${this.actionUrl}enterprises/${id}/clients`, { headers: this.authHttpHeaders })
            .map((result: { count: number, page_number: number, page: number, results: any[] }) => {
                let customers: Customer[] = [];
                result.results.forEach(r => {
                    customers = customers.concat([this.mapBeToCustomer(r)]);
                });
                return customers;
            });
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
        let headers: HttpHeaders = this.authHttpHeaders;
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.actionUrl + 'enterprises/' + id + '/clients', formData, { headers: headers }).map(result => {
            return this.mapBeToCustomer(result);
        });
    }

    public update(data, id): Observable<Customer> {
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
        let headers: HttpHeaders = this.authHttpHeaders;
        headers = headers.append('Accept', 'application/json');
        return this.http.put(this.actionUrl + `enterprises/clients/` + id, formData, { headers: headers }).map(result => {
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

        });
    }

}
