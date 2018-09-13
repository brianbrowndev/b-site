import { Injectable } from '@angular/core';
import { Post } from '@app/core/models/post';
import { VectorTilesComponent } from '@app/maps/vector-tiles/vector-tiles.component';
import { UsDroughtComponent } from '@app/maps/us-drought/us-drought.component';

@Injectable()
export class PostsService {
  public tags: {
      Mapbox: string,
      D3: string,
      TopoJSON: string,
      ArcPy: string,
      ArcGIS: string,
      VectorTiles: string,
      Express: string
  } = {
      Mapbox: "Mapbox",
      D3: "D3",
      TopoJSON: "TopoJSON",
      ArcPy: "ArcPy",
      ArcGIS: "ArcGIS",
      VectorTiles: "Vector Tiles",
      Express: "Express.js"
  }
  public url: string = 'assets/post';
  public posts = {
    UsDrought: new Post({
            key: 'us-drought',
            title: 'History of Drought in the US',
            tldr: 'Mapped droughts across the US since 1895, adding a very useful slider is in the backlog grave',
            category: 'maps',
            date: '2016-12-11',
            cover: `${this.url}/us-drought/cover.png`,
            url: `${this.url}/us-drought/post.md`,
            map: UsDroughtComponent,
            tags: [this.tags.D3, this.tags.TopoJSON]
        }),
        DynamicTables: new Post({
            key: 'dynamic-tables',
            title: 'Dynamic Tables',
            tldr: 'ArcPy can be used to manipulate map document layouts such as by creating unique tables',
            category: 'esri',
            date: '2015-12-24',
            cover: `${this.url}/dynamic-tables/cover.jpg`,
            url: `${this.url}/dynamic-tables/post.md`,
            tags: [this.tags.ArcGIS, this.tags.ArcPy]
        }),
        VectorTiles: new Post({
            key: 'vector-tiles',
            title: 'Serving Vector Tiles',
            tldr: 'Put vector tiles on a server and display them on a map',
            category: 'maps',
            date: '2016-01-14',
            cover: `${this.url}/vector-tiles/cover.jpg`,
            url: `${this.url}/vector-tiles/post.md`,
            map: VectorTilesComponent,
            tags: [this.tags.Mapbox, this.tags.Express, this.tags.VectorTiles]
        })
 }

  getPost(post: string) {
    return this.posts[post]; 
  }
}

