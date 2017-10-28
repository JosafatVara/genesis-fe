import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService{

  constructor() { }

  public login(username: string, password: string): Observable<boolean>{
    return Observable.of(true);
  }

  public isLogged(): Observable<boolean>{
    return Observable.of(true);
  }

}
