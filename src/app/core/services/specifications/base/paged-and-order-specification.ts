import { PaginationSpecification } from "./pagination-specification";
import { OrderingSpecification } from "./ordering-specification";
import { HttpParams } from "@angular/common/http";
import { QueryParamsSpecification } from "../contracts/query-params-specification";
import { Specification } from "./specification";

export class PagedAndOrderSpecification implements QueryParamsSpecification{
    
    public paginationSpecification: PaginationSpecification;
    public orderingSpecification: OrderingSpecification;

    toQueryParams(): HttpParams {
        return this.paginationSpecification.toQueryParams(this.orderingSpecification.toQueryParams());
    }

    constructor(protected pageNumber: number, protected pageSize: number, protected asc: boolean, protected orderBy: string){
        this.paginationSpecification = new PaginationSpecification(this.pageNumber, this.pageSize);
        this.orderingSpecification = new OrderingSpecification(this.asc, this.orderBy);
    }
    
}
