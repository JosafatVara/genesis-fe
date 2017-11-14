import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMonth'
})
export class ToMonthPipe implements PipeTransform {

  months: string[] = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'
  ];

  transform(value: any, args?: any): any {
    if(value){
      return this.months[value-1];
    }
    return '';
  }

}
