import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(value: any): {name: string, value: string}[] {
    return Object.keys(value).map(o => { return { name: o, value: value[o] } });
  }

}
