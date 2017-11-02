import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../shared/components/base/base-component';
import { User } from '../../shared/models/user';
import { UsersService } from '../../core/services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gen-dialog-user-details',
  templateUrl: './dialog-user-details.component.html',
  styleUrls: ['./dialog-user-details.component.scss']
})
export class DialogUserDetailsComponent extends BaseComponent implements OnInit {

  public mode: string
  public user: User;

  constructor(private users: UsersService, private dialogRef: MatDialogRef<DialogUserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, user: User}) {
    super();
    this.mode = data.mode || 'read';
    this.user = data.mode == 'create'? new User() : data.user;
  }

  ngOnInit() {
  }

  onCrudComponentFinish(user: User){
    this.loadingOn();
    let observable: Observable<User>;
    switch(this.mode){
      case 'create':
        observable = this.users.create(user);
        break;
      case 'update':
        observable = this.users.update(user);
        break;
      default:
        observable = Observable.of(undefined);
    }
    observable.subscribe( e => {
      if(e!=undefined){
        this.dialogRef.close({cancelled:false});
      }else{

      }
    },err=>{this.loadingOff();},()=>{this.loadingOff()});
  }

}
