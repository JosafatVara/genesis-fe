import { CanActivate, Router } from "@angular/router";
import { UsersService } from "../../../core/services/users.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { RolesService } from "../../../core/services/roles.service";
import { AuthenticationService } from "../../../core/services/authentication.service";

@Injectable()
export class MustRecoverMeGuard implements CanActivate{

    constructor(private auth: AuthenticationService, private users: UsersService, private roles: RolesService, private router: Router){
        
    }

    canActivate(): Observable<boolean>{
        return this.auth.isLogged().first().flatMap( logged => {
            if(!logged){                    
                this.router.navigateByUrl('/auth');
                return Observable.of(false);
            }else{
                return this.roles.populate().flatMap( () => 
                    this.users.getCurrentUser().first()
                    .map( u =>{
                        if(u){
                            if(u.enterprisesQuantity == 0){                        
                                this.router.navigateByUrl('/');
                                return false;
                            }
                            return true;
                        }
                        return false;
                    }).catch( err => {
                        return Observable.of(false);
                    }));
            }
        }).first();
        
    }
}
