import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { EnterprisesService } from "../../core/services/enterprises.service";
import { Enterprise } from "../../shared/models/enterprise";


@Injectable()
export class EnterpriseListResolver implements Resolve<Array<Enterprise>>{

    private enterprises: EnterprisesService

    constructor(enterprises: EnterprisesService){
        this.enterprises = enterprises;
    }

    resolve(): Observable<Enterprise[]> {
        return this.enterprises.get();
    }
}
