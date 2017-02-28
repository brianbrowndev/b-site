import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from '../markdown.service';
import { PagesService } from '../pages.service';
import { Page } from '../models/page';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  private data;

  constructor(
    private mds: MarkdownService,
    private ps: PagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((d) => { 
        let page: Page = this.ps.getPage(d['pageName']);
        this.mds.getContent(page.url).subscribe(res =>
          this.data = res
        )
    }
    );
  }
}
