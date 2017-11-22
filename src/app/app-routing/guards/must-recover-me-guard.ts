import { CanActivate } from "@angular/router";
import { UsersService } from "../../core/services/users.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { RolesService } from "../../core/services/roles.service";

@Injectable()
export class MustRecoverMeGuard implements CanActivate{

    constructor(private users: UsersService, private roles: RolesService){
        
    }

    canActivate(): Observable<boolean>{
        return this.roles.populate().flatMap( () => 
            this.users.getCurrentUser().first()
            .map( u =>{
                if(u){
                    return true;
                }
                return false;
            }).catch( err => {
                return Observable.of(false);
            }));
    }
}
