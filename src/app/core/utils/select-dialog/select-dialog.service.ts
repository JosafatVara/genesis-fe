import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { SelectDialogOption } from './select-dialog';
import { SelectDialogComponent } from './select-dialog.component';

@Injectable()
export class SelectDialogService {

  constructor(private matDialog: MatDialog) { }
  
  open<T>(title:string, options: SelectDialogOption[], matDialogConfig?: MatDialogConfig): Observable<T>{
    options = options || [];
    matDialogConfig = matDialogConfig || { height: 'auto', width: '500px' };
    matDialogConfig.data = matDialogConfig.data || {};
    Object.assign(matDialogConfig.data, { title: title, options: options });
    let dialogRef = this.matDialog.open(SelectDialogComponent,matDialogConfig);
    return dialogRef.afterClosed().map( r => r as T );
  }

}
