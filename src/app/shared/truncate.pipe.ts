import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, charLimit = 50): any {
    if (!value) {
      return '';
    }

    const length = value.length;
    if (length <= charLimit) {
      return value;
    }

    return `${value.slice(0, charLimit - 3)}...`;
  }
}
