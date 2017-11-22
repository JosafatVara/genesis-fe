import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";
import { EnterprisesService } from "../../core/services/enterprises.service";
import { Enterprise } from "../../shared/models/enterprise";
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'gen-account-options',
  templateUrl: './account-options.component.html',
  styleUrls: ['./account-options.component.scss']
})
export class AccountOptionsComponent implements OnInit {

  public currentEnterprise: Enterprise;
  public currentUser: User;

  constructor(private users: UsersService, private auth: AuthenticationService, private router: Router, private enterprises: EnterprisesService) { 
    enterprises.getCurrentEnterprise().subscribe( e => this.currentEnterprise = e);
  }

  ngOnInit() {
  }

  public logout(){
    this.auth.logout().subscribe( logout => {
      if(logout){
        this.router.navigateByUrl('auth');
      }
    });
  }

}
