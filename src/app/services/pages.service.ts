import { Injectable } from '@angular/core';
import { Page } from '../models/page';

@Injectable()
export class PagesService {

  public url: string = 'assets/page/';
  public pages = {
    about: new Page({url: `${this.url}/about/about.md`}),
    test: new Page()
  }

  getPage(page: string) {
    return this.pages[page]; 
  }
}
