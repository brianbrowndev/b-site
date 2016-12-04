import { Component, OnInit } from '@angular/core';
import { Post, Posts } from '../posts';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private categories: string[] = [];
  constructor() { }

  ngOnInit() {
    Object.keys(Posts).map(k => {
      let category = Posts[k].category;
      if (this.categories.indexOf(category) === -1) {
        this.categories.push(category);
      }
    });
  }
}
