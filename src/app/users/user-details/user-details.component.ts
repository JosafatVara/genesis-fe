import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from '../../shared/models/user';
import { CrudComponent } from '../../shared/components/base/crud-component';
import { Role } from '../../shared/models/role';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';
import { RolesService } from '../../core/services/roles.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Alphanumeric } from '../../shared/validators/alphanumeric';
import { ImagesService } from '../../core/utils/images.service';

@Component({
  selector: 'gen-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent extends CrudComponent<User> implements OnInit {

  userForm: FormGroup;

  @Input('user') user: User;
  public roleList: Array<Role>;
  private users: UsersService;
  private router: Router;
  public userPhoto: any;

  constructor(users: UsersService, router: Router, private roles: RolesService, private fb: FormBuilder
    , private images: ImagesService){ 
    super(users);
    this.managedEntity = new User();
    this.roleList = [new Role({name: '---'})];
    this.users = users;
  } 

  ngOnInit() {
    this.createForm();
    this.validateMode();
    this.disableFormControls();
    this.managedEntity = this.user || this.managedEntity;
    if(this.managedEntity.photo){
      this.userPhoto = this.managedEntity.photo;
    }
    if(this.managedEntity.photoPublicUrl){
      this.images.getBlobFromImageUrl(this.managedEntity.photoPublicUrl).subscribe( blob =>{
        this.userPhoto = blob
      });    
    }    
    this.fillFormModel();
    this.userPhoto = this.managedEntity.photo;
    this.roles.get().subscribe( results => {
      this.roleList = results;
      this.fillSelects();
    });
  }

  //#region FormManagement
  createForm(){
    this.userForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', this.mode=="create"?[Validators.required, Validators.minLength(6),Alphanumeric]:[]],
      confirmPassword: ['', this.mode=="create"?[this.confirmPasswordValidation]:[]],
      role: [undefined, Validators.required]
    });
    this.userForm.get('password').valueChanges.subscribe( val => {
      this.userForm.get('confirmPassword').updateValueAndValidity();
    });
  }

  disableFormControls(){
    if(this.mode != 'create'){
      this.userForm.get('email').disable();
    }
  }

  confirmPasswordValidation(input: AbstractControl){
    if(input.root.get('password') && input.root.get('password').value != input.value){
      return {missmatched: true};
    }
    return null;
  }

  private fillFormModel(){
    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email
    });
  }
  //#endregion  

  protected fillDataModels(){
    this.managedEntity = new User({ 
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      id: this.user.id,
      role: this.userForm.value.role,
      photo: this.userPhoto,
      lastConnection: this.user.lastConnection,
      password: this.mode == "create"? this.userForm.get('password').value: this.user.password
    });
  }

  private fillSelects(): void{
    if(this.mode=='create'){
      this.userForm.get('role').setValue(this.roleList[0]);
    }else{
      this.userForm.get('role').setValue(
        this.managedEntity.role? this.roleList.find( r => r.id == this.managedEntity.role.id):undefined );
    }
  }

  public get title(): string{
    return '';
  }

  public get buttonLabel(): string{
    let lbl = "";
    switch (this.mode){
      case 'create': lbl = 'Crear Usuario'; break;
      case 'update': lbl = 'Actualizar Usuario'; break;
      case 'read': lbl = 'OK'; break;
      default: lbl = '---'; break;
    }
    return lbl;
  }

  protected validate(): boolean{
    this.managedEntity.photo = this.userPhoto;
    this.managedEntity.photoFileName = this.userPhoto.name;
    return this.managedEntity.photo != undefined && this.managedEntity.photo != "";
  }

}
