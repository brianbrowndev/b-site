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
  }
}
