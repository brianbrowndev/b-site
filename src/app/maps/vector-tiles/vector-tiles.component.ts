import { Component, OnInit, Injector } from '@angular/core';
import { APP_SETTINGS, IAppSettings } from '../../app.settings';
declare var mapboxgl: any;

@Component({
  selector: 'app-vector-tiles',
  templateUrl: './vector-tiles.component.html',
  styleUrls: ['./vector-tiles.component.scss']
})
export class VectorTilesComponent implements OnInit {

  style: {};  
  settings: IAppSettings
  constructor(
    public injector: Injector

    ) {
    this.settings = injector.get(APP_SETTINGS)
   }

  ngOnInit() {
    this.style = {
      "version": 8,
      "sources": {
        "world": {
          "type": "vector",
          "tiles": [
            `${this.settings.tilesEndpoint}/zurich/{z}/{x}/{y}.vector.pbf`
          ],
          "minzoom": 0,
          "maxzoom": 20
        }
      },
      "layers": [{
        "id": "world",
        "type": "background",
        "paint": {
          "background-color": "#fff"
        }
      },
      {
        "id": "road",
        "type": "line",
        "source": "world",
        "source-layer": "road",
        "paint": {
          "line-color": "#000000"
        }
      },
      {
        "id": "water",
        "type": "fill",
        "source": "world",
        "source-layer": "water",
        "paint": {
          "fill-color": "#72C6EF"
        }
      },
      {
        "id": "building",
        "type": "fill",
        "source": "world",
        "source-layer": "building",
        "paint": {
          "fill-color": "#ededed"
        }
      }
      ]
    }

    mapboxgl.accessToken = this.settings.mapboxAccessToken;
    let ll = new mapboxgl.LngLat(8.5500000, 47.3666700);

    let map = new mapboxgl.Map({
      container: 'map',
      center: ll,
      zoom: 13,
      style: this.style
    });
    let nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

  }

}
