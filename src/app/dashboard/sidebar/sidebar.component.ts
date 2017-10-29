import { Component } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';
  

@Component({
    moduleId: module.id,
    selector: 'cmp-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss'],
    animations: [
        trigger('menuState', [         
          transition('false <=> true', animate('10s')),
        ])
      ]
})
export class SidebarComponent {
    flagArray: any;

    constructor() {
        this.flagArray = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
        }
    }

    breakdownSubmenu(value: number) {
        switch (value) {
            case 1:
                this.flagArray[1] = !this.flagArray[1]
                break;
            case 2:
                this.flagArray[2] = !this.flagArray[2]
                break;
            case 3:
                this.flagArray[3] = !this.flagArray[3]
                break;
            case 4:
                this.flagArray[4] = !this.flagArray[4]
                break;
            case 5:
                this.flagArray[5] = !this.flagArray[5]
                break;
            default:
                break;
        }
    }
}
