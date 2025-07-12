import { Pipe, PipeTransform } from '@angular/core';

// define o nome do pipe que será usado no HTML
@Pipe({
  name: 'shorten',
})

// Retorna a string original cortada, com ... no final, se ultrapassar o limite
export class ShortenPipe implements PipeTransform {
  transform(value: string, args: number): string {
    if (value !== null) {
      return value.length > args ? value.substring(0, args) + '...' : value;
    }

    return '';
  }
}
