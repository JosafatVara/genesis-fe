import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'numeric',
})
export class NumericPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value!==undefined){
      let result = value.toString();
      result = result.replace(',','-').replace('.','-');
      let decPart : string = result.split('-')[1]; 
      let intPart : string = result.split('-')[0];
      intPart = intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
      return intPart + (decPart?'.' + decPart:'');
    }
    return '';
  }
}
