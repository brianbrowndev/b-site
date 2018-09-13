import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'about-me-popup',
  templateUrl: './about-me-popup.component.html',
  styleUrls: ['./about-me-popup.component.scss']
})
export class AboutMePopupComponent implements OnInit {
  @Input()popup: string = "home";
  constructor(
  ) { }

  ngOnInit() {
    console.log(this.popup)
  }


}
