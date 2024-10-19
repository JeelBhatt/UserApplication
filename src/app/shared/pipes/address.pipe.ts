import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';

    const { address, city, state, postalCode, country} = value;

    return [address, city, state, postalCode, country].filter(Boolean).join(', ');
  }
}
