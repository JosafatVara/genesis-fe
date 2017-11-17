import { Component, OnInit, AfterViewInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'gen-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, AfterViewInit {

  @ViewChild('progress') progress: ElementRef;

  public message: string;
  public title: string;
  public type: string;
  public showProgress: boolean;
  public progressDuration: number;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { 
    Object.assign(this,data);
  }

  ngOnInit() {
  }

  
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.progress.nativeElement.className += " toast__progress--empty";
    },0);    
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

  public get transitioStyle(): string{
    return `all ${(this.progressDuration/1000).toString()}s linear`
  }

}
