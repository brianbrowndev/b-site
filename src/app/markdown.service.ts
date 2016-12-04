import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as hljs from 'highlightjs';

const md = require('markdown-it')({
  html: true,

  linkify:true, 
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});


@Injectable()
export class MarkdownService {

  constructor(private http: Http) { 

  }
  getContent(path): Observable<any> {
    return this.http.get(path)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return md.render(res.text()) || {};
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().errors || 'Server error');
  }
}