import { Injectable } from '@angular/core';
import { BikeCommute } from './maps/bike-commute';
import { VectorTiles } from './maps/vector-tiles';

@Injectable()
export class MapService {

  constructor(
    private vectorTiles: VectorTiles,
    private commute: BikeCommute
  ) { }

  draw(type: string): void {
    switch (type) {
      case 'bike-commute':
        this.commute.drawMap();
        this.commute.drawGraphic();
      case 'vector-tiles':
        this.vectorTiles.draw();
    }
  }
}
