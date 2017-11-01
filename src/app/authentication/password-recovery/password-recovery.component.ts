import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { BaseComponent } from '../../shared/components/base/base-component';

@Component({
  selector: 'gen-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent extends BaseComponent implements OnInit {

  public sendEmail?: boolean = null;
  public email: string;
  private auth: AuthenticationService;

  constructor(auth: AuthenticationService) {
    super();
    this.auth = auth;
  }

  ngOnInit() {
  }

  public recover(){
    this.loadingOn();
    this.auth.recoverPassword(this.email).subscribe( send => {
      this.sendEmail = send;
    },()=>{},()=>{this.loadingOff()});
  }

}
