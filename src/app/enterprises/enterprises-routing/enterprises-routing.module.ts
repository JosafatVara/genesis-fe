import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterprisesComponent } from '../enterprises.component';
import { EnterpriseListComponent } from '../enterprise-list/enterprise-list.component';
import { EnterpriseNoneComponent } from '../enterprise-none/enterprise-none.component';
import { MustBeManagingAnEnterpriseGuard } from './guards/must-be-managing-an-enterprise-guard';
import { MustNotHaveAnyCompanyGuard } from "./guards/must-not-have-any-company-guard";

const routes: Routes = [
  {
    path: '',
    component: EnterprisesComponent,
    children: [
      {
        path: '',
        component: EnterpriseListComponent,
        data: {
          inDashboard: true
        }
      },{
        path: 'sin-empresa',
        component: EnterpriseNoneComponent,
        canDeactivate: [
          MustBeManagingAnEnterpriseGuard
        ],
        canActivate: [
          MustNotHaveAnyCompanyGuard
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers :[
    MustBeManagingAnEnterpriseGuard,
    MustNotHaveAnyCompanyGuard
  ],
  exports: [
    RouterModule
  ]
})
export class EnterprisesRoutingModule { }
