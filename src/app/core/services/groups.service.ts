import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class Service {
    nameModule = 'api/v1/purchases/enterprises/';
    token: string;
    // Header set Access-Control-Allow-Origin "http://localhost:4200";

    constructor(private http: Http) {
        this.token = JSON.parse(localStorage.getItem("token"));
    }

    getList(id) {
        let headers = new Headers({ 'Authorization': 'Token ' + this.token });
        return this.http.get(environment.beUrl + this.nameModule + id + '/groups/', { headers: headers });
        // return this.http.get('${environment.beUrl} ${this.nameModule} ${id} /groups/', { headers: headers });

    }

    create(data, id): Observable<Response> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Authorization': 'Token ' + this.token });
        // headers.append("token", this.token);
        // headers.append("Authorization", this.token);
        return this.http.post(environment.beUrl + this.nameModule + id + '/groups/', body, { headers: headers });
    }

    get(id) {
        let headers = new Headers({ 'Authorization': 'Token ' + this.token });
        // headers.append("token", this.token);
        let myParams = new URLSearchParams();
        return this.http.get(environment.beUrl + this.nameModule + "/" + id, { search: myParams, headers: headers });
    }

    update(data, id): Observable<Response> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Authorization': 'Token ' + this.token });
        // headers.append("token", this.token);
        // let myParams = new URLSearchParams();        
        return this.http.put(environment.beUrl + this.nameModule + '/' + id, body, { headers: headers });
    }




}
