import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'gen-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.scss']
})
export class PhotoInputComponent implements OnInit, OnChanges {  

  @Input('asBase64') asBase64: boolean = true;

  @Input('required') required: boolean;

  @Output('onChange') onChange: EventEmitter<any>;
  
  @Input('photoSrc') 
  get photoSource(): any{
    return this.photoSourceValue;
  }

  @Output('photoSrcChange') photoSrcChange = new EventEmitter<string>();
  set photoSource(value: any){
    this.photoSourceValue = value;
    this.photoSrcChange.emit(value);
  }

  public get showInvalid(): boolean{
    return this.required && ( this.photoSource == undefined || this.photoSource == "" );
  }

  private photoSourceValueAsBase64: string;
  private photoSourceValue: string;
  private reader = new FileReader();
  private photo: any;

  constructor() { 
    this.onChange = new EventEmitter<any>();
  }

  ngOnInit() {
    this.reader.addEventListener('load', ()=>{
      this.photoSourceValueAsBase64 = this.reader.result;
      if(this.asBase64){
        this.photoSource = this.reader.result;
        this.onChange.emit(this.reader.result);
      }
      else{
        this.photoSource = this.photo;
        this.onChange.emit(this.photo);
      }        
    });
    if(this.asBase64){
      this.photoSourceValueAsBase64 = this.photoSource;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.asBase64 && changes['photoSource'].currentValue && !this.photoSourceValueAsBase64){     
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
    this.photo = event.srcElement.files[0];
    if(this.photo){
      this.reader.readAsDataURL(this.photo);
    }
  }

}
