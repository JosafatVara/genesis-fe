import { Specification } from "./base/specification";
import { Freelancer } from "../../../shared/models/freelancer";
import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { HttpParams } from "@angular/common/http";
import { PaginationSpecification } from "./base/pagination-specification";

export abstract class FreelancerSpecification extends Specification<Freelancer> {
}

export class FreelancersByNameSpecification extends FreelancerSpecification{
    
    constructor(private freelancerName: string){
        super();
        if(!freelancerName){
            this.freelancerName = "";
        }
    }

    protected evaluate(entity: Freelancer): boolean {
        return entity.fullName.toLocaleLowerCase().includes(this.freelancerName.toLocaleLowerCase());
    }
    
}



export class FreelancersSearchPagedSpecification extends FreelancerSpecification implements QueryParamsSpecification{
    
    public size: number;

    constructor(public searchQuery: string, public page: number, public pageSize: number){
        super();
    }

    protected evaluate(entity: Freelancer): boolean {
        throw new Error("Method not implemented.");
    }

    toQueryParams(toAppend?: HttpParams): HttpParams {
        return (new PaginationSpecification(this.page,this.pageSize)).toQueryParams().append('search',this.searchQuery);
    }
    
}