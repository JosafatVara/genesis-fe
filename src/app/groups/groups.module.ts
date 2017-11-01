import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule } from '@angular/material';

// import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from "./groups-routing/groups-routing.module";

import { GroupsComponent } from './groups.component';
import { ModalAddComponent } from "./modal-add/modal-add.component";

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule,
    GroupsRoutingModule
  ],
  entryComponents: [
    ModalAddComponent
  ],
  declarations: [GroupsComponent, ModalAddComponent]
})
export class GroupsModule { }
