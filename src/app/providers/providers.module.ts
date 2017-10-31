import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ProvidersRoutingModule } from "./providers-routing/providers-routing.module";


import { ProvidersComponent } from './providers.component';



@NgModule({
  imports: [
    CommonModule,FlexLayoutModule,    
    ProvidersRoutingModule
  ],
  declarations: [ProvidersComponent]
})
export class ProvidersModule { }
