import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { EnterprisesService } from "../../core/services/enterprises.service";
import { Enterprise } from "../../shared/models/enterprise";

@Injectable()
export class MustHaveEnterprisesAndMustBeManagingAnEnterprise implements CanActivate {

    constructor(private enterprises: EnterprisesService, private router: Router){
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('MustHaveEnterprisesAndMustBeManagingAnEnterprise');
        return Observable.forkJoin( this.enterprises.get().first(), this.enterprises.getCurrentEnterprise().first() )
        .map( results => {
            debugger;
            let enterpriseList: Enterprise[] = results[0];
            let currentEnterprise: Enterprise = results[1];
            if( enterpriseList.length > 0 && !currentEnterprise ){
                this.router.navigate(['/auth/seleccionarEmpresa'], { queryParams: { returnUrl: state.url }});
                return false;
            }
            return true;
        }).first();
    }
}
