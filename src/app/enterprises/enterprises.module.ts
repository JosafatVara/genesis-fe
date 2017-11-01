import { NgModule } from '@angular/core';

import { EnterprisesComponent } from './enterprises.component';
import { EnterpriseListComponent } from './enterprise-list/enterprise-list.component';
import { EnterpriseDetailsComponent } from './enterprise-details/enterprise-details.component';
import { EnterpriseNoneComponent } from './enterprise-none/enterprise-none.component';
import { SharedModule } from '../shared/shared.module';
import { EnterprisesRoutingModule } from './enterprises-routing/enterprises-routing.module';
import { DialogEnterpriseNoneComponent } from './dialog-enterprise-none/dialog-enterprise-none.component';
import { DialogEnterpriseDetailsComponent } from './dialog-enterprise-details/dialog-enterprise-details.component';

@NgModule({
  imports: [
    SharedModule,
    EnterprisesRoutingModule
  ],
  declarations: [
    EnterprisesComponent, 
    EnterpriseListComponent, 
    EnterpriseDetailsComponent, 
    EnterpriseNoneComponent, 
    DialogEnterpriseNoneComponent, DialogEnterpriseDetailsComponent
  ],
  entryComponents: [
    DialogEnterpriseNoneComponent,
    DialogEnterpriseDetailsComponent
  ]
})
export class EnterprisesModule { }
