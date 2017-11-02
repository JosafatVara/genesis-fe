import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
// import {} from "module";

@Component({
    moduleId: module.id,
    selector: 'modal-add',
    templateUrl: 'modal-add.component.html',
    styleUrls: ['modal-add.component.scss']
})
export class ModalAddComponent {

    constructor(public thisDialogRef: MatDialogRef<ModalAddComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {

    }

    onCloseConfirm() {
        this.thisDialogRef.close('confirm');
    }

    onCloseCancel() {
        this.thisDialogRef.close("Cancel")
    }
}


