import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { d } from './_guards/index';
// import { Service } from './../app/auth/auth.service';

export const contentRoutes: Routes = [
    { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
    { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },

];
@NgModule({
    imports: [
        RouterModule.forRoot(contentRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }
