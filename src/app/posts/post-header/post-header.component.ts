import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@app/models/post';

@Component({
  selector: 'post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {
  @Input() post:Post;

  constructor() { }

  ngOnInit() {
  }

}
