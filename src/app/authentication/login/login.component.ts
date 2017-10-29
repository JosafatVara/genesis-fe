import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'gen-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: string;
  public password: string;
  public auth: AuthenticationService;
  private route: ActivatedRoute;
  private router: Router;

  constructor(auth: AuthenticationService, route: ActivatedRoute, router: Router) { 
    this.auth = auth;
    this.route = route;
    this.router = router;
  }

  ngOnInit() {
  }

  public login(){
    this.auth.login(this.user, this.password).subscribe( logged => {
      let toReturn = this.route.queryParams.subscribe( params => {
        if(params['returnUrl']){
          this.router.navigateByUrl(params['returnUrl']);
        }else{
          this.router.navigateByUrl('dashboard');
        }          
      })        
    });
  }

}
