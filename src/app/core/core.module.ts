import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { NgProgressModule, NgProgressInterceptor  } from 'ngx-progressbar';

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
import { MonthSelectorService } from './utils/month-selector/month-selector.service';
import { SelectMonthResolver } from './resolvers/select-month-resolver';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoleGuard } from './guards/role-guard';
import { SimpleCrudComponent } from './utils/simple-crud/simple-crud.component';
import { SimpleCrudService } from "./utils/simple-crud/simple-crud.service";
import { SharedModule } from "../shared/shared.module";
import { CurrentUserResolver } from "./resolvers/current-user-resolver";
import { MonthSelectorComponent } from "./utils/month-selector/month-selector.component";
import { ProvidersPaymentsService } from './services/providers-payments.service';
import { QuotationsService } from './services/quotations.service';
import { ConfirmDialogService } from './utils/confirm-dialog/confirm-dialog.service';
import { SelectDialogComponent } from './utils/select-dialog/select-dialog.component';
import { SelectDialogService } from './utils/select-dialog/select-dialog.service';
import { QuotationStatesService } from './services/quotation-states.service';
import { DatetimeHelperService } from "./utils/datetime-helper/datetime-helper.service";


@NgModule({
  imports: [
    HttpClientModule,
    MatSnackBarModule,
    SharedModule,
  ],
  declarations: [ToastComponent, SimpleCrudComponent, MonthSelectorComponent, SelectDialogComponent],
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
    ProvidersPaymentsService,
    QuotationsService,
    QuotationStatesService,

    //RESOLVERS
    EnterpriseListResolver,
    CurrentEnterpriseResolver,
    SelectMonthResolver,
    CurrentUserResolver,

    //UTILS
    ImagesService,
    ToastService,
    MonthSelectorService,
    SimpleCrudService,    
    ConfirmDialogService,
    SelectDialogService,
    DatetimeHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },

    //GUARDS
    RoleGuard
  ],
  exports: [
    BrowserAnimationsModule,
    NgProgressModule
  ],
  entryComponents: [
    ToastComponent,
    SimpleCrudComponent,
    MonthSelectorComponent,
    SelectDialogComponent
  ]
})
export class CoreModule { }
