import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from "@angular/forms"
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule, MatStepperModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { QuotationsRoutingModule } from "./quotations-routing/quotations-routing.module";

import { QuotationsComponent } from './quotations.component';
import { ModalCrudComponent } from "./modal-crud/modal-crud.component";
@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, MatStepperModule, FormsModule, ReactiveFormsModule,
    QuotationsRoutingModule,SharedModule
  ],
  entryComponents:[
    ModalCrudComponent    
  ],
  declarations: [QuotationsComponent,ModalCrudComponent]
})
export class QuotationsModule { }

