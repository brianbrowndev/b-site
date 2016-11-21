import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss']
})
export class MastheadComponent implements OnInit {

  private title:string  = "bgeo";
  constructor() { }

  ngOnInit() {
  }

}
