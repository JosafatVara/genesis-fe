//modules
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';

//components
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule    
  ],
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent]
})
export class DashboardModule { }
