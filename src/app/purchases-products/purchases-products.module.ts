import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { PurchasesProductsRoutingModule } from "./purchases-products-routing/purchases-products-routing.module";

import { PurchasesProductsComponent } from './purchases-products.component';



@NgModule({
  imports: [
    CommonModule,FlexLayoutModule,
    PurchasesProductsRoutingModule
  ],
  declarations: [
    PurchasesProductsComponent
  ]
})
export class PurchasesProductsModule { }
