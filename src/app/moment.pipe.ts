import { Pipe, PipeTransform } from '@angular/core';
import  * as Moment  from 'moment';

@Pipe({
  name: 'momentPipe'
})
export class MomentPipe implements PipeTransform {

  transform(value: any): any {
    return Moment().diff(Moment(value), 'days') > 5 ? Moment(value).format('MMM D YYYY') : Moment(value).fromNow()
  }

}
