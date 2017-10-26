// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FlexLayoutModule } from '@angular/flex-layout';


// This Module's Components
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
    ],
    declarations: [
        HeaderComponent, SidebarComponent
    ],
    exports: [
        HeaderComponent, SidebarComponent
    ]
})
export class SharedModule {

}
