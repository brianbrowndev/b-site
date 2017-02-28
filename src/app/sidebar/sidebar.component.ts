import { Component, HostListener, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  private tags: string[];
  private categories: string[];
  private winHeight: number;
  constructor(@Inject(DOCUMENT) private document:any) { }

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
