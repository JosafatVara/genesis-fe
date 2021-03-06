import { Provider } from './../../shared/models/provider';
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
import { ProvidersByNameSpecification, ProvidersSearchPagedSpecification } from './specifications/provider-specification';

@Injectable()
export class ProviderService extends AuthenticatedService {

    nameModule = 'purchases/';
    token: string;

    constructor(http: HttpClient, auth: AuthenticationService, private enterprises: EnterprisesService) {
        super(auth, http, '');
        this.token = JSON.parse(localStorage.getItem("token"));
    }

    public get(specification?: Specification<Provider>): Observable<Provider[]>{
        if( specification instanceof ProvidersByNameSpecification 
             || specification instanceof ProvidersSearchPagedSpecification){
            let auxSpecification: ProvidersSearchPagedSpecification;            
            if(specification instanceof ProvidersByNameSpecification){
                auxSpecification = new ProvidersSearchPagedSpecification(specification.providerName, 1, 1000);
            }
            auxSpecification = auxSpecification || specification as ProvidersSearchPagedSpecification;
            return this.enterprises.getCurrentEnterprise().flatMap( curr => {
                return this.http.get(`${this.actionUrl}purchases/enterprises/${curr.id}/providers`, 
                { headers: this.authHttpHeaders, params: auxSpecification.toQueryParams() })
                .map((result: { count: number, page_number: number, page: number, results: any[] }) => {
                    let providers: Provider[] = [];
                    auxSpecification.size = result.count;
                    specification = auxSpecification;
                    result.results.forEach(r => {
                        providers = providers.concat([this.mapBeToProvider(r)]);
                    });
                    return providers;
                });
            });
        }
    }

    public getList(id): Observable<Provider[]> {
        return this.http.get(`${this.actionUrl}purchases/enterprises/${id}/providers`, { headers: this.authHttpHeaders })
            .map((result: { count: number, page_number: number, page: number, results: any[] }) => {
                let providers: Provider[] = [];
                result.results.forEach(r => {
                    providers = providers.concat([this.mapBeToProvider(r)]);
                });
                return providers;
            });
    }

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
        formData.append('group', data.group);
        let headers: HttpHeaders = this.authHttpHeaders;
        headers = headers.append('Accept', 'application/json');
        return this.http.post(this.actionUrl + 'purchases/enterprises/' + id + '/providers', formData, { headers: headers }).map(result => {
            return this.mapBeToProvider(result);
        });
    }

    public update(data, id): Observable<Provider> {
        let formData: FormData = new FormData();
        formData.append('business_name', data.businessName);
        formData.append('first_name', data.firstName);
        formData.append('last_name', data.lastName);
        formData.append('type', data.type);
        formData.append('cellphone', data.cellphone);
        formData.append('address', data.address);
        formData.append('ruc', data.ruc);
        formData.append('phone', data.phone);
        formData.append('details', data.notes);
        formData.append('group', data.group? data.group: '');
        if (data.photo.toString()[0] != 'h') formData.append('image', data.photo);
        let headers: HttpHeaders = this.authHttpHeaders;
        headers = headers.append('Accept', 'application/json');
        return this.http.patch(this.actionUrl + `purchases/enterprises/providers/` + id, formData, { headers: headers }).map(result => {
            return this.mapBeToProvider(result);
        });
    }

    public delete(id): Observable<any> {
        return this.http
            .delete(this.actionUrl + 'purchases/enterprises/providers/' + id, { headers: this.authHttpHeaders });
    }

    private mapBeToProvider(be: any) {
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
            group: be.group_id? {
                id: be.group_id,
                name: be.group_name
            } : undefined
        });
    }

}
