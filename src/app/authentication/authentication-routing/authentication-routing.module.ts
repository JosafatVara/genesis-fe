import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { AuthenticationComponent } from '../authentication.component';
import { PasswordRecoveryComponent } from '../password-recovery/password-recovery.component';
import { SelectEnterpriseToManageComponent } from "../select-enterprise-to-manage/select-enterprise-to-manage.component";
import { EnterpriseListResolver } from "../../core/resolvers/enterprise-list-resolver";
import { MustHaveEnterprisesGuard } from "./guards/must-have-enterprises-guard";
import { MustRecoverMeGuard } from '../../app-routing/guards/must-recover-me-guard';

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
        path: 'recuperarPassword',
        component: PasswordRecoveryComponent,
        data: {
          animation: 'recovery-password'
        }
      },{
        path: 'seleccionarEmpresa',
        component: SelectEnterpriseToManageComponent,
        canActivate: [
          MustHaveEnterprisesGuard,
          MustRecoverMeGuard
        ],
        data: {
          animation: 'select-enterprise-to-manage'
        },
        resolve: {
          enterpriseList: EnterpriseListResolver
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
  providers: [
    MustHaveEnterprisesGuard
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule { }
