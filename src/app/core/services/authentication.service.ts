import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthenticationService{

  protected storage: LocalStorageService;

  constructor(storage: LocalStorageService) {
    this.storage = storage;
  }

  public login(username: string, password: string): Observable<boolean>{
    return Observable.of(true);
  }

  public isLogged(): Observable<boolean>{
    return Observable.of(false);
  }

  public getToken(): string{
    return '';
  }

  public recoverPassword(email: string): Observable<boolean>{
    return Observable.of(true);
  }

}
