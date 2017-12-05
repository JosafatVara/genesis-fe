import { Injectable } from '@angular/core';

@Injectable()
export class DatetimeHelperService {

  constructor() { }

  public to24HTime(time:string){
    let toReturn = time;
    if(time.includes('m')||time.includes('a')||time.includes('p'),time.includes('A'),time.includes('P')){
      let hoursToAdd : number = (time.includes('p') || time.includes('P'))? 12 : 0;
      let strangeCharPosition : number;
      for(strangeCharPosition=0;strangeCharPosition<time.length;strangeCharPosition++){
        if( !this.isNumericChar(time[strangeCharPosition]) && time[strangeCharPosition] != ':' ) break;
      }
      //let normalized : string = time.substring(0,strangeCharPosition);

    }
  }  

  private isNumericChar(c) { return /\d/.test(c); }

  public toLocalTime(date:Date):string{
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let hoursStr = hours < 10 ? '0' + hours.toString() : hours.toString();
    let minutesStr = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    return hoursStr + ':' + minutesStr;
  }

  public toLocalDate(date:Date):string{
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let yearStr = year.toString();
    let monthStr = month<10? '0'+month.toString() : month.toString();
    let dayStr = day<10? '0'+day.toString() : day.toString();
    return `${yearStr}-${monthStr}-${dayStr}`;
  }

  public dateDiff(init: Date, end:Date): number{
    let oneDay = 24*60*60*1000;
    return Math.round(Math.abs((init.getTime() - end.getTime())/(oneDay)));
  }
}
