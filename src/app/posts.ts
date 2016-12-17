import { Component } from '@angular/core';
import { BikeCommuteComponent } from './maps/bike-commute/bike-commute.component';
import { VectorTilesComponent } from './maps/vector-tiles/vector-tiles.component';
import { UsDroughtComponent } from './maps/us-drought/us-drought.component';
export class Post {
    key: string;
    title: string;
    tldr: string;
    date: string;
    category: string;
    tags: string[];
    cover: string;
    url: string;
    map: Component;
    constructor(options: {
        key?: string,
        title?: string,
        tldr?: string,
        date?: string,
        category?: string,
        tags?: string[],
        cover?: string,
        url?: string,
        map?: Component,
    } = {}) {
        this.key = options.key || '';
        this.title = options.title || '';
        this.tldr = options.tldr || '';
        this.date = options.date || '';
        this.category = options.category || '';
        this.tags = options.tags || [];
        this.cover = options.cover || '';
        this.url = options.url || '';
        this.map = options.map || null;
    }
}


const Tags: {
    Mapbox: string,
    Leaflet: string,
    D3: string,
    TopoJSON: string,
    ArcPy: string,
    ArcGIS: string,
    VectorTiles: string,
    Express: string
} = {
    Mapbox: "Mapbox",
    Leaflet: "Leaflet",
    D3: "D3",
    TopoJSON: "TopoJSON",
    ArcPy: "ArcPy",
    ArcGIS: "ArcGIS",
    VectorTiles: "Vector Tiles",
    Express: "Express.js"

}

const url: string = 'assets/post';

export const Posts = {
    UsDrought: new Post({
        key: 'us-drought',
        title: 'History of Drought in the US',
        tldr: 'Mapped droughts across the US since 1895, adding a very useful slider is in the backlog grave',
        category: 'maps',
        date: '2016-12-11',
        cover: `${url}/us-drought/cover.png`,
        url: `${url}/us-drought/post.md`,
        map: UsDroughtComponent,
        tags: [Tags.D3, Tags.TopoJSON]
    }),
    DynamicTables: new Post({
        key: 'dynamic-tables',
        title: 'Dynamic Tables',
        tldr: 'ArcPy can be used to manipulate map document layouts such as by creating unique tables',
        category: 'esri',
        date: '2015-12-24',
        cover: `${url}/dynamic-tables/cover.jpg`,
        url: `${url}/dynamic-tables/post.md`,
        tags: [Tags.ArcGIS, Tags.ArcPy]
    }),
    VectorTiles: new Post({
        key: 'vector-tiles',
        title: 'Serving Vector Tiles',
        tldr: 'Put vector tiles on a server and display them on a map',
        category: 'maps',
        date: '2016-01-14',
        cover: `${url}/vector-tiles/cover.jpg`,
        url: `${url}/vector-tiles/post.md`,
        map: VectorTilesComponent,
        tags: [Tags.Mapbox, Tags.Express, Tags.VectorTiles]
    }),
    Commute: new Post({
        key: 'bike-commute',
        title: 'Mapping a Bike Commute',
        tldr: 'Richmond has hills and my maps are mediocre',
        category: 'maps',
        date: '2015-12-26',
        cover: `${url}/commute/cover.jpg`,
        url: `${url}/commute/post.md`,
        map: BikeCommuteComponent,
        tags: [Tags.Leaflet, Tags.D3]

    })
}
