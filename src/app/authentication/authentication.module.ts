import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';


@NgModule({
  imports: [
    
  ],
  declarations: [AuthenticationComponent, LoginComponent, PasswordRecoveryComponent]
})
export class AuthenticationModule { }
