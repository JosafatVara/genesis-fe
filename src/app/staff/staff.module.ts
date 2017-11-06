import { NgModule } from '@angular/core';
import { StaffComponent } from './staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { DialogStaffDetailsComponent } from './dialog-staff-details/dialog-staff-details.component';
import { SharedModule } from '../shared/shared.module';
import { StaffRoutingModule } from "./staff-routing/staff-routing.module";
import { MatStepperModule } from "@angular/material";


@NgModule({
  imports: [
    SharedModule,
    StaffRoutingModule,
    MatStepperModule
  ],
  declarations: [StaffComponent, StaffListComponent, StaffDetailsComponent, DialogStaffDetailsComponent],
  entryComponents: [
    DialogStaffDetailsComponent
  ]
})
export class StaffModule { }
