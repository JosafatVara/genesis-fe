import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { BaseComponent } from '../../shared/components/base/base-component';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'gen-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent extends BaseComponent implements OnInit {

  @ViewChild('form') form: FormControl;

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
    if(!this.form.valid){
      return;
    }
    this.loadingOn();
    this.auth.recoverPassword(this.email).subscribe( send => {
      this.sendEmail = send;
    },()=>{},()=>{this.loadingOff()});
  }

}
