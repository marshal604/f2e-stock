import { Pipe, PipeTransform } from '@angular/core';

export enum Unit {
  K = 1_000,
  M = 1_000_000
}
@Pipe({
  name: 'stockUnit'
})
export class StockUnitPipe implements PipeTransform {
  transform(value: string | number, unit = 'auto'): string {
    if (isNaN(Number(value))) {
      return String(value);
    }
    const prefix = Number(value) < 0 ? '-' : '';
    switch (unit) {
      case 'K':
        return `${prefix}${(Number(value) / Unit.K).toFixed()}`;
      case 'M':
        return `${prefix}${(Number(value) / Unit.M).toFixed()}K`;
      default:
        return this.autoCalc(value);
    }
  }

  autoCalc(value: string | number): string {
    const prefix = Number(value) < 0 ? '-' : '';
    value = Math.abs(Number(value));
    if (value >= 10 * Unit.M) {
      return `${prefix}${(Number(value) / Unit.M).toFixed()}K`;
    } else {
      return `${prefix}${(Number(value) / Unit.K).toFixed()}`;
    }
  }
}
