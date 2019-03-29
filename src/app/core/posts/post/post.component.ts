import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from '../../services/markdown.service';
import { Post } from '@app/core/models/post';
import { PostsService } from '@app/core/services/posts.service';
import { Title }     from '@angular/platform-browser';


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
    public route: ActivatedRoute,
    public titleService: Title
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params =>  
       Object.keys(this.ps.posts).some(k => {
         let post = this.ps.posts[k];
         this.titleService.setTitle(`${post.title} | brian brown`);
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
