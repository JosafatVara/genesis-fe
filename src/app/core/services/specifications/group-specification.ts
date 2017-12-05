import { HttpParams } from "@angular/common/http";

import { Specification } from "./base/specification";
import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { PaginationSpecification } from "./base/pagination-specification";
import { Group } from "../../../shared/models/group";

export abstract class GroupSpecification extends Specification<Group>{
    
}

export class GroupsSearchPagedSpecification extends GroupSpecification implements QueryParamsSpecification{

    public size: number;

    constructor(public searchQuery: string, public page: number, public pageSize: number){
        super();
    }

    protected evaluate(entity: Group): boolean {
        throw new Error("Method not implemented.");
    }

    toQueryParams(toAppend?: HttpParams): HttpParams {
        return (new PaginationSpecification(this.page,this.pageSize)).toQueryParams().append('search',this.searchQuery);
    }
    
}