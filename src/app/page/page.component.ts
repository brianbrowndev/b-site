import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { MarkdownService } from '../markdown.service';
import 'rxjs/add/operator/switchMap';

import { Page } from '../page';

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
