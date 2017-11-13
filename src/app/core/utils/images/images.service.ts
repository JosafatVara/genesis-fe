import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class ImagesService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  public getBlobFromImageUrl(imageUrl: string): Observable<Blob>{
    let options =  { responseType: 'blob' as 'json' };
    return this.http.get<any>(imageUrl,options);
  }

}
