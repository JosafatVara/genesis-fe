import { Injectable } from "@angular/core";
import { AuthenticatedService } from "./base/authenticated-service";
import { CrudService } from "./contracts/crud-service";
import { QuotationState, Quotation } from "../../shared/models/quotation";
import { QueryParamsSpecification } from "./specifications/contracts/query-params-specification";
import { Specification } from "./specifications/base/specification";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "./authentication.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class QuotationStatesService extends AuthenticatedService implements CrudService<QuotationState>{
    
    private mockData: QuotationState[] = [{
        id: 1,
        name: 'Enviado'
    },{
        id: 2,
        name: 'Aprobado',
    },{
        id: 3,
        name: 'Aceptado'
    }];

    constructor(auth: AuthenticationService, http: HttpClient){
        super(auth, http, '');
    }

    get(specification?: QueryParamsSpecification | Specification<QuotationState>): Observable<QuotationState[]> {
        return Observable.of(this.mockData);
    }

    update(entity: QuotationState): Observable<QuotationState> {
        throw new Error("Method not implemented.");
    }

    create(entity: QuotationState): Observable<QuotationState> {
        throw new Error("Method not implemented.");
    }

    delete(entity: QuotationState): Observable<QuotationState> {
        throw new Error("Method not implemented.");
    }
    
    getSync(specification?: QueryParamsSpecification | Specification<QuotationState>): QuotationState[] {
        throw new Error("Method not implemented.");
    }
    
}