import { Provider } from './../../shared/models/provider';
import { Group } from './../../shared/models/group';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AuthenticatedService } from './base/authenticated-service';



@Injectable()
export class ProviderService extends AuthenticatedService {
    // nameModule = 'api/v1/purchases/';
    // token: string;

    // constructor(private http: Http) {
    //     this.token = JSON.parse(localStorage.getItem("token"));
    // }

    nameModule = 'purchases/';
    token: string;

    constructor(http: HttpClient, auth: AuthenticationService) {
        super(auth, http, '');
        this.token = JSON.parse(localStorage.getItem("token"));
    }


    // getList(id) {
    //     let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    //     return this.http.get(environment.beUrl + this.nameModule + 'enterprises/' + id + '/providers', { headers: headers });
    //     // return this.http.get(`${environment.beUrl} ${this.nameModule} groups/providers/ ${id}`, { headers: headers });
    // }

    getList(id): Observable<Provider[]> {
        return this.http.get(`${this.actionUrl}purchases/enterprises/${id}/providers`, { headers: this.authHttpHeaders })
            .map((result: { count: number, page_number: number, page: number, results: any[] }) => {
                let providers: Provider[] = [];
                console.log(result);
                result.results.forEach(r => {
                    providers = providers.concat([this.mapBeToProvider(r)]);
                });
                console.log(providers);

                // providers = result.results.map(r => this.mapBeToProvider(r));
                return providers;
            });
    }


    // create(data, id): Observable<Provider> {
    //     return this.http
    //         .post(`${this.actionUrl}purchases/enterprises/${id}/providers`, data, { headers: this.authHttpHeaders })
    //         .map(result => {
    //             return this.mapBeToProvider(result);
    //         });
    // }
    public create(data, id): Observable<Provider> {
        let formData: FormData = new FormData();
        formData.append('business_name', data.businessName);
        formData.append('image', data.photo);
        formData.append('first_name', data.firstName);
        formData.append('last_name', data.lastName);
        formData.append('type', data.type);
        formData.append('cellphone', data.cellphone);
        formData.append('address', data.address);
        formData.append('ruc', data.ruc);
        formData.append('phone', data.phone);
        formData.append('details', data.notes);
        let headers: HttpHeaders = this.authHttpHeaders;
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.actionUrl + 'purchases/enterprises/' + id + '/providers', formData, { headers: headers }).map(result => {
            return this.mapBeToProvider(result);
        });
    }



    // get(id) {
    //     let headers = new Headers({ 'Authorization': 'Token ' + this.token });
    //     let myParams = new URLSearchParams();
    //     return this.http.get(environment.beUrl + this.nameModule + "/" + id, { search: myParams, headers: headers });
    // }

    // update(data, id): Observable<Response> {
    //     let body = JSON.stringify(data);
    //     let headers = new Headers({ 'Authorization': 'Token ' + this.token, 'Content-Type': 'application/json' });
    //     return this.http.put(environment.beUrl + this.nameModule + 'groups/' + id, body, { headers: headers });
    // }

    // delete(id): Observable<Response> {
    //     let headers = new Headers({ 'Authorization': 'Token ' + this.token, 'Content-Type': 'application/json' });
    //     return this.http.delete(environment.beUrl + this.nameModule + 'groups/providers/' + id, { headers: headers });
    // }


    mapBeToProvider(be: any) {
        return new Provider({
            id: be.id,
            businessName: be.business_name,
            photo: be.image,
            firstName: be.first_name,
            lastName: be.last_name,
            type: be.type,
            cellphone: be.cellphone,
            address: be.address,
            ruc: be.ruc,
            phone: be.phone,
            notes: be.details,
            numOrders: be.orders,

        });
    }

}
