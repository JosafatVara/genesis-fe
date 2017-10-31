import { Specification } from "./specification";
import { QueryParamsSpecification } from "../contracts/query-params-specification";
import { HttpParams } from "@angular/common/http";

export class OrderingSpecification implements QueryParamsSpecification{
    
    constructor(public asc: boolean, public orderBy: string, public ascQueryParamName: string = 'asc', public orderByQueryParamName: string = 'orderBy'){
    }

    toQueryParams(toAppend?: HttpParams): HttpParams {
        toAppend = toAppend || new HttpParams();
        toAppend = toAppend.append(this.ascQueryParamName, this.ascQueryParamName.toString());
        toAppend = toAppend.append(this.orderByQueryParamName, this.orderBy.toString());
        return toAppend;
    }


}
