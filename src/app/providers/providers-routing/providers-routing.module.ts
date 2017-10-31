import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { ProvidersComponent } from "../providers.component";


const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent
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
export class ProvidersRoutingModule { }
