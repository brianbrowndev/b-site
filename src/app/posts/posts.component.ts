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
    this.posts = Object.keys(Posts).map(k => Posts[k])
  }
}
