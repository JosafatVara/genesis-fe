import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from "@angular/forms"
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule, MatStepperModule } from '@angular/material';

import { ProvidersRoutingModule } from "./providers-routing/providers-routing.module";

import { ProvidersComponent } from './providers.component';
import { ModalCreateEditComponent } from "./modal-create-edit/modal-create-edit.component";

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, MatStepperModule, FormsModule, ReactiveFormsModule,
    ProvidersRoutingModule
  ],
  entryComponents: [
    ModalCreateEditComponent
  ],
  declarations: [ProvidersComponent, ModalCreateEditComponent]
})
export class ProvidersModule { }
