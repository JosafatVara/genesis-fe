import { Observable } from "rxjs/Observable";
import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";

import { UsersService } from "../services/users.service";
import { User } from "../../shared/models/user";

@Injectable()
export class CurrentUserResolver implements Resolve<User> {
    
    resolve(): Observable<User>{
        return this.users.getCurrentUser().first();
    }

    constructor(private users: UsersService){

    }

}
