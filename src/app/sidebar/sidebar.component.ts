import { Component, OnInit, HostListener, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Post, Posts } from '../posts';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('sidebar') sidebar;
  private categories: string[] = [];
  private winHeight: number;
  constructor(@Inject(DOCUMENT) private document:Document) { }

  ngOnInit() {
    Object.keys(Posts).map(k => {
      let category = Posts[k].category;
      if (this.categories.indexOf(category) === -1) {
        this.categories.push(category);
      }
      this.setHeight();
    });
  }

  setHeight() {
    this.winHeight = this.document.documentElement.scrollTop || this.document.body.scrollTop;
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.setHeight();
  }
}
