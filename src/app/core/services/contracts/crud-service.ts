import { Observable } from "rxjs";
import { QueryParamsSpecification } from "../specifications/contracts/query-params-specification";
import { Specification } from "../specifications/base/specification";

export interface CrudService<T> {

    get(specification?: QueryParamsSpecification | Specification<T>) : Observable<Array<T>>;

    update(entity: T): Observable<T>;

    create(entity: T): Observable<T>;

    delete(entity: T): Observable<T>;

    getSync(specification?: QueryParamsSpecification | Specification<T>): Array<T>;

}
