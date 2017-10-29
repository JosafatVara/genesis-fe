import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class MustBeUnauthenticatedGuard implements CanActivate{
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.auth.isLogged().map(
      logged => {
        if(logged){
          this.router.navigate(['/auth']);
        }
        return !logged;
      }
    );
  }

  constructor(private router : Router, private auth : AuthenticationService){
    
  }

}
