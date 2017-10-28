import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';

export abstract class BaseService {
    protected http: HttpClient;
    protected baseUrl: string;
    protected resourceUrl: string;

    protected get actionUrl(): string{
        return Location.joinWithSlash(this.baseUrl,this.resourceUrl);
    }

    constructor(http: HttpClient, resourceUrl: string){
        this.resourceUrl = resourceUrl;
        this.http = http;
        this.baseUrl = environment.beUrl;
    }
}
