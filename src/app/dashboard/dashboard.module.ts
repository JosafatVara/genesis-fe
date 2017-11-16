//modules
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardRoutingModule } from "./dashboard-routing/dashboard-routing.module";
import { ControlPanelModule } from "../control-panel/control-panel.module";
import { PurchasesProductsModule } from "../purchases-products/purchases-products.module";
import { ProvidersModule } from "../providers/providers.module";
import { GroupsModule } from "../groups/groups.module";
import { SharedModule } from '../shared/shared.module';
import { QuotationsModule } from "../quotations/quotations.module";
import { CustomersModule } from "../customers/customers.module";
import { OrdersModule } from "../orders/orders.module";
import { ReportsModule } from "../reports/reports.module";


//components

import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AccountOptionsComponent } from './account-options/account-options.component';
import { ActionsComponent } from "./actions/actions.component";

@NgModule({
  imports: [
    FlexLayoutModule, CommonModule,
    SharedModule, DashboardRoutingModule, ControlPanelModule, PurchasesProductsModule, ProvidersModule, GroupsModule, QuotationsModule, CustomersModule, OrdersModule, ReportsModule
  ],
  declarations: [
    ActionsComponent,
    DashboardComponent, HeaderComponent, SidebarComponent, AccountOptionsComponent
  ],

})
export class DashboardModule { }
