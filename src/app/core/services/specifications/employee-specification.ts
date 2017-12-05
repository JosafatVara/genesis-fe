import { Specification } from "./base/specification";
import { Employee } from "../../../shared/models/employee";
import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { HttpParams } from "@angular/common/http";
import { PaginationSpecification } from "./base/pagination-specification";

export abstract class EmployeeSpecification extends Specification<Employee> {
}

export class EmployeesByNameSpecification extends EmployeeSpecification{
    
    constructor(private employeesName: string){
        super();
        if(!employeesName){
            this.employeesName = "";
        }
    }

    protected evaluate(entity: Employee): boolean {
        return entity.fullName.toLocaleLowerCase().includes(this.employeesName.toLocaleLowerCase());
    }
    
}

export class EmployeesSearchPagedSpecification extends EmployeeSpecification implements QueryParamsSpecification{
    
        public size: number;
    
        constructor(public searchQuery: string, public page: number, public pageSize: number){
            super();
        }
    
        protected evaluate(entity: Employee): boolean {
            throw new Error("Method not implemented.");
        }
    
        toQueryParams(toAppend?: HttpParams): HttpParams {
            return (new PaginationSpecification(this.page,this.pageSize)).toQueryParams().append('search',this.searchQuery);
        }
        
    }