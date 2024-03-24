import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCop'
})
export class CurrencyCopPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) {
      return '0 COP'; 
    }
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' COP';
  }
}
