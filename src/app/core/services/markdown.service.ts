import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import * as hljs from 'highlightjs';
import * as md from 'markdown-it';

md({
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

  constructor(
    public http: HttpClient
  ) { 
  }
  getContent(path): Observable<any> {
    return this.http.get(path, {responseType: 'text'})
      .pipe(
          map(this.extractData),
          catchError(this.handleError)
      );

  }

  extractData(res: Response) {
    return md.render(res) || {};
  }

  handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          return throwError('An error occurred:' + error.error.message);
      }
      else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          return throwError(`Backend returned code ${error.status}, ` +
              `error: ${error.error}`);
      }
  };

}