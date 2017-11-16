// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
//modules
import { Service } from '../core/services/groups.service'
import { ReportsRoutingModule } from "./reports-routing/reports-routing.module";
// This Module's Components
import { ReportsComponent } from './reports.component';
import { ReportListComponent } from "./report-list/report-list.component";
import { ReportModalCrudComponent } from "./report-modal-crud/report-modal-crud.component";


@NgModule({
    imports: [
        CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, HttpModule, MatSelectModule,
        ReportsRoutingModule
    ],
    entryComponents: [
        ReportModalCrudComponent
    ],
    declarations: [
        ReportsComponent, ReportListComponent, ReportModalCrudComponent
    ],
    exports: [
        ReportsComponent, ReportListComponent, ReportModalCrudComponent
    ]

})
export class ReportsModule {

}
