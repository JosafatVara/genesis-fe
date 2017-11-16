import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Group } from '../../shared/models/group';
import { AuthenticatedService } from './base/authenticated-service';

@Injectable()
export class Service extends AuthenticatedService {
    nameModule = 'api/v1/purchases/';
    token: string;

    constructor(http: HttpClient, auth: AuthenticationService) {
        super(auth, http, '/api/v1/');
        this.token = JSON.parse(localStorage.getItem("token"));
    }

    getList(id): Observable<Group[]> {
        // let headers = new Headers({ 'Authorization': 'Token ' + this.token });
        return this.http.get(`${this.actionUrl}/purchases/enterprises/${id}/groups/`, { headers: this.authHttpHeaders })
            .map((result: { count: number, page_number: number, page: number, results: any[] }) => {
                let groups: Group[] = [];
                groups = result.results.map(r => this.mapBeToGroup(r));
                return groups;
            });
        // return this.http.get('${environment.beUrl} ${this.nameModule} ${id} /groups/', { headers: headers });
    }

    create(data, id): Observable<Group> {
        return this.http.post(`${this.actionUrl}/purchases/enterprises/${id}/groups`, { headers: this.authHttpHeaders })
        .map((result))
        // let body = JSON.stringify(data);
        // let headers = new Headers({ 'Authorization': 'Token ' + this.token, 'Content-Type': 'application/json' });
        // return this.http.post(environment.beUrl + this.nameModule + 'enterprises/' + id + '/groups/', body, { headers: headers });
    }

    get(id) {
        let headers = new Headers({ 'Authorization': 'Token ' + this.token });
        let myParams = new URLSearchParams();
        return this.http.get(environment.beUrl + this.nameModule + "/" + id, { search: myParams, headers: headers });
    }

    update(data, id): Observable<Response> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Authorization': 'Token ' + this.token, 'Content-Type': 'application/json' });
        return this.http.put(environment.beUrl + this.nameModule + 'groups/' + id, body, { headers: headers });
    }

    delete(id): Observable<Response> {
        let headers = new Headers({ 'Authorization': 'Token ' + this.token, 'Content-Type': 'application/json' });
        return this.http.delete(environment.beUrl + this.nameModule + 'groups/' + id, { headers: headers });
    }

    mapBeToGroup(be: any) {
        return new Group({
            id: be.id,
            name: be.name
        });
    }
}
