import { HttpParams } from "@angular/common/http";

export interface QueryParamsSpecification {

    toQueryParams(toAppend?: HttpParams): HttpParams;

}
