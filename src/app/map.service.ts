import { Injectable } from '@angular/core';
import { BikeCommute } from './maps/bike-commute';

@Injectable()
export class MapService {

  constructor(
    private commute: BikeCommute
  ) { }

  draw(type: string): void {
    switch (type) {
      case 'bike-commute':
        this.commute.drawMap();
        this.commute.drawGraphic();
        break;
   }
  }
}
