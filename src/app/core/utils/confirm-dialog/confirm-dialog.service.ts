import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ConfirmDialogService{
    
    constructor(private matDialog: MatDialog){
        
    }

    confirm(message: string): Observable<boolean>{
        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            data: {
                message: message
            }
        });
        return dialogRef.afterClosed().map( confirm => confirm? true: false);
    }

}