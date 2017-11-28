import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Observable } from 'rxjs';
import { Enterprise } from "../../shared/models/enterprise";
import { UsersService } from "../../core/services/users.service";
import { EnterprisesService } from "../../core/services/enterprises.service";

@Injectable()
export class MustBeUnauthenticatedOrSelectEnterpriseRequiredGuard implements CanActivate{
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
    return this.auth.isLogged().first().flatMap( logged => {
      if(!logged){
        return Observable.of(true);
      }else{
        return Observable.zip(this.users.getCurrentUser().first(), this.enterprises.getCurrentEnterprise().first()).map(
        (r) => {
          let currentUser = r[0];
          let currentEnterprise = r[1];
          if(currentUser.enterprisesQuantity > 0 && !currentEnterprise && 
            state.url.toString().includes('seleccionarEmpresa')){
            return true;          
          // else if(logged)
          // if(logged && currentUser.enterprisesQuantity > 0 && !currentEnterprise){
          //   // this.router.navigate(['/seleccionarEmpresa']);
          //   return true;
          }else{
            this.router.navigate(['/']);
            return false;
          }
        }).first();
      }
    }).first();    
  }

  constructor(private router : Router, private auth : AuthenticationService, private users: UsersService,
    private enterprises: EnterprisesService){
    
  }

}
