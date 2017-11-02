import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'cmp-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {

    public accountOptionsAreOpen: boolean = false;

    public toogleOptions(){
        this.accountOptionsAreOpen = !this.accountOptionsAreOpen;
    }

}
