export class Page {
    title: string;
    url: string;
    constructor(options: {
        title?: string,
        url?: string
    } = {}) {
        this.title = options.title || '';
        this.url = options.url || '';
    }
}

const url: string = 'assets/page/';

export const Pages = {
    About: new Page({url: `${url}/about/about.md`})
}
