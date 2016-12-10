import { config } from '../../config/config';

declare var mapboxgl: any;
export class VectorTiles {

    constructor() {}
    draw() {
        mapboxgl.accessToken = config.mapboxAccessToken;
        let ll = new mapboxgl.LngLat(8.5500000, 47.3666700);

        let map = new mapboxgl.Map({
            container: 'map',
            center: ll,
            zoom: 13,
            style: '/assets/post/vector-tiles/osm_tiles.json'
        });
    }
}