import { Component, OnInit } from '@angular/core';
import { Routing } from "../shared/animations/routing";

@Component({
  selector: 'gen-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [Routing.animation]
})
export class AuthenticationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'] || 'loginPage'; 
  }

}
