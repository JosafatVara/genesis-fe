import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ControlPanelComponent } from './control-panel/control-panel.component';
import { DashboardComponent } from './dashboard.component';

// import { SigninComponent } from './signin/signin.component';
// import { RecoverPasswordComponent } from './recover-password/recover-password.component'
// import { ResetPasswordComponent } from './reset-password/reset-password.component'



export const contentRoutes: Routes = [
    { path: '', component: DashboardComponent },
    // { path: 'registrarse', component: SigninComponent },
    // { path: 'recuperar-contraseña', component: RecoverPasswordComponent },
    // { path: 'resetear-contraseña', component: ResetPasswordComponent },
    

];
@NgModule({
    imports: [
        RouterModule.forChild(contentRoutes)
    ],
    exports: [RouterModule]
})
export class DashboardRouting { }
