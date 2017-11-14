import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreelancersComponent } from '../freelancers.component';
import { FreelancerListComponent } from '../freelancer-list/freelancer-list.component';

const routes: Routes = [
  {
    path: '',
    component: FreelancersComponent,
    children: [
      {
        path: '',
        component: FreelancerListComponent,
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
export class FreelancersRoutingModule { }
