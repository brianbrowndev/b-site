import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, Posts } from '../posts';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map;
  constructor(
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params =>  
       Object.keys(Posts).some(k => {
         let post = Posts[k];
         if (post.key === params['map']) {
            this.map = post.map
            return true;
         }
         return false;
       }) 
   
    )
 
  }


}
