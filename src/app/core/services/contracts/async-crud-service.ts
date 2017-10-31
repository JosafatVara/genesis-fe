import { Observable } from "rxjs";
import { QueryParamsSpecification } from "../specifications/contracts/query-params-specification";
import { Specification } from "../specifications/base/specification";

export interface AsyncCrudService<T> {

    get(specification?: QueryParamsSpecification | Specification<T>) : Observable<Array<T>>;

    update(entity: T): Observable<T>;

    create(entity: T): Observable<T>;

    delete(entity: T): Observable<T>;

}
