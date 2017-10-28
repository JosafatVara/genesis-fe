import { BaseService } from "./base-service";
import { AuthenticationService } from "../authentication.service";
import { HttpClient } from "@angular/common/http";

export abstract class AuthenticatedService extends BaseService{

    constructor(auth: AuthenticationService, http: HttpClient, resourceUrl: string){
        super(http,resourceUrl);
    }

}
