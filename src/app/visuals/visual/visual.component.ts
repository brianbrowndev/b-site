import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent implements OnInit {
  @Input() hasDescription:boolean = true;
  constructor() { }


  ngOnInit() {
  }


}
