import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapService } from '../map.service';
import { MarkdownService } from '../markdown.service';
import { Post, Posts } from '../posts';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @ViewChild('article') article;
  private post:Post;
  private map;
  constructor(
    private ms: MapService,
    private mds: MarkdownService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params =>  
       Object.keys(Posts).some(k => {
         let post = Posts[k];
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
