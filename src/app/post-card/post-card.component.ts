import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../posts';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post:Post;
  private date;

  constructor() { }

  ngOnInit() {
  }

}
