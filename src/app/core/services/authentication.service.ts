import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { BaseService } from './base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService extends BaseService{

  protected storage: LocalStorageService;

  constructor(storage: LocalStorageService, http: HttpClient) {
    super(http,'');
    this.storage = storage;
  }

  public login(username: string, password: string): Observable<boolean>{
    return this.http.post(this.baseUrl+'api/v1/accounts/login/',{
      email: username,
      password: password
    }).map( (result: {token: string}) => {
      if(result.token){        
        this.storage.save('token',result.token);
        return true;
      }
      return false;
    }, err => {
      return false;
    }).catch( ex => {
      return Observable.of(false);
    });
  }

  public logout(): Observable<boolean>{
    this.storage.remove('token');
    return Observable.of(true);
  }

  public isLogged(): Observable<boolean>{
    return Observable.of(this.storage.load('token') != undefined);
  }

  public getToken(): string{
    return '******';
  }

  public recoverPassword(email: string): Observable<boolean>{
    return this.http.post(this.baseUrl+'/api/v1/accounts/user/recovery/',{
      email: email
    }).map( (send: { detail: string}) =>{
      if(send.detail=='OK'){
        return true;
      }
      return false;
    }).catch( err =>{
      return Observable.of(false);
    });
  }

}
