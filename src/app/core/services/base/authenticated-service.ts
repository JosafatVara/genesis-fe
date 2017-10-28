import { BaseService } from "./base-service";
import { AuthenticationService } from "../authentication.service";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

export abstract class AuthenticatedService extends BaseService{

    protected auth: AuthenticationService;

    constructor(auth: AuthenticationService, http: HttpClient, resourceUrl: string){
        super(http,resourceUrl);
        this.auth = auth;
    }

    protected get authHttpHeaders() : HttpHeaders{
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('Authorization', 'Token '+this.auth.getToken());
        return httpHeaders;
    }
}
