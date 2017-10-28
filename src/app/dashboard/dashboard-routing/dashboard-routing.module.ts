import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "../dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // children: [
    //   {
    //     path: 'inicio',
    //     loadChildren: 'app/home/home.module#HomeModule'
    //   },
    //   {
    //     path: 'estadisticas',
    //     loadChildren: 'app/statistics/statistics.module#StatisticsModule'
    //   },

    // ]
  }
];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]

})
export class DashboardRoutingModule { }
