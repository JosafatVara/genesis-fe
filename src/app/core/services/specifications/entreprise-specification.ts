import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { HttpParams } from "@angular/common/http";
import { Specification } from "./base/specification";
import { Enterprise } from "../../../shared/models/enterprise";
import { PaginationSpecification } from "./base/pagination-specification";
import { OrderingSpecification } from "./base/ordering-specification";
import { PagedAndOrderSpecification } from "./base/paged-and-order-specification";

export abstract class EnterpriseSpecification extends Specification<Enterprise>{

}

export class EnterprisePagedSpecification extends EnterpriseSpecification implements QueryParamsSpecification{
    
    protected evaluate(entity: Enterprise): boolean {
        return entity.id >= this.paginationSpecification.pageNumber*this.paginationSpecification.pageSize &&
                entity.id < (this.paginationSpecification.pageNumber+1)*this.paginationSpecification.pageSize;
    }

    toQueryParams(): HttpParams {
        return this.paginationSpecification.toQueryParams();
    }

    constructor(private paginationSpecification: PaginationSpecification){
        super();
    }

}

export class EnterprisePagedAndSortedSpecification extends EnterpriseSpecification implements QueryParamsSpecification{

    protected evaluate(entity: Enterprise): boolean {
        return true;
    }

    toQueryParams(): HttpParams {
        return this.pagedAndOrderSpecification.toQueryParams();
    }

    constructor(private pagedAndOrderSpecification: PagedAndOrderSpecification){
        super();
    }

}
