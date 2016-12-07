export class Post {
    key: string;
    title: string;
    tldr: string;
    date: string;
    category:string;
    tags: string[];
    cover : string;
    url: string;
    map: string;
    constructor(options: {
        key?: string,
        title?: string,
        tldr?: string,
        date?: string,
        category?: string,
        tags?: string[],
        cover?: string,
        url?: string,
        map?: string
    } = {}) {
        this.key = options.key || '';
        this.title = options.title || '';
        this.tldr = options.tldr || '';
        this.date = options.date || '';
        this.category = options.category || '';
        this.tags = options.tags || [];
        this.cover = options.cover || '';
        this.url = options.url || '';
        this.map = options.map || '';
    }
}

const url: string = 'assets/post';

export const Posts = {
    DynamicTables: new Post({
        key: 'dynamic-tables',
        title: 'Dynamic Tables',
        tldr: 'ArcPy can be used to manipulate map document layouts such as by creating unique tables',
        category: 'esri',
        date: '2015-12-24',
        cover: `${url}/dynamic-tables/cover.jpg`,
        url: `${url}/dynamic-tables/post.md`}),
   VectorTiles: new Post({
        key: 'vector-tiles',
        title: 'Serving Vector Tiles',
        tldr: 'Put vector tiles on a server and display them on a map',
        category: 'maps',
        date: '2016-01-14',
        cover: `${url}/vector-tiles/cover.jpg`,
        url: `${url}/vector-tiles/post.md`}),
   Commute: new Post({
        key: 'bike-commute',
        title: 'Mapping a Bike Commute',
        tldr: 'Richmond has hills and my maps are mediocre',
        category: 'maps',
        date: '2015-12-26',
        cover: `${url}/commute/cover.jpg`,
        url: `${url}/commute/post.md`,
        map: `${url}/commute/map.md`})
}
