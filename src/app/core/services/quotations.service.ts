import { HttpClient } from "@angular/common/http";

import { AuthenticatedService } from "./base/authenticated-service";
import { CrudService } from "./contracts/crud-service";
import { Quotation, QuotationDetail, QuotationState } from "../../shared/models/quotation";
import { QueryParamsSpecification } from "./specifications/contracts/query-params-specification";
import { Specification } from "./specifications/base/specification";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "./authentication.service";
import { Injectable } from "@angular/core";

@Injectable()
export class QuotationsService extends AuthenticatedService implements CrudService<Quotation>{

    private mockData: Quotation[] = [];
    private mockSize: number = 10;

    constructor(auth: AuthenticationService, http: HttpClient){
        super(auth,http,'***');
        for(let i = 0; i < this.mockSize; i++){
            this.mockData = this.mockData.concat([ new Quotation({
                id: i + 1,
                created: new Date(),
                state: new QuotationState({ name: this.makeRandomString(6) }),
                details: [ 
                    new QuotationDetail({
                        productQuantity: this.makeRandomNumberInInterval(50,200),
                        productName: this.makeRandomString(10),
                        ammount: this.makeRandomNumberInInterval(500,5000)
                    }),
                    new QuotationDetail({
                        productQuantity: this.makeRandomNumberInInterval(50,200),
                        productName: this.makeRandomString(10),
                        ammount: this.makeRandomNumberInInterval(500,5000)
                }) ]
            })]);
        }
    }
    
    get(specification?: QueryParamsSpecification | Specification<Quotation>): Observable<Quotation[]> {
        return Observable.of(this.mockData);
    }

    update(entity: Quotation): Observable<Quotation> {
        throw new Error("Method not implemented.");
    }

    create(entity: Quotation): Observable<Quotation> {
        throw new Error("Method not implemented.");
    }

    delete(entity: Quotation): Observable<Quotation> {
        throw new Error("Method not implemented.");
    }

    getSync(specification?: QueryParamsSpecification | Specification<Quotation>): Quotation[] {
        throw new Error("Method not implemented.");
    }
    
}