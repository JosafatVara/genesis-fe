import { Specification } from "./specification";
import { QueryParamsSpecification } from "../contracts/query-params-specification";
import { HttpParams } from "@angular/common/http";

export class PaginationSpecification implements QueryParamsSpecification{

    constructor(public pageNumber: number, public pageSize: number
        , public pageNumberQueryParamName: string = 'page', public pageSizeQueryParamName: string = 'page_size'){
    }

    toQueryParams(toAppend?: HttpParams): HttpParams {
        toAppend = toAppend || new HttpParams();
        toAppend = toAppend.append(this.pageSizeQueryParamName, this.pageSize.toString());
        toAppend = toAppend.append(this.pageNumberQueryParamName, this.pageNumber.toString());
        return toAppend;
    }

}
