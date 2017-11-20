import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { LocalStorageService } from './services/local-storage.service';
import { EnterprisesService } from './services/enterprises.service';
import { EnterpriseListResolver } from './resolvers/enterprise-list-resolver';
import { DepartmentsService } from './services/departments.service';
import { EmployeesQuantitiesService } from './services/employees-quantities.service';
import { RolesService } from './services/roles.service';
import { EmployeesService } from './services/employees.service';
import { AffiliationsService } from './services/affiliations.service';
import { FreelancersService } from './services/freelancers.service';
import { CurrentEnterpriseResolver } from './resolvers/current-enterprise-resolver';
import { StaffPaymentsService } from './services/staff-payments.service';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';
import { ImagesService } from './utils/images/images.service';
import { ToastService } from './utils/toast/toast.service';
import { ToastComponent } from './utils/toast/toast.component';
import { CommonModule } from '@angular/common';
import { FreelancersPaymentsService } from "./services/freelancers-payments.service";
import { MonthSelectorComponent } from './utils/month-selector/month-selector.component';
import { MonthSelectorService } from './utils/month-selector/month-selector.service';
import { SelectMonthResolver } from './resolvers/select-month-resolver';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    HttpClientModule,
    MatSnackBarModule,
    CommonModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  declarations: [ToastComponent, MonthSelectorComponent],
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
    StaffPaymentsService,
    FreelancersPaymentsService,

    //RESOLVERS
    EnterpriseListResolver,
    CurrentEnterpriseResolver,
    SelectMonthResolver,

    //UTILS
    ImagesService,
    ToastService,
    MonthSelectorService
  ],
  exports: [
    BrowserAnimationsModule
  ],
  entryComponents: [
    ToastComponent,
    MonthSelectorComponent
  ]
})
export class CoreModule { }
