import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(PostsComponent)
  private postsComponent:PostsComponent;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        let category = params.hasOwnProperty('category') ? params['category'] : '';
        this.postsComponent.filterPosts(category);       
      } 
    )
  }

}
