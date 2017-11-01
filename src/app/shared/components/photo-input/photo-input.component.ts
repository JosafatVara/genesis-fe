import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gen-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.scss']
})
export class PhotoInputComponent implements OnInit {

  @Input('required') required: boolean;
  public get showInvalid(): boolean{
    return this.required && ( this.photoSource == undefined || this.photoSource == "" );
  }

  @Input('photoSrc') 
  get photoSource(): string{
    return this.photoSourceValue;
  }

  @Output('photoSrcChange') photoSrcChange = new EventEmitter<string>();
  set photoSource(value: string){
    this.photoSourceValue = value;
    this.photoSrcChange.emit(value);
  }


  private photoSourceValue: string;
  private reader = new FileReader();

  constructor() { }

  ngOnInit() {
    this.reader.addEventListener('load', ()=>{
      this.photoSource = this.reader.result;
    });
  }

  public get photoLoaded(): boolean{
    return this.photoSource && this.photoSource != "";
  }

  public get urlPhotoSource(): string{
    return `url(${this.photoSourceValue})`;
  }

  public photoChange(event: any){
    let photo = event.srcElement.files[0];
    if(photo){
      this.reader.readAsDataURL(photo);
    }    
  }

}
