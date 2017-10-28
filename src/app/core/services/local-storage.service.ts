import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  public save(key: string, value: any): void{

  }

  public load<T>(key: string): T{
    return undefined;
  }

  public remove<T>(key: string): T{
    return undefined;
  }

}
