import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../posts';

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
