import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonPipe'
})
export class JsonPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? JSON.parse(value).ALL : value;
  }

}
