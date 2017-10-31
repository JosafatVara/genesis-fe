import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { PurchasesProductsComponent } from "../purchases-products.component";

const routes: Routes = [
  {
    path: '',
    component: PurchasesProductsComponent
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
export class PurchasesProductsRoutingModule { }
