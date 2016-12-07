import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapService } from '../map.service';
import { MarkdownService } from '../markdown.service';
import { Post, Posts } from '../posts';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map') map;
  private post:Post;
  constructor(
    private ms: MapService,
    private mds: MarkdownService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params =>  
       Object.keys(Posts).some(k => {
         let post = Posts[k];
         if (post.key === params['map']) {
            this.post = post;
            if (this.post.map) {
              this.mds.getContent(post.map).subscribe(res => {
               this.map.nativeElement.innerHTML = res;
               this.ms.draw(this.post.key);
              })
            }
            return true;
         }
         return false;
       }) 
   
    )
 
  }


}
