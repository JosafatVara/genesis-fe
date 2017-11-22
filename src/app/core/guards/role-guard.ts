import { CanActivate, Router } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UsersService } from "../services/users.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(private users: UsersService, private router: Router){
    }
    
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean>{
        let disabledFor: string = route.data.disabledFor;
        return Observable.zip( this.users.getCurrentUser(), this.users.get() ).map( rs => {
            let myRole = rs[1].find( u => u.id == rs[0].id).role.name;
            if(!myRole) return true;
            for(let i = 0; i < disabledFor.length; i++){
                if(myRole.toLocaleLowerCase() == disabledFor[i].toLocaleLowerCase()){
                    this.router.navigateByUrl('/dashboard');
                }
            }
            return true;
        });
    }
    
}
