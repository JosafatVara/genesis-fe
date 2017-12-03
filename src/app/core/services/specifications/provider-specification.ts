import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { HttpParams } from "@angular/common/http";
import { Specification } from "./base/specification";
import { Provider } from "../../../shared/models/provider";
import { PaginationSpecification } from "./base/pagination-specification";
import { OrderingSpecification } from "./base/ordering-specification";
import { PagedAndOrderSpecification } from "./base/paged-and-order-specification";

export abstract class ProviderSpecification extends Specification<Provider>{

}

export class ProviderPagedSpecification extends ProviderSpecification implements QueryParamsSpecification {

    protected evaluate(entity: Provider): boolean {
        return entity.id >= this.paginationSpecification.pageNumber * this.paginationSpecification.pageSize &&
            entity.id < (this.paginationSpecification.pageNumber + 1) * this.paginationSpecification.pageSize;
    }

    toQueryParams(): HttpParams {
        return this.paginationSpecification.toQueryParams();
    }

    constructor(private paginationSpecification: PaginationSpecification) {
        super();
    }

}

export class ProviderPagedAndSortedSpecification extends ProviderSpecification implements QueryParamsSpecification {

    protected evaluate(entity: Provider): boolean {
        return true;
    }

    toQueryParams(): HttpParams {
        return this.pagedAndOrderSpecification.toQueryParams();
    }

    constructor(private pagedAndOrderSpecification: PagedAndOrderSpecification) {
        super();
    }

}


export class ProvidersByNameSpecification extends ProviderSpecification{
    
    constructor(private freelancerName: string){
        super();
        if(!freelancerName){
            this.freelancerName = "";
        }
    }

    protected evaluate(entity: Provider): boolean {
        return entity.fullName.toLocaleLowerCase().includes(this.freelancerName.toLocaleLowerCase());
    }
    
}
