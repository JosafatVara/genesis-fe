import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { MatPaginator, Sort } from "@angular/material";
import { EventEmitter } from "@angular/core";
import { CrudService } from "../contracts/crud-service";
import { Sorter } from "../shared/sorter";
import { Refresher } from "../shared/refresher";
import { QueryParamsSpecification } from "../specifications/contracts/query-params-specification";

export abstract class EntityDataSource<T> implements DataSource<T>{

    public size: number;

    constructor(protected crudService: CrudService<T>, protected paginator: MatPaginator, 
        protected sorter: Sorter, protected refresher: Refresher){
        
    }

    public connect(): Observable<T[]> {
        let emitters = [
            this.paginator ? this.paginator.page : new EventEmitter(),
            this.sorter ? this.sorter.sortEvent: new EventEmitter(),
            this.refresher ? this.refresher.refreshEvent : new EventEmitter()
        ];

        return Observable.merge(...emitters).flatMap( () => {
            return this.crudService.get(this.getSpecification());
        });
    }

    protected abstract getSpecification(): QueryParamsSpecification;

    public disconnect(): void {
        debugger;
    }
}
