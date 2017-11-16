import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { ProvidersComponent } from "../providers.component";
import { ProvidersListComponent } from "../providers-list/providers-list.component";

const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent,
    children: [
      {
        path: '',
        component: ProvidersListComponent,
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
export class ProvidersRoutingModule { }
