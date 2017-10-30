import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterprisesComponent } from '../enterprises.component';
import { EnterpriseListComponent } from '../enterprise-list/enterprise-list.component';
import { EnterpriseNoneComponent } from '../enterprise-none/enterprise-none.component';
import { MustBeManagingAnEnterpriseGuard } from './guards/must-be-managing-an-enterprise-guard';

const routes: Routes = [
  {
    path: '',
    component: EnterprisesComponent,
    children: [
      {
        path: '',
        component: EnterpriseListComponent
      },{
        path: 'sin-empresa',
        component: EnterpriseNoneComponent,
        canDeactivate: [
          MustBeManagingAnEnterpriseGuard
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
    MustBeManagingAnEnterpriseGuard
  ],
  exports: [
    RouterModule
  ]
})
export class EnterprisesRoutingModule { }
