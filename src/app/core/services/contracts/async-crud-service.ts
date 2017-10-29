import { Specification } from "../../../shared/specifications/base/specification";
import { Observable } from "rxjs";

export interface AsyncCrudService<T> {

    get(specification?: Specification<T>) : Observable<Array<T>>;

    update(entity: T): Observable<T>;

    create(entity: T): Observable<T>;

    delete(entity: T): Observable<T>;

}
