import { HttpParams } from "@angular/common/http";

import { Specification } from "./base/specification";
import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { PaginationSpecification } from "./base/pagination-specification";
import { StaffPayment } from "../../../shared/models/staff-payment";

export abstract class StaffPaymentSpecification extends Specification<StaffPayment>{
    
}

export class StaffPaymentsInPeriodSearchPagedSpecification extends StaffPaymentSpecification implements QueryParamsSpecification{

    public size: number;

    constructor(public searchQuery: string, public page: number, public pageSize: number, 
        public month: number, public year: number){
        super();
    }

    protected evaluate(entity: StaffPayment): boolean {
        throw new Error("Method not implemented.");
    }

    toQueryParams(toAppend?: HttpParams): HttpParams {
        return (new PaginationSpecification(this.page,this.pageSize)).toQueryParams().append('search',this.searchQuery);
    }
    
}