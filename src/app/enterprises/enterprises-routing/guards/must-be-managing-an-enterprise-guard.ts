import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { EnterpriseNoneComponent } from "../../enterprise-none/enterprise-none.component";
import { Observable } from "rxjs/Observable";
import { EnterprisesService } from "../../../core/services/enterprises.service";
import { AuthenticationService } from "../../../core/services/authentication.service";


@Injectable()
export class MustBeManagingAnEnterpriseGuard implements CanDeactivate<EnterpriseNoneComponent>{

    private enterprises: EnterprisesService;

    constructor(enterprises: EnterprisesService, private auth: AuthenticationService){
        this.enterprises = enterprises;
    }

    canDeactivate(): Observable<boolean>{
        return this.enterprises.getCurrentEnterprise().first().map( e => {
            return e != undefined;
        }).flatMap( enterpriseExists => {
            return this.auth.isLogged().map( isLogged => {
                return !isLogged || enterpriseExists;
            });
        });
    }
}
