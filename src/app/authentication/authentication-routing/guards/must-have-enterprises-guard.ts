import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { EnterprisesService } from "../../../core/services/enterprises.service";
import { Injectable } from "@angular/core";

@Injectable()
export class MustHaveEnterprisesGuard implements CanActivate {

    constructor(private enterprises: EnterprisesService, private router: Router){
        
    }

    canActivate():Observable<boolean> {
        console.log('MustHaveEnterprisesGuard');
        return this.enterprises.get().map( es => {
            if(es.length == 0){
                this.router.navigateByUrl('/');
                return false;
            }
            return true;
        }).first()
    }
}
