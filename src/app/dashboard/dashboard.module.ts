//modules
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardRoutingModule } from "./dashboard-routing/dashboard-routing.module";

//components
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
  imports: [
    DashboardRoutingModule, FlexLayoutModule,CommonModule
  ],
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent]
})
export class DashboardModule { }
