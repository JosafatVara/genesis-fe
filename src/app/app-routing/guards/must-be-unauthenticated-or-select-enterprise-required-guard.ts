import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Observable } from 'rxjs';
import { Enterprise } from "../../shared/models/enterprise";

@Injectable()
export class MustBeUnauthenticatedOrSelectEnterpriseRequiredGuard implements CanActivate{
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
    
    return this.auth.isLogged().map(
      logged => {
        if(logged&&state.url.toString().includes('seleccionarEmpresa')){
          return true;          
        }else if(logged){
          this.router.navigate(['/auth']);
        }
        return !logged;
      }).first();
    // );
    // return Observable.forkJoin(this.enterprises.getCurrentEnterprise().first(), this.auth.isLogged().first())
    //   .map( results => {
    //     let logged: boolean = results[1];
    //     if(logged&&!currentEnterprise){

    //     }
    //     return true;
    //   })
  }

  constructor(private router : Router, private auth : AuthenticationService){
    
  }

}
