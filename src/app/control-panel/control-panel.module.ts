import { NgModule } from '@angular/core';
import { ControlPanelRoutingModule } from "./control-panel-routing/control-panel-routing.module";

import { ControlPanelComponent } from './control-panel.component';


@NgModule({
  imports: [
    ControlPanelRoutingModule
  ],
  declarations: [
    ControlPanelComponent
  ],
  exports: [
    // ControlPanelComponent
  ]
})
export class ControlPanelModule { }
