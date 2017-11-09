import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { QuotationsComponent } from "../quotations.component";

const routes: Routes = [
  {
    path: '',
    component: QuotationsComponent
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
export class QuotationsRoutingModule { }
