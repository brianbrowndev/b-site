import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'post-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class PostSidebarComponent {

  tags: string[];
  categories: string[];
  winHeight: number;
  constructor(@Inject(DOCUMENT) public document:any) { }

  set(categories: string[], tags?: string[]) {
    this.categories = categories;
    this.tags = tags.sort();
  }
  
  setHeight() {
    this.winHeight = this.document.documentElement.scrollTop || this.document.body.scrollTop;
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.setHeight();
  }
}
