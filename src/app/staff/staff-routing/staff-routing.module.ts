import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { StaffComponent } from "../staff.component";
import { StaffListComponent } from "../staff-list/staff-list.component";

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: '',
        component: StaffListComponent,
        data: {
          inDashboard: true
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class StaffRoutingModule { }
