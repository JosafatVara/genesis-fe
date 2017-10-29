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
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'recuperar-password',
        component: PasswordRecoveryComponent
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
