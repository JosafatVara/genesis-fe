import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { EnterpriseNoneComponent } from "../../enterprise-none/enterprise-none.component";
import { Observable } from "rxjs/Observable";
import { EnterprisesService } from "../../../core/services/enterprises.service";


@Injectable()
export class MustBeManagingAnEnterpriseGuard implements CanDeactivate<EnterpriseNoneComponent>{

    private enterprises: EnterprisesService;

    constructor(enterprises: EnterprisesService){
        this.enterprises = enterprises;
    }

    canDeactivate(): Observable<boolean>{
        return this.enterprises.getCurrentEnterprise().first().map( e => {
            debugger;
            return e != undefined;
        });
    }
}
