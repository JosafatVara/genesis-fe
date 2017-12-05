import { Group } from './../../shared/models/group';
import { group } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Response, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AuthenticatedService } from './base/authenticated-service';
import { EnterprisesService } from './enterprises.service';
import { Specification } from './specifications/base/specification';
import { GroupsSearchPagedSpecification } from './specifications/group-specification';
import { count } from 'rxjs/operator/count';

@Injectable()
export class GroupService extends AuthenticatedService {
    nameModule = 'purchases/';
    token: string;

    constructor(http: HttpClient, auth: AuthenticationService, private enterprises: EnterprisesService) {
        super(auth, http, '');
    }

    getList(specification: Specification<Group>): Observable<Group[]> {
        if(specification instanceof GroupsSearchPagedSpecification){
            return this.enterprises.getCurrentEnterprise().flatMap( curr => {
                return this.http.get(`${this.actionUrl}purchases/enterprises/${curr.id}/groups/`, { headers: this.authHttpHeaders, params: specification.toQueryParams() })
                .map((result: { count: number, page_number: number, page: number, results: any[] }) => {
                    specification.size = result.count;
                    let groups: Group[] = [];
                    groups = result.results.map(r => this.mapBeToGroup(r));
                    return groups;
                }).catch( err => {
                    specification.size = 0;
                    return Observable.of([]);
                });
            });
        }        
    }

    create(data, id): Observable<Group> {
        return this.http
            .post(`${this.actionUrl}purchases/enterprises/${id}/groups/`, data, { headers: this.authHttpHeaders })
            .map(result => {
                return this.mapBeToGroup(result);
            });
    }

    update(body, id): Observable<Group> {
        return this.http
            .put(`${this.actionUrl}purchases/groups/${id}`, body, { headers: this.authHttpHeaders })
            .map(result => {
                return this.mapBeToGroup(result)
            })
    }

    public delete(entity: Group): Observable<Group> {
        return this.http
            .delete(`${this.actionUrl}purchases/groups/${entity.id}`, { headers: this.authHttpHeaders })
            .map(result => entity);
    }

    mapBeToGroup(be: any) {
        return new Group({
            id: be.id,
            name: be.name,
            numProviders: be.num_providers,
        });
    }
}