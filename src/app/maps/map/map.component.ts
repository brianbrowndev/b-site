import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() hasDescription:boolean = true;
  constructor() { }


  ngOnInit() {
  }


}
