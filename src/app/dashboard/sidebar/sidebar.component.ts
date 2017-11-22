import { Component } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
import { UsersService } from '../../core/services/users.service';
import { Observable } from 'rxjs/Observable';


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
    menuState: boolean = false;
    menuLayout: string;
    menuLayoutAlign:string;
    myRole: string;    

    constructor(private users: UsersService) {
        this.flagArray = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
        }
        this.menuLayout = "row";
        this.menuLayoutAlign="space-between center";
        Observable.zip( users.getCurrentUser(), users.get() ).subscribe( rs => {
            this.myRole = rs[1].find( u => u.id == rs[0].id).role.name;
        });
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
            case 6:
                this.flagArray[6] = !this.flagArray[6]
                break;
            default:
                break;
        }
    }

    changeStateMenu() {
        this.menuState = !this.menuState;
        this.menuLayout = this.menuState ? "column" : "row";
        this.menuLayoutAlign = this.menuState ? "center center" : "space-between center";
        
        // this.menuLayout = "space-between center";
    }

    hideFor(rolesNames: string[]): boolean{
        if(!this.myRole) return true;
        for(let i = 0; i < rolesNames.length; i++){
            if(this.myRole.toLocaleLowerCase() == rolesNames[i].toLocaleLowerCase()){
                return true;
            }
        }
    }
}
