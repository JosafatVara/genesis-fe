import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import { ToastComponent } from './toast.component';

@Injectable()
export class ToastService {

  constructor(private toastr: ToastrService, public snackBar: MatSnackBar) { }

  public success(message: string, title?: string){
    this.snackBar.openFromComponent(ToastComponent,{
      duration: 2000,
      verticalPosition: "top",
      data: {
        message: message,
        title: title,
        type: 'success'
      }
    });
  }

  public error(message: string, title?: string){
    this.snackBar.openFromComponent(ToastComponent,{
        duration: 2000,
        verticalPosition: "top",
        data: {
          message: message,
          title: title,
          type: 'error'
        }
      });
  }

  public warning(message: string, title?: string){
    this.snackBar.openFromComponent(ToastComponent,{
        duration: 2000,
        verticalPosition: "top",
        data: {
          message: message,
          title: title,
          type: 'warning'
        }
      });
  }

  public info(message: string, title?: string){
    this.snackBar.openFromComponent(ToastComponent,{
        duration: 2000,
        verticalPosition: "top",
        data: {
          message: message,
          title: title,
          type: 'info'
        }
      });
  }

}
