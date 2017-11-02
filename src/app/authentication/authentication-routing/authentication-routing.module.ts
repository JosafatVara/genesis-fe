import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { AuthenticationComponent } from '../authentication.component';
import { PasswordRecoveryComponent } from '../password-recovery/password-recovery.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        data: {
          animation: 'login'
        }
      },
      {
        path: 'recuperar-password',
        component: PasswordRecoveryComponent,
        data: {
          animation: 'recovery-password'
        }
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)    
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule { }
