import { Resolve } from "@angular/router";
import { Enterprise } from "../../shared/models/enterprise";
import { EnterprisesService } from "../services/enterprises.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class CurrentEnterpriseResolver implements Resolve<Enterprise>{

    constructor(private enterprises: EnterprisesService){
        
    }

    resolve(): Observable<Enterprise> | Promise<Enterprise> {
        return this.enterprises.getCurrentEnterprise().first();
    }
}
