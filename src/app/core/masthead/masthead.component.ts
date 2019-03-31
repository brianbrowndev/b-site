import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss']
})
export class MastheadComponent implements OnInit {

  title:string  = "Brian Brown";
  constructor() { }

  ngOnInit() {
  }

}
