import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class Service {
    nameModule = 'purchases/groups/';
    token: string;
    // Header set Access-Control-Allow-Origin "http://localhost:4200";

    constructor(private http: Http) {
        this.token = JSON.parse(localStorage.getItem("access_token"));
    }

    create(data, id): Observable<Response> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append("Authorization", this.token);
        return this.http.post(environment.beUrl + this.nameModule + '/' + id, body);
    }


    getList(id) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append("Authorization", this.token);
        let myParams = new URLSearchParams();
        // myParams.set('search', name);
        // return this.http.get(environment.beUrl + "businesses/" +  + "/brands");
        return this.http.get(environment.beUrl + this.nameModule + '/' + id, { search: myParams });

    }

    get(id) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append("Authorization", this.token);
        let myParams = new URLSearchParams();
        // myParams.set('search', name);
        return this.http.get(environment.beUrl + this.nameModule  + "/"+id, { search: myParams });
    }

    update(data, id): Observable<Response> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers.append("Authorization", this.token);
        // let myParams = new URLSearchParams();        
        return this.http.put(environment.beUrl + this.nameModule + '/' + id, body);
    }

    // update(unDato, businessId, noticeId): Observable<Response> {
    //     let body = JSON.stringify(unDato);
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     // headers.append("Authorization", this.token);
    //     let myParams = new URLSearchParams();
    //     myParams.set('advertisementId', noticeId);
    //     return this.http.put(environment.beUrl + 'businesses/' + businessId + '/updateAdvertisement', body, { search: myParams });
    // }


    // postNotice(unDato, businessId): Observable<Response> {
    //     let body = JSON.stringify(unDato);
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     headers.append("Authorization", this.token);
    //     return this.http.post(apiBase + 'businesses/' + businessId + '/postAdvertisement', body, { headers: headers });
    // }

    
}
