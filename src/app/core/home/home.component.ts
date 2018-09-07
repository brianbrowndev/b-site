import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostSidebarComponent } from '@app/posts/post-sidebar/sidebar.component';
import { Post } from '@app/models/post';
import { PostsService } from '@app/services/posts.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(PostSidebarComponent)
  sidebarComponent: PostSidebarComponent;

  posts: Post[];
  tags: string[];
  categories: string[];
  constructor(
    public route: ActivatedRoute,
    public ps: PostsService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let category: string = params.hasOwnProperty('category') ? params['category'] : '';
      this.route.queryParams.subscribe(params => {
        let tag = params['tag'] || '';
        this.setPosts({ category: category, tag: tag });
      });
    }
    );
  }

  sortObjectArray(objectArray: any[], value: string) {
    return objectArray.sort((a, b) => {
      if (a[value] < b[value]) {
        return 1;
      }
      if (a[value] > b[value]) {
        return -1;
      }
      return 0;
    })
  }

  addTags(post: Post) {
    post.tags.forEach(tag => {
      if (this.tags.indexOf(tag) == -1) {
        this.tags.push(tag);
      }
    });
  }

  setPosts(filter: { category?: string, tag?: string }) {
    filter.category = filter.category || '';
    filter.tag = filter.tag || '';

    this.posts = [];
    this.tags = [];
    this.categories = [];

    Object.keys(this.ps.posts).map(k => {
      let post: Post = this.ps.posts[k];
      // track all categories in sidebar
      if (this.categories.indexOf(post.category) == -1) {
        this.categories.push(post.category);
      }
      if (post.category == filter.category) {
        // only add tags for matching category
        this.addTags(post);
        // filter matching category again by tag if present
        if (!!filter.tag) {
          if (post.tags.indexOf(filter.tag) !== -1) {
            this.posts.push(post);
          }
          // ignore rest if category but not tag
          return;
        }
        this.posts.push(post);
        return;
      }
      // on tag query params with no category
      else if (!filter.category && post.tags.indexOf(filter.tag) !== -1) {
        this.posts.push(post);
      }
      // on home page
      else if (!filter.category && !filter.tag) {
        this.posts.push(post);
      }
      // if only category filter, remove ignore any posts no matching category
      else if (!!filter.category && post.category !== filter.category) {
        return;
      }
      // add all tags if category match
      this.addTags(post);
    });

    this.posts = this.sortObjectArray(this.posts, "date");

    this.sidebarComponent.set(this.categories, this.tags);
  }


}
