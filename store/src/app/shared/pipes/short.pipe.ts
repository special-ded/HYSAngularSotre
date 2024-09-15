import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortPipe',
})
export class ShortPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 14) {
      return value.slice(0, 14);
    }

    return value;
  }
}
