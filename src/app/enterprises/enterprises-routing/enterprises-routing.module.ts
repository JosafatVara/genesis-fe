import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterprisesComponent } from '../enterprises.component';
import { EnterpriseListComponent } from '../enterprise-list/enterprise-list.component';
import { EnterpriseNoneComponent } from '../enterprise-none/enterprise-none.component';

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
        component: EnterpriseNoneComponent
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
export class EnterprisesRoutingModule { }
