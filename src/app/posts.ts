export class Post {
    key: string;
    title: string;
    tldr: string;
    date: string;
    category:string;
    tags: string[];
    cover : string;
    url: string;
    constructor(options: {
        key?: string,
        title?: string,
        tldr?: string,
        date?: string,
        category?: string,
        tags?: string[],
        cover?: string,
        url?: string
    } = {}) {
        this.key = options.key || '';
        this.title = options.title || '';
        this.tldr = options.tldr || '';
        this.date = options.date || '';
        this.category = options.category || '';
        this.tags = options.tags || [];
        this.cover = options.cover || '';
        this.url = options.url || '';
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
        cover: '/assets/post/dynamic-tables/cover.jpg',
        url: `${url}/dynamic-tables/dynamic-tables.md`}),
   VectorTiles: new Post({
        key: 'vector-tiles',
        title: 'Serving Vector Tiles',
        tldr: 'Put vector tiles on a server and display them on a map',
        category: 'maps',
        date: '2016-01-14',
        cover: '/assets/post/vector-tiles/cover.jpg',
        url: `${url}/vector-tiles/vector-tiles.md`}),
   Commute: new Post({
        key: 'bike-commute',
        title: 'Mapping a Bike Commute',
        tldr: 'I go up and down big hills',
        category: 'maps',
        date: '2015-12-26',
        cover: '/assets/post/commute/cover.jpg',
        url: `${url}/commute/commute.md`})
}
