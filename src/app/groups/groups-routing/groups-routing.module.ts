import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { GroupsComponent } from "../groups.component";

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent
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
export class GroupsRoutingModule { }
