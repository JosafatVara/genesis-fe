import { BankAccount } from './../../shared/models/bank-account';
import { group } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Response, RequestOptions, Headers, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AuthenticatedService } from './base/authenticated-service';

@Injectable()
export class BankAccountService extends AuthenticatedService {

    constructor(http: HttpClient, auth: AuthenticationService) {
        super(auth, http, '');
    }

    getList(id): Observable<BankAccount[]> {
        return this.http.get(`${this.actionUrl}purchases/providers/${id}/banks`, { headers: this.authHttpHeaders })
            .map((result: { count: number, page_number: number, page: number, results: any[] }) => {
                let bankAccounts: BankAccount[] = [];
                console.log(result);
                bankAccounts = result.results.map(r => this.mapBeToBankAccount(r));
                return bankAccounts;
            });
    }

    create(data, id): Observable<BankAccount> {
        return this.http
            .post(`${this.actionUrl}purchases/providers/${id}/banks`, this.mapBankAccountToBe(data), { headers: this.authHttpHeaders })
            .map(result => {
                return this.mapBeToBankAccount(result);
            });
    }

    update(data, id): Observable<BankAccount> {
        return this.http
            .put(`${this.actionUrl}purchases/providers/banks/${id}`, this.mapBankAccountToBe(data), { headers: this.authHttpHeaders })
            .map(result => {
                return this.mapBeToBankAccount(result);
            });
    }

     delete(id): Observable<any> {
        return this.http
            .delete(this.actionUrl + 'purchases/providers/banks/' + id, { headers: this.authHttpHeaders });
    }

    private mapBeToBankAccount(be: any) {
        return new BankAccount({
            id: be.id,
            bankName: be.bank,
            number: be.bank_account,
            // interbankNumber: be.interbank_account,
        });
    }

    private mapBankAccountToBe(bankAccount: BankAccount): any {
        return {
            bank: bankAccount.bankName,
            bank_account: bankAccount.number,
        };
    }
}

