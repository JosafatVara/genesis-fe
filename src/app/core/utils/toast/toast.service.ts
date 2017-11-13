import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ToastComponent } from './toast.component';

@Injectable()
export class ToastService {

  private globalDuration: number = 3000;

  constructor(public snackBar: MatSnackBar) { }

  public success(message: string, title?: string){
    this.snackBar.openFromComponent(ToastComponent,{
      duration: this.globalDuration,
      verticalPosition: "top",
      data: {
        message: message,
        title: title,
        type: 'success',
        showProgress: true,
        progressDuration: this.globalDuration
      }
    });
  }

  public error(message: string, title?: string){
    this.snackBar.openFromComponent(ToastComponent,{
        duration: this.globalDuration,
        verticalPosition: "top",
        data: {
          message: message,
          title: title,
          type: 'error',
          showProgress: true,
          progressDuration: this.globalDuration
        }
      });
  }

  public warning(message: string, title?: string){
    this.snackBar.openFromComponent(ToastComponent,{
        duration: this.globalDuration,
        verticalPosition: "top",
        data: {
          message: message,
          title: title,
          type: 'warning',
          showProgress: true,
          progressDuration: this.globalDuration
        }
      });
  }

  public info(message: string, title?: string){
    this.snackBar.openFromComponent(ToastComponent,{
        duration: this.globalDuration,
        verticalPosition: "top",
        data: {
          message: message,
          title: title,
          type: 'info',
          showProgress: true,
          progressDuration: this.globalDuration
        }
      });
  }

}
