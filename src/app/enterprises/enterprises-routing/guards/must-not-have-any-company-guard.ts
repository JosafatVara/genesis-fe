import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { EnterprisesService } from "../../../core/services/enterprises.service";
import { Injectable } from "@angular/core";

@Injectable()
export class MustNotHaveAnyCompanyGuard implements CanActivate {

    constructor(private enterprises: EnterprisesService, private router: Router){
        
    }

    canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.enterprises.getCurrentEnterprise().map(  e => {
            if( e != undefined){
                this.router.navigateByUrl('/dashboard');
                return false;
            }
            return true;
        });
    }

}
