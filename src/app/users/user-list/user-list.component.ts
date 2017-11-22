import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogUserDetailsComponent } from '../dialog-user-details/dialog-user-details.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { Enterprise } from '../../shared/models/enterprise';
import { EnterprisesService } from '../../core/services/enterprises.service';
import { UsersInEnterpriseSpecification, UsersSearchPagedSpecification } from '../../core/services/specifications/user-specification';
import { Observable } from 'rxjs/Observable';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'gen-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public inDashboard: boolean;
  public userList: Observable<User[]>;
  public currentUser: User;
  public currentEnteprirse: Enterprise;
  public config: PaginationInstance;
  public searchFC: FormControl;

  constructor(private users: UsersService, route: ActivatedRoute ,private matDialog: MatDialog
    , private enteprises: EnterprisesService) {
    users.getCurrentUser().subscribe( u => this.currentUser = u);
    enteprises.getCurrentEnterprise().subscribe( e => this.currentEnteprirse = e);
    route.data.subscribe( (data: {inDashboard:boolean}) => {
      this.inDashboard = data.inDashboard
    });
    this.config = {
      id: 'pagination',
      itemsPerPage: 1,
      currentPage: 1
    };
  }

  ngOnInit() {
    this.searchFC = new FormControl();
    this.searchFC.valueChanges.debounceTime(500).subscribe( () => this.loadUsers() );
    this.loadUsers();
  }

  loadUsers(page?: number){
    page = page || this.config.currentPage;
    this.config.currentPage = page;
    let specification = new UsersSearchPagedSpecification(this.searchFC.value || '',page,this.config.itemsPerPage);
    this.userList = this.users.get(specification)
                      .do( ()=>{ this.config.totalItems = specification.size })
                      .catch( err => Observable.of([]) );
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
      if(result&&!result.cancelled){
        //this.refreshUsers();
        this.loadUsers();
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
        //this.users.delete(user).subscribe( () => this.refreshUsers());
        this.loadUsers();
      }
    });
  }

}
