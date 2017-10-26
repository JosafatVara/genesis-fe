// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [

    ],
    declarations: [
        AuthComponent, LoginComponent,
    ],
    exports: [
        AuthComponent, LoginComponent,
    ]
})
export class AuthModule {

}
