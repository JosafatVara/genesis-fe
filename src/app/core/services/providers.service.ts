import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class Service {
    nameModule = 'api/v1/purchases/';
    token: string;

    constructor(private http: Http) {
        this.token = JSON.parse(localStorage.getItem("token"));
    }

    getList(id) {
        let headers = new Headers({ 'Authorization': 'Token ' + this.token });
        return this.http.get(environment.beUrl + this.nameModule + 'groups/' + id + '/providers', { headers: headers });
    }

    create(data, id): Observable<Response> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Authorization': 'Token ' + this.token, 'Content-Type': 'application/json' });
        return this.http.post(environment.beUrl + this.nameModule + 'groups/' + id + '/providers/', body, { headers: headers });
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
        return this.http.delete(environment.beUrl + this.nameModule + 'groups/providers/' + id, { headers: headers });
    }

}
