import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from '../markdown.service';

import { Page } from '../pages';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  private data;

  constructor(
    private mds: MarkdownService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe((page: Page) => 
        this.mds.getContent(page.url).subscribe(res =>
          this.data = res
        )
    )
  }
}
