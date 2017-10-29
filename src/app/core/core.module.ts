import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { LocalStorageService } from './services/local-storage.service';
import { EnterprisesService } from './services/enterprises.service';
import { EnterpriseListResolver } from './resolvers/enterprise-list-resolver';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    //SERVICES
    AuthenticationService,
    UsersService,
    EnterprisesService,
    LocalStorageService,

    //RESOLVERS
    EnterpriseListResolver,
  ],
  exports: [
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
