import { Component, OnInit } from '@angular/core';
import { config } from '../../../config/config';
declare var mapboxgl: any;
@Component({
  selector: 'app-vector-tiles',
  templateUrl: './vector-tiles.component.html',
  styleUrls: ['./vector-tiles.component.scss']
})
export class VectorTilesComponent implements OnInit {

  private style = {
    "version": 8,
    "sources": {
      "world": {
        "type": "vector",
        "tiles": [
          "http://tiles.bgeo.io/zurich/{z}/{x}/{y}.vector.pbf"
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
  constructor() { }

  ngOnInit() {
    mapboxgl.accessToken = config.mapboxAccessToken;
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
