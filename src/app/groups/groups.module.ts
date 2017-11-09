import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

// import { GroupsComponent } from './groups.component';
import { Service } from './groups.service'
import { GroupsRoutingModule } from "./groups-routing/groups-routing.module";

import { GroupsComponent } from './groups.component';
import { ModalCrudComponent } from "./modal-crud/modal-crud.component";
import { ModalCreateComponent } from "./modal-create/modal-create.component";
import { ModalUpdateComponent } from "./modal-update/modal-update.component";

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,HttpModule,
    GroupsRoutingModule
  ],
  entryComponents: [
    ModalCrudComponent, ModalUpdateComponent, ModalCreateComponent
  ],
  declarations: [
    GroupsComponent, ModalCrudComponent, ModalUpdateComponent, ModalCreateComponent
  ],
  providers: [
    Service,
  ]
})
export class GroupsModule { }
