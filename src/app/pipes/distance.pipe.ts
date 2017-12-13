import { Pipe, PipeTransform } from '@angular/core';
/*
 * this is still pretty basic and could defenitely use some rework in terms of international scale and number notation
 * so far the functiuonalities are:
 * - checks if the value is over o km and if so, then converts m to km and adds the correct unit
*/
@Pipe({name: 'distance'})
export class distancePipe implements PipeTransform {
  transform(value: number, unit: string): string {
/*     console.log('value', value); */
    if( value > 0 && value < 1000 ){
        return value+unit;
    }else if( value > 1000){
        return (Math.round(value / 100)/10)+'km';
    }else if( value <= 0 ){
        return 0+unit;
    }
  }
}