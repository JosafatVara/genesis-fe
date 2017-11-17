import { NgModule } from '@angular/core';

import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { AuthenticationRoutingModule } from './authentication-routing/authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SelectEnterpriseToManageComponent } from './select-enterprise-to-manage/select-enterprise-to-manage.component';


@NgModule({
  imports: [
    AuthenticationRoutingModule,
    SharedModule
  ],
  declarations: [AuthenticationComponent, LoginComponent, PasswordRecoveryComponent, SelectEnterpriseToManageComponent]
})
export class AuthenticationModule { }
