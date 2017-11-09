import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { LocalStorageService } from './services/local-storage.service';
import { EnterprisesService } from './services/enterprises.service';
import { EnterpriseListResolver } from './resolvers/enterprise-list-resolver';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentsService } from './services/departments.service';
import { EmployeesQuantitiesService } from './services/employees-quantities.service';
import { RolesService } from './services/roles.service';
import { ImagesService } from './utils/images.service';
import { EmployeesService } from './services/employees.service';
import { AffiliationsService } from './services/affiliations.service';
import { FreelancersService } from './services/freelancers.service';
import { CurrentEnterpriseResolver } from './resolvers/current-enterprise-resolver';
import { PaymentsService } from './services/payments.service';


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
    DepartmentsService,
    EmployeesQuantitiesService,
    RolesService,
    EmployeesService,
    FreelancersService,
    AffiliationsService,
    PaymentsService,

    //RESOLVERS
    EnterpriseListResolver,
    CurrentEnterpriseResolver,

    //UTILS
    ImagesService
  ],
  exports: [
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
