import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from "@angular/forms"
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule, MatStepperModule } from '@angular/material';

import { CustomersRoutingModule } from "./customers-routing/customers-routing.module";
import { SharedModule } from '../shared/shared.module';

import { CustomersComponent} from './customers.component';
import { ModalCrudComponent } from "./modal-crud/modal-crud.component";

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, MatStepperModule, FormsModule, ReactiveFormsModule,
    CustomersRoutingModule,SharedModule
  ],
  entryComponents:[
    ModalCrudComponent    
  ],
  declarations: [CustomersComponent,ModalCrudComponent]
})
export class CustomersModule { }
