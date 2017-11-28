import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UsersService } from "../../core/services/users.service";
import { EnterprisesService } from "../../core/services/enterprises.service";

@Injectable()
export class MustBeAuthenticatedGuard implements CanActivate {

    constructor(private router : Router, private auth : AuthenticationService, private users: UsersService,
        private enterprises: EnterprisesService){
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {  
        return this.auth.isLogged().first().flatMap( logged => { 
            if(!logged){
                this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
                return Observable.of(false);
            }else{
                return Observable.zip(this.users.getCurrentUser().first(), this.enterprises.getCurrentEnterprise().first())
                .map(
                    (r) => {
                        let currentUser = r[0];
                        let currentEnterprise = r[1];                
                        if(logged && currentUser && currentUser.enterprisesQuantity > 0 && !currentEnterprise){
                            this.router.navigate(['/auth/seleccionarEmpresa'], { queryParams: { returnUrl: state.url }});
                            return false;
                        }else if(logged && currentEnterprise && currentUser.enterprisesQuantity == 0){
                            this.router.navigate(['/empresas/sin-empresa'], { queryParams: { returnUrl: state.url }});
                        }
                        return true;
                    }
                ).first();
            }
        });        
    }
}
