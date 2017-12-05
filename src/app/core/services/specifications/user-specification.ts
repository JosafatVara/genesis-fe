import { Specification } from "./base/specification";
import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { HttpParams } from "@angular/common/http";
import { User } from "../../../shared/models/user";
import { PaginationSpecification } from "./base/pagination-specification";
import { PagedAndOrderSpecification } from "./base/paged-and-order-specification";
import { Enterprise } from "../../../shared/models/enterprise";

export abstract class UserSpecification extends Specification<User>{
    
}

export class UserPagedSpecification extends UserSpecification implements QueryParamsSpecification{
    
    protected evaluate(entity: User): boolean {
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

export class UserPagedAndSortedSpecification extends UserSpecification implements QueryParamsSpecification{

    protected evaluate(entity: User): boolean {
        return true;
    }

    toQueryParams(): HttpParams {
        return this.pagedAndOrderSpecification.toQueryParams();
    }

    constructor(private pagedAndOrderSpecification: PagedAndOrderSpecification){
        super();
    }

}

export class UsersSearchPagedSpecification extends UserSpecification implements QueryParamsSpecification{

    public size: number;

    constructor(public searchQuery: string, public page: number, public pageSize: number){
        super();
    }

    protected evaluate(entity: User): boolean {
        throw new Error("Method not implemented.");
    }

    toQueryParams(toAppend?: HttpParams): HttpParams {
        return (new PaginationSpecification(this.page,this.pageSize)).toQueryParams().append('search',this.searchQuery);
    }
    
}

export class UsersInEnterpriseSpecification extends UserSpecification{

    constructor(public enterprise: Enterprise){
        super();
    }

    protected evaluate(entity: User): boolean {
        throw new Error("Method not implemented.");
    }
    
}
    