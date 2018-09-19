import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import * as d3Fetch from 'd3-fetch';
import * as d3Selection from 'd3-selection';
import * as d3Time from 'd3-time';
import * as d3Scale from 'd3-scale';
import * as d3TimeFormat from 'd3-time-format';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
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
  margin: number = 30;
  cellSize: number = 18;
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
    
    this.width = this.graph.nativeElement.clientWidth - this.margin;
    this.height = this.cellSize * 10 - this.margin
    // this.height = Math.ceil((this.width * 9) / 16);

    this.svg = d3Selection.select(this.graph.nativeElement).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    
    from<Array<{transactionCount: number, date:string}>>(d3Fetch.json(this.spendingUrl))
      .subscribe(data => {
        const formatTime = d3TimeFormat.timeFormat("%Y-%m-%d");

        const today = d3Time.timeMonth.offset(new Date(), -3);
        const yearAgo = d3Time.timeYear.offset(today, -1);
        const days = d3Time.timeDay.range(yearAgo, today);
        let recentTransactions = data.filter(d => d.date > formatTime(yearAgo));
        let max = recentTransactions.reduce((a,b) => a.transactionCount > b.transactionCount ? a : b).transactionCount;
        let colors = d3ScaleChromatic.schemeGreens[9];

        let rect = this.svg.append("g")
            .attr("stroke", "#ccc")
          .selectAll("rect")
          .data(days)
          .enter().append("rect")
            // TODO data joins the d3 way
            .attr("fill", (d) => {
              let transaction = recentTransactions.find(r => r.date == formatTime(d))
              return colors[transaction != null ? transaction.transactionCount : 0];
            })
            .attr("width", this.cellSize)
            .attr("height", this.cellSize)
            .attr("x", (d) => d3Time.timeWeek.count(yearAgo, d) * this.cellSize) 
            .attr("y", (d) => d.getDay() * this.cellSize)
            .datum(d3TimeFormat.timeFormat("%Y-%m-%d"));



    });

  }
  @HostListener('window:resize', ['$event.target'])
  public onResize(target) {
    this.changeSize.next(target.innerWidth);   
  }

}
