import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'gen-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  public message: string;
  public title: string;
  public type: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { 
    Object.assign(this,data);
  }

  ngOnInit() {
  }

  public get iconClass(): string{
    switch(this.type){
      case 'success':
        return 'fa-check';
      case 'error':
        return 'fa-times';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'info':
        return 'fa-info';
      default:
        return 'fa-info';
    }
  }

  public get toastTypeClass(): string{
    switch(this.type){
      case 'success':
        return 'toast--success';
      case 'error':
        return 'toast--error';
      case 'warning':
        return 'toast--warning';
      case 'info':
        return 'toast--info';
      default:
        return 'toast';
    }
  }

}
