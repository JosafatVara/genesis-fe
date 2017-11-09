import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
// import {} from "module";

@Component({
    moduleId: module.id,
    selector: 'modal-crud',
    templateUrl: 'modal-crud.component.html',
    styleUrls: ['modal-crud.component.scss']
})
export class ModalCrudComponent {
    constructor(public thisDialogRef: MatDialogRef<ModalCrudComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {

    }

    onCloseConfirm() {
        this.thisDialogRef.close('confirm');
    }

    onCloseCancel() {
        this.thisDialogRef.close("Cancel")
    }
}
