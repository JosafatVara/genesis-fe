import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'gen-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.scss']
})
export class PhotoInputComponent implements OnInit, OnChanges {  

  //SE PRIORIZA CUALQUIER LECTURA DE IMAGEN DESDE PHOTOURL
  @Input('photoPublicUrl') photoPublicUrl: string;

  @Input('asBase64') asBase64: boolean = true;

  @Input('required') required: boolean;

  @Output('onChange') onChange: EventEmitter<any>;
  
  @Input('photoSrc') 
  get photoSource(): any{
    return this.photoSourceValue;
  }

  @Output('photoSrcChange') photoSrcChange = new EventEmitter<any>();
  set photoSource(value: any){
    this.photoSourceValue = value;
    this.photoSrcChange.emit(value);
  }

  public get showInvalid(): boolean{
    if(this.required && this.existsPhotoPublicUrl) return false;
    return this.required && !this.photoSourceValueAsBase64;
  }

  private photoSourceValueAsBase64: string;
  private photoSourceValue: any;
  private photoFileNameValue: string;
  private reader = new FileReader();
  private photo: any;

  constructor(private _sanitizer: DomSanitizer) { 
    this.onChange = new EventEmitter<any>();
  }

  ngOnInit() {
    this.reader.addEventListener('load', ()=>{
      this.photoPublicUrl = undefined;
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
    if(this.existsPhotoPublicUrl){
      return;
    }
    if(this.asBase64){
      this.photoSourceValueAsBase64 = this.photoSource;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.existsPhotoPublicUrl){
      return;
    }
    if(!this.asBase64 && changes['photoSource'].currentValue && !this.photoSourceValueAsBase64){     
      this.photo = this.photoSource;
      this.reader.readAsDataURL(this.photoSource);
    }
  }

  public get photoLoaded(): boolean{
    if(this.existsPhotoPublicUrl){
      return true;
    }
    return this.photoSourceValueAsBase64 && this.photoSourceValueAsBase64 != "";
  }

  public get urlPhotoSource(){
    if(this.existsPhotoPublicUrl){
      return `url(${this.photoPublicUrl})`;
    }
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.photoSourceValueAsBase64})`);
  }

  public photoChange(event: any){
    this.photo = event.target.files[0];
    if(this.photo){
      this.reader.readAsDataURL(this.photo);
    }
  }

  private get existsPhotoPublicUrl(): boolean{
    return this.photoPublicUrl && this.photoPublicUrl != "";    
  }  
}
