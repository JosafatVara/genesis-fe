import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from '../orders.component';
import { OrdersListComponent } from '../orders-list/orders-list.component';

const routes: Routes = [
    {
        path: '',
        component: OrdersComponent,
        children: [
            {
                path: '',
                component: OrdersListComponent,
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
export class OrdersRoutingModule { }
