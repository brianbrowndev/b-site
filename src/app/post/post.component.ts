import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from '../markdown.service';
import { Post } from '../models/post';
import { PostsService } from '../posts.service';


@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @ViewChild('article') article;
  post:Post;
  map;
  constructor(
    public mds: MarkdownService,
    public ps: PostsService,
    public route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params =>  
       Object.keys(this.ps.posts).some(k => {
         let post = this.ps.posts[k];
         if (post.key === params['post']) {
            this.post = post;
            if (this.post.map) {
              this.map = this.post.map
            }
            this.mds.getContent(post.url).subscribe(res =>
              this.article.nativeElement.innerHTML = res
            )
            return true;
         }
         return false;
       }) 
   
    )
 
  }

}
