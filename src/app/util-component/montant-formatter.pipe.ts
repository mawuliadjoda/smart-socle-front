import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'montantFormatter'
})
export class MontantFormatterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const montantEuro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    return montantEuro.replace('€', environment.devisePays);
  }

}
