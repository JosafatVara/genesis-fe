import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'gen-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  public email: string;
  private auth: AuthenticationService;

  constructor(auth: AuthenticationService) { 
    this.auth = auth;
  }

  ngOnInit() {
  }

}
