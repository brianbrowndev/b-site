import { Component, OnInit } from '@angular/core';
import { Post, Posts } from '../posts';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private posts: Post[]; 
  constructor() { }


  ngOnInit() {
  }

  setPosts() {
    this.posts = Object.keys(Posts).map(k => Posts[k])
    this.sortPosts();

  }

  sortPosts() {
    this.posts = this.posts.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    })
  }
  filterPosts(category:string) {
    if (!category) {
      this.setPosts();
      return;
    }
    this.posts = [];
    Object.keys(Posts).map(k => {
      if (Posts[k].category == category) {
        this.posts.push(Posts[k]);
      }
    })
    this.sortPosts();
  }

}
