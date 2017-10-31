//modules
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardRoutingModule } from "./dashboard-routing/dashboard-routing.module";
import { ControlPanelModule } from "../control-panel/control-panel.module";
import { PurchasesProductsModule } from "../purchases-products/purchases-products.module";
import { ProvidersModule } from "../providers/providers.module";


import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';

//components
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    FlexLayoutModule, CommonModule,
    DashboardRoutingModule, ControlPanelModule, PurchasesProductsModule, ProvidersModule
  ],
  declarations: [
    DashboardComponent, HeaderComponent, SidebarComponent
  ],

})
export class DashboardModule { }
