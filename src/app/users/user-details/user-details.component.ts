import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from '../../shared/models/user';
import { CrudComponent } from '../../shared/components/base/crud-component';
import { Role } from '../../shared/models/role';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';
import { RolesService } from '../../core/services/roles.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'gen-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent extends CrudComponent<User> implements OnInit {

  @ViewChild('form') form: FormGroup;

  @Input('user') user: User;
  private roleList: Array<Role>;
  private users: UsersService;
  private router: Router;
  private password: string;
  private confirmPassword: string;

  constructor(users: UsersService, router: Router, private roles: RolesService){ 
    super(users);
    this.managedEntity = new User();
    this.roleList = [new Role({name: '---'})];
    this.users = users;
  }

  ngOnInit() {
    this.validateMode();
    this.managedEntity = this.user || this.managedEntity;
    this.roles.get().subscribe( results => {
      this.roleList = results;
      this.fillSelects();
    });
  }

  private fillSelects(): void{
    if(this.mode=='create'){
      this.managedEntity.role = this.roleList[0];
    }else{
      this.managedEntity.role = this.roleList.find( r => r.id == this.managedEntity.role.id);
    }
  }

  protected get title(): string{
    return '';
  }

  protected get buttonLabel(): string{
    let lbl = "";
    switch (this.mode){
      case 'create': lbl = 'Crear Usuario'; break;
      case 'update': lbl = 'Actualizar Usuario'; break;
      case 'read': lbl = 'OK'; break;
      default: lbl = '---'; break;
    }
    return lbl;
  }

  public get equalPasswords():boolean{
    let equal = ((this.password!='' || this.password) && (this.confirmPassword != '' || this.confirmPassword)) && 
      this.password == this.confirmPassword;
    return equal;
  }

  protected validate(): boolean{
    return this.managedEntity.photo != undefined && this.managedEntity.photo != "" && this.equalPasswords;
  }

}
