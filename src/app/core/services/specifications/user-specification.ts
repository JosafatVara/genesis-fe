import { Specification } from "./base/specification";
import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { HttpParams } from "@angular/common/http";
import { User } from "../../../shared/models/user";

export abstract class UserSpecification extends Specification<User>{
   

}

export class UserGlobalSearchSpecification extends UserSpecification implements QueryParamsSpecification{
    
    constructor(query: string){
        super();
    }

    toQueryParams(): HttpParams {
        throw new Error("Method not implemented.");
    }
    
    protected evaluate(entity: User): boolean {
        throw new Error("Method not implemented.");
    }

}
