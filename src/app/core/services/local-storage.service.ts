import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  public save(key: string, value: any): void{
    localStorage.setItem(key, JSON.stringify(value));
  }

  public load<T>(key: string): T | string{
    try{
      return JSON.parse(localStorage.getItem(key));
    }catch(ex){
      return localStorage.getItem(key);
    }
  }

  public remove<T>(key: string): void{
    return localStorage.removeItem(key);
  }

}
