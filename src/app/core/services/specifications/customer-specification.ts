import { HttpParams } from "@angular/common/http";

import { Specification } from "./base/specification";
import { Customer } from "../../../shared/models/customer";
import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { PaginationSpecification } from "./base/pagination-specification";

export abstract class CustomerSpecification extends Specification<Customer>{
    
}

export class CustomersSearchPagedSpecification extends CustomerSpecification implements QueryParamsSpecification{

    public size: number;

    constructor(public searchQuery: string, public page: number, public pageSize: number){
        super();
    }

    protected evaluate(entity: Customer): boolean {
        throw new Error("Method not implemented.");
    }

    toQueryParams(toAppend?: HttpParams): HttpParams {
        return (new PaginationSpecification(this.page,this.pageSize)).toQueryParams().append('search',this.searchQuery);
    }
    
}