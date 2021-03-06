import { Contact } from './../../shared/models/contact';
import { group } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Response, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AuthenticatedService } from './base/authenticated-service';

@Injectable()
export class ContactsService extends AuthenticatedService {

    constructor(http: HttpClient, auth: AuthenticationService) {
        super(auth, http, '');
    }

    getList(id): Observable<Contact[]> {
        return this.http
            .get(`${this.actionUrl}purchases/providers/${id}/contacts`, { headers: this.authHttpHeaders })
            .map((result: { count: number, page_number: number, page: number, results: any[] }) => {
                let contacts: Contact[] = [];
                contacts = result.results.map(r => this.mapBeToContact(r));
                return contacts;
            });
    }

    create(data, id): Observable<Contact> {
        return this.http
            .post(`${this.actionUrl}purchases/providers/${id}/contacts`, this.mapContactToBe(data), { headers: this.authHttpHeaders })
            .map(result => {
                return this.mapBeToContact(result);
            });
    }

    update(data, id): Observable<Contact> {
        return this.http
            .put(`${this.actionUrl}purchases/providers/contacts/${id}`, this.mapContactToBe(data), { headers: this.authHttpHeaders })
            .map(result => {
                return this.mapBeToContact(result);
            });
    }

    delete(id): Observable<any> {
        return this.http
            .delete(this.actionUrl + 'purchases/providers/contacts/' + id, { headers: this.authHttpHeaders });
    }

    private mapBeToContact(be: any) {
        return new Contact({
            id: be.id,
            firstName: be.first_name,
            lastName: be.last_name,
            position: be.position,
            phone: be.phone,
            email: be.email,
        });
    }

    private mapContactToBe(contact: Contact): any {
        return {
            first_name: contact.firstName,
            last_name: contact.lastName,
            position: contact.position,
            phone: contact.phone,
            email: contact.email,
        };
    }
}

