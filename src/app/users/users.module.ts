import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing/users-routing.module';
import { DialogUserDetailsComponent } from './dialog-user-details/dialog-user-details.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserListComponent, UserDetailsComponent, UsersComponent, DialogUserDetailsComponent],
  entryComponents: [
    DialogUserDetailsComponent
  ]
})
export class UsersModule { }
