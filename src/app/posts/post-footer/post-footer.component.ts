import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@app/models/post';

@Component({
  selector: 'post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss']
})
export class PostFooterComponent implements OnInit {
  @Input() post:Post;

  constructor() { }

  ngOnInit() {
  }

}
