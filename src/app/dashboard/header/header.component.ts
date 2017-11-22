import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../shared/models/user';

@Component({
    moduleId: module.id,
    selector: 'cmp-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {

    currentUser: User;

    constructor(private users: UsersService)
    {
        users.getCurrentUser().subscribe( u => this.currentUser = u);
        document.body.addEventListener('click', (ev) => {
            this.accountOptionsAreOpen = this.accountOptionsAreOpen ? false: false;
        });
    }

    public accountOptionsAreOpen: boolean = false;

    public toogleOptions(event){
        event.stopPropagation();
        this.accountOptionsAreOpen = !this.accountOptionsAreOpen;
    }

    public openOptions(){
        this.accountOptionsAreOpen = true;
    }

    public closeOptions(){
        this.accountOptionsAreOpen = false;
    }

}
