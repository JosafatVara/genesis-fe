import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

// import { GroupsComponent } from './groups.component';
import { Service } from '../core/services/groups.service'
import { GroupsRoutingModule } from "./groups-routing/groups-routing.module";

import { GroupsComponent } from './groups.component';
import { GroupListComponent } from "./group-list/group-list.component";
import { GroupModalCrudComponent } from "./group-modal-crud/group-modal-crud.component";
// import { ModalCrudComponent } from "./modal-crud/modal-crud.component";
// import { ModalCreateComponent } from "./modal-create/modal-create.component";
// import { ModalUpdateComponent } from "./modal-update/modal-update.component";

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, HttpModule,
    GroupsRoutingModule
  ],
  entryComponents: [
    GroupModalCrudComponent
  ],
  declarations: [
    GroupsComponent,
    GroupListComponent, GroupModalCrudComponent
  ],
  providers: [
    Service,
  ]
})
export class GroupsModule { }
