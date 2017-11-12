import { Component } from '@angular/core';
import { Routing } from "./shared/animations/routing";

@Component({
  selector: 'gen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Routing.animation]
})
export class AppComponent {
  title = 'gen';

  prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'] || 'loginPage'; 
  }
}
