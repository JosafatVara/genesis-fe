import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gen-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.scss']
})
export class PhotoInputComponent implements OnInit {

  @Input('asBase64') asBase64: boolean = true;

  @Input('required') required: boolean;
  public get showInvalid(): boolean{
    return this.required && ( this.photoSource == undefined || this.photoSource == "" );
  }

  @Input('photoSrc') 
  get photoSource(): any{
    return this.photoSourceValue;
  }

  @Output('photoSrcChange') photoSrcChange = new EventEmitter<string>();
  set photoSource(value: any){
    this.photoSourceValue = value;
    this.photoSrcChange.emit(value);
  }

  private photoSourceValueAsBase64: string;
  private photoSourceValue: string;
  private reader = new FileReader();

  constructor() { }

  ngOnInit() {
    this.reader.addEventListener('load', ()=>{
      this.photoSourceValueAsBase64 = this.reader.result;
      if(this.asBase64){
        this.photoSource = this.reader.result;
      }
    });
    if(this.asBase64){
      this.photoSourceValueAsBase64 = this.photoSource;
    }else if(this.photoSource){      
      this.reader.readAsDataURL(this.photoSource);
    }
  }

  public get photoLoaded(): boolean{
    return this.photoSourceValueAsBase64 && this.photoSourceValueAsBase64 != "";
  }

  public get urlPhotoSource(): string{
    return `url(${this.photoSourceValueAsBase64})`;
  }

  public photoChange(event: any){
    let photo = event.srcElement.files[0];
    if(photo){
      this.reader.readAsDataURL(photo);
    }
    if(!this.asBase64){
      this.photoSource = (photo);
    }        
  }

}
