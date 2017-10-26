// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ControlPanelComponent } from "./control-panel/control-panel.component";

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from './../shared/shared.module';
import { DashboardRouting } from "./dashboard.routing";

@NgModule({
    imports: [
        SharedModule, DashboardRouting
    ],
    declarations: [
        DashboardComponent,ControlPanelComponent
    ],
    exports: [
        DashboardComponent,ControlPanelComponent
    ]
})
export class DashboardModule {

}
