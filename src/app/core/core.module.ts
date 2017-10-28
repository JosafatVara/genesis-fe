import { NgModule } from '@angular/core';

import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { LocalStorageService } from './services/local-storage.service';


@NgModule({
  imports: [
    
  ],
  declarations: [],
  providers: [
    AuthenticationService,
    UsersService,
    LocalStorageService
  ]
})
export class CoreModule { }
