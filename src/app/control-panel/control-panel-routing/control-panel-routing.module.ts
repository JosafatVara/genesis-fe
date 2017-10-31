import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { ControlPanelComponent } from "../control-panel.component";

const routes: Routes = [
  {
    path: '',
    component: ControlPanelComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ControlPanelRoutingModule { }
