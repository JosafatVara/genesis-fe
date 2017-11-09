import { NgModule } from '@angular/core';
import { FreelancersComponent } from './freelancers.component';
import { FreelancerListComponent } from './freelancer-list/freelancer-list.component';
import { FreelancerDetailsComponent } from './freelancer-details/freelancer-details.component';
import { DialogFreelancerDetailsComponent } from './dialog-freelancer-details/dialog-freelancer-details.component';
import { FreelancersRoutingModule } from './freelancers-routing/freelancers-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    FreelancersRoutingModule,
    SharedModule
  ],
  declarations: [FreelancersComponent, FreelancerListComponent, FreelancerDetailsComponent, DialogFreelancerDetailsComponent],
  entryComponents: [
    DialogFreelancerDetailsComponent
  ]
})
export class FreelancersModule { }
