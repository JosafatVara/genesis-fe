import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { DialogUserDetailsComponent } from '../dialog-user-details/dialog-user-details.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'gen-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public inDashboard: boolean;
  public userList: Array<User>;
  public currentUser: User;

  constructor(private users: UsersService, route: ActivatedRoute ,private matDialog: MatDialog) {
    users.getCurrentUser().subscribe( u => this.currentUser = u);
    route.data.subscribe( (data: {inDashboard:boolean}) => this.inDashboard = data.inDashboard);
  }

  ngOnInit() {
    this.refreshUsers();
  }

  private refreshUsers(){
    this.users.get().subscribe( es => this.userList = es );
  }

  public youAreTheUser(user: User) : boolean{
    return user.id == this.currentUser.id;
  }

  public crud(mode: string, user: User = undefined ){
    if(mode=='delete'){
      this.delete(Object.assign({},user));
      return;
    }
    let dialogRef = this.matDialog.open(DialogUserDetailsComponent,{
      disableClose: true,
      width: '750px',
      data: {
        mode: mode,
        user: Object.assign({},user)
      }
    });
    dialogRef.afterClosed().subscribe( (result: { cancelled: boolean }) => {
      if(!result.cancelled){
        this.refreshUsers();
      }
    });
  }

  private delete(user: User){
    let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        message: `Eliminar el usuario ${user.firstName} ${user.lastName}?`
      }
    });
    dialogRef.afterClosed().subscribe( confirm => {
      if(confirm){
        this.users.delete(user).subscribe( () => this.refreshUsers());
      }
    });
  }

}
