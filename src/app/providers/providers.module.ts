import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule, MatStepperModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { ProvidersRoutingModule } from "./providers-routing/providers-routing.module";
import { SharedModule } from '../shared/shared.module';
import { Service } from './providers.service'


import { ProvidersComponent } from './providers.component';
import { ModalCreateComponent } from './modal-create/modal-create.component'
import { ModalUpdateComponent } from "./modal-update/modal-update.component";

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, MatStepperModule, FormsModule, ReactiveFormsModule, HttpModule,
    ProvidersRoutingModule, SharedModule
  ],
  entryComponents: [
    ModalCreateComponent, ModalUpdateComponent
  ],
  declarations: [ProvidersComponent, ModalCreateComponent, ModalUpdateComponent],
  providers: [
    Service
  ]
})
export class ProvidersModule { }
