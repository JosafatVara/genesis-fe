import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { EnterprisesComponent } from '../enterprises.component';
import { EnterpriseListComponent } from '../enterprise-list/enterprise-list.component';

const routes: Routes = [
  {
    path: '',
    component: EnterprisesComponent,
    children: [
      {
        path: '',
        component: EnterpriseListComponent
      }
    ]
  }
]

@NgModule({
  imports: [

  ],
  declarations: []
})
export class EnterprisesRoutingModule { }
