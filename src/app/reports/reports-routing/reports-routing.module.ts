import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from '../reports.component';
import { ReportListComponent } from '../report-list/report-list.component';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
        children: [
            {
                path: '',
                component: ReportListComponent,
                data: {
                    inDashboard: true
                }
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class ReportsRoutingModule {

}
