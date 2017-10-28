import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class MustBeAuthenticatedGuard implements CanActivate {

    constructor(private router : Router, private auth : AuthenticationService){
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(!this.auth.isLogged()){
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }    
        return true;
    }
}
