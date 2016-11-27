export class Post {
    title: string;
    description: string;
    tldr: string;
    date: string;
    category:string;
    tags: string[];
    cover : string;
    url: string;
    constructor(options: {
        title?: string,
        description?: string,
        tldr?: string,
        date?: string,
        category?: string,
        tags?: string[],
        cover?: string,
        url?: string
    } = {}) {
        this.title = options.title || '';
        this.description = options.description || '';
        this.tldr = options.tldr || '';
        this.date = options.date || '';
        this.category = options.category || '';
        this.tags = options.tags || [];
        this.cover = options.cover || '';
        this.url = options.url || '';
    }
}

const url: string = 'assets/post/';

export const Posts = {
    About: new Post({
        title: 'Dynamic Tables',
        description: 'Building dynamic tables in ArcGIS',
        tldr: 'ArcPy can be used to manipulate map document layouts such as by creating unique tables',
        category: 'esri',
        date: '2015-12-24',
        cover: '/assets/post/dynamic-tables/cover.jpg',
        url: `${url}/dynamic-tables/dynamic-tables.md`})
}
