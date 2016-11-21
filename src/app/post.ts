export class Post {
    title: string;
    date: string;
    tags: string[];
    url: string;
    constructor(options: {
        title?: string,
        date?: string,
        tags?: string[],
        url?: string
    } = {}) {
        this.title = options.title || '';
        this.date = options.date || '';
        this.tags = options.tags || [];
        this.url = options.url || '';
    }
}
