import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import * as d3Fetch from 'd3-fetch';
import * as d3Selection from 'd3-selection';
import 'd3-transition';
import { forkJoin, from, Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { environment } from '@env/environment';

@Component({
  selector: 'app-spending-history',
  templateUrl: './spending-history.component.html',
  styleUrls: ['./spending-history.component.scss']
})
export class SpendingHistoryComponent implements OnInit {

  //  map components
  @ViewChild('graph') graph: ElementRef;

  width: number;
  height: number;
  svg;
  changeSize = new Subject();
  spendingUrl: string = `${environment.budget}/api/public/finance/transactions-per-day`;
  constructor(
  ) { }

  ngOnInit() {
    this.draw();
    this.changeSize
    .asObservable().pipe(
      throttleTime(5000)
    )
    .subscribe(innerWidth => this.redraw());
  }

  redraw() {
    d3Selection.select('svg').remove();
    this.draw();
  }

  draw() {
    
    this.width = this.graph.nativeElement.clientWidth;
    // this.height = this.width * .7
    this.height = Math.ceil((this.width * 9) / 16);

    this.svg = d3Selection.select(this.graph.nativeElement).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    
    from(d3Fetch.json(this.spendingUrl))
      .subscribe(data => {
        console.log(data);
    });

  }
  @HostListener('window:resize', ['$event.target'])
  public onResize(target) {
    this.changeSize.next(target.innerWidth);   
  }

}
