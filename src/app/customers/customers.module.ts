import { CustomerService } from './../core/services/customers.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule, MatStepperModule } from '@angular/material';

import { CustomersRoutingModule } from "./customers-routing/customers-routing.module";
import { SharedModule } from '../shared/shared.module';

import { CustomersComponent } from './customers.component';
import { ContactsService } from '../core/services/contacs.service';
import { CustomerModalCrudComponent } from './customer-modal-crud/customer-modal-crud.component';
import { ContactModalCrudComponent } from "./contact-modal-crud/contact-modal-crud.component";
import { CustomerListComponent } from './customer-list/customer-list.component';


@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, MatStepperModule, FormsModule, ReactiveFormsModule,
    CustomersRoutingModule, SharedModule
  ],
  entryComponents: [
    CustomerModalCrudComponent, ContactModalCrudComponent
  ],
  declarations: [
    CustomersComponent, CustomerModalCrudComponent, ContactModalCrudComponent, CustomerListComponent,
  ],
  providers: [
    CustomerService, ContactsService
  ]
})
export class CustomersModule { }
