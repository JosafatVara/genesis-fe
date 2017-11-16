// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
//modules
import { Service } from '../core/services/groups.service'
import { OrdersRoutingModule } from "./orders-routing/orders-routing.module";
// This Module's Components
import { OrdersComponent } from './orders.component';
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { OrdersModalCrudComponent } from "./orders-modal-crud/orders-modal-crud.component";



@NgModule({
    imports: [
        CommonModule, FlexLayoutModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, HttpModule,
        OrdersRoutingModule
    ],
    entryComponents: [
        OrdersModalCrudComponent
    ],
    declarations: [
        OrdersComponent, OrdersListComponent, OrdersModalCrudComponent
    ],
    exports: [
        OrdersComponent, OrdersListComponent, OrdersModalCrudComponent
    ]
})
export class OrdersModule {

}
