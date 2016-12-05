import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from '../markdown.service';
import { Post, Posts } from '../posts';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  private post:Post;
  private markdown;
  constructor(
    private mds: MarkdownService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params =>  
       Object.keys(Posts).some(k => {
         let post = Posts[k];
         if (post.key === params['post']) {
            this.post = post;
            this.mds.getContent(post.url).subscribe(res =>
              this.markdown = res
            )
            return true;
         }
         return false;
       }) 
   
    )
 
  }

}
