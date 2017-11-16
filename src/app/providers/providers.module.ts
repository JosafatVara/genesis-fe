import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule, MatStepperModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpModule } from '@angular/http';

import { Service } from '../core/services/providers.service'
import { ProvidersRoutingModule } from "./providers-routing/providers-routing.module";

import { ProvidersComponent } from './providers.component';
import { ProvidersListComponent } from "./providers-list/providers-list.component";
import { ProvidersModalCrudComponent } from "./providers-modal-crud/providers-modal-crud.component";
import { ContactsModalCrudComponent } from "./contacts-modal-crud/contacts-modal-crud.component";


@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, MatStepperModule, FormsModule, ReactiveFormsModule, HttpModule,
    ProvidersRoutingModule
  ],
  entryComponents: [
    ProvidersModalCrudComponent, ContactsModalCrudComponent
  ],
  declarations: [
    ProvidersComponent,
    ProvidersModalCrudComponent, ProvidersListComponent, ContactsModalCrudComponent
  ],
  providers: [
    Service
  ]
})
export class ProvidersModule { }
