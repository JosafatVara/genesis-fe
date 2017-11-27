import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { SimpleCrudComponent } from "./simple-crud.component";

@Injectable()
export class SimpleCrudService {

  constructor(private matDialog: MatDialog) { }

  open<T>(title: string, 
    formControlList: {type:string, label: string, name: string, control: FormControl}[], config?: MatDialogConfig): Observable<T>{
    config = config || {
      height: 'auto',
      width: 'auto',
      disableClose: true
    };
    config.data = config.data || {};
    Object.assign(config.data,{formControlList: formControlList, title: title});
    let dialogRef = this.matDialog.open(SimpleCrudComponent,config);
    return dialogRef.afterClosed().map( r => r as T );
  }

}
