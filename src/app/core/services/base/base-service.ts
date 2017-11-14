import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';

export abstract class BaseService {
    protected http: HttpClient;
    protected baseUrl: string;
    protected resourceUrl: string;
    protected clearBaseUrl: string;
    
    protected get actionUrl(): string{
        return Location.joinWithSlash(this.baseUrl,this.resourceUrl);
    }
    
    constructor(http: HttpClient, resourceUrl: string){
        this.resourceUrl = resourceUrl;
        this.http = http;
        this.clearBaseUrl = `${environment.beUrl}`;
        this.baseUrl = `${environment.beUrl}api/v1/`;
    }    

    protected makeRandomString(length: number){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
    }
    
    protected makeRandomNumber(length: number){
    var text = "";
    var possible = "1234567890";
    
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
    }
}
