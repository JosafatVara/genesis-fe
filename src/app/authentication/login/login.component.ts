import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base/base-component';
import { FormControl } from "@angular/forms";
import { ToastService } from '../../core/utils/toast/toast.service';
import { EnterprisesService } from "../../core/services/enterprises.service";
import { UsersService } from "../../core/services/users.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'gen-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  public user: string;
  public password: string;
  public failedLogin: boolean;
  public auth: AuthenticationService;
  private route: ActivatedRoute;
  private router: Router;

  constructor(auth: AuthenticationService, route: ActivatedRoute, router: Router, private toast: ToastService,
    private users: UsersService, private enterprises: EnterprisesService) { 
    super();
    this.auth = auth;
    this.route = route;
    this.router = router;
  }

  ngOnInit() {
  }

  public login(form: FormControl){
    if(!form.valid){
      return;
    }
    this.loadingOn();
    this.auth.login(this.user, this.password).subscribe( logged => {
      if(logged){
        this.route.queryParams.subscribe( params => {
          if(params['returnUrl']){
            this.router.navigate(['/auth/seleccionarEmpresa'], { queryParams: { returnUrl: params['returnUrl'] }});
            return;
          }else{
            this.router.navigateByUrl('/auth/seleccionarEmpresa');
            return;
          }          
        });
      }else{
        this.failedLogin = true;
        this.toast.error('Credenciales incorrectas','Login');
      }           
    },()=>{},()=>{ this.loadingOff() });
  }

}
