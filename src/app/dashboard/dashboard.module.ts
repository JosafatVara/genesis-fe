//modules
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from "./dashboard-routing/dashboard-routing.module";

//components
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
  imports: [
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent]
})
export class DashboardModule { }
