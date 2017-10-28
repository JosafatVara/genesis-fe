import { Specification } from "./base/specification";
import { User } from "../models/user";
import { QueryParamsSpecification } from "./contracts/query-params-specification";
import { HttpParams } from "@angular/common/http";

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
