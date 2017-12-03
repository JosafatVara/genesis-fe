import { HttpParams } from "@angular/common/http";

import { Specification } from "./base/specification";
import { Quotation } from "../../../shared/models/quotation";
import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { PaginationSpecification } from "./base/pagination-specification";

export abstract class QuotationsSpecification extends Specification<Quotation>{

}

export class QuotationsSearchPagedSpecification extends QuotationsSpecification implements QueryParamsSpecification{
    
    public size: number;

    constructor(public searchQuery: string, public page: number, public pageSize: number){
        super();
    }

    protected evaluate(entity: Quotation): boolean {
        throw new Error("Method not implemented.");
    }

    toQueryParams(toAppend?: HttpParams): HttpParams {
        return (new PaginationSpecification(this.page,this.pageSize)).toQueryParams().append('query',this.searchQuery);
    }
    
}