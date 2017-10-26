import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRouting } from './app.routing';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouting, DashboardModule, AuthModule,SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
