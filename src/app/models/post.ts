export class Post {
    key: string;
    title: string;
    tldr: string;
    date: string;
    category: string;
    tags: string[];
    cover: string;
    url: string;
    map: any;
    constructor(options: {
        key?: string,
        title?: string,
        tldr?: string,
        date?: string,
        category?: string,
        tags?: string[],
        cover?: string,
        url?: string,
        map?: any,
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
