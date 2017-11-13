import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'cmp-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {

    constructor(){
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
