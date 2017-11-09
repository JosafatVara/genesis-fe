import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule, AppRoutingModule,
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
