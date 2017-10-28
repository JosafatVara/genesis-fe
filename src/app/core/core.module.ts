import { NgModule } from '@angular/core';

import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { LocalStorageService } from './services/local-storage.service';
import { EnterprisesService } from './services/enterprises.service';


@NgModule({
  imports: [
    
  ],
  declarations: [],
  providers: [
    AuthenticationService,
    UsersService,
    EnterprisesService,
    LocalStorageService
  ]
})
export class CoreModule { }
