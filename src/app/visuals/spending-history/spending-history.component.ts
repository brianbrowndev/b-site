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
  @ViewChild('graph', { static: true }) graph: ElementRef;

  width: number;
  height: number;
  margin: number = 30;
  cellSize: number = 18;
  svg;
  changeSize = new Subject();
  spendingUrl: string = `${environment.budget}/api/public/finance/transactions-per-day`;

  readonly holidays = ["01-01", "05-28", "07-04", "09-03", "12-25", "11-22", "12-30"]
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
    
    // this.width = this.graph.nativeElement.clientWidth - this.margin;
    this.width = 1000;
    this.height = this.cellSize * 10 + this.margin

    this.svg = d3Selection.select(this.graph.nativeElement).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    
    from<Array<{transactionCount: number, date:string}>>(d3Fetch.json(this.spendingUrl))
      .subscribe(data => {
        const formatTime = d3TimeFormat.timeFormat("%Y-%m-%d");
        const formatMonth = d3TimeFormat.timeFormat("%b");
        const formatDay = d3TimeFormat.timeFormat("%a %b %d, %Y");
        const formatHoliday = d3TimeFormat.timeFormat("%m-%d");

        const today = d3Time.timeMonth.offset(new Date(), -3);
        const yearAgo = d3Time.timeYear.offset(today, -1);
        const months = d3Time.timeMonth.range(yearAgo, d3Time.timeMonth.ceil(today)).map(d => d3Time.timeDay.offset(d, 15));

        this.svg.append("g")
          .attr("transform", `translate(${this.margin},0)`)
          .selectAll('text')
          .data(months)
          .enter().append("text")
              // .attr("transform", (d) => `translate(${d3Time.timeMonth.count(yearAgo, d) * (this.cellSize * 4.4)},${this.margin/2})`)
              .attr("transform", (d) => `translate(${d3Time.timeWeek.count(yearAgo, d) * (this.cellSize)},${this.margin/2})`)
              .attr("text-anchor", "middle")
              .attr("class", "visual-text")
              .text((d) => formatMonth(d) );

        let days = d3Time.timeDay.range(yearAgo, today).map(d => {return {date: d, count:0, holiday:false}});
        let recentTransactions = (data as any).filter(d => d.date > formatTime(yearAgo));
        days.forEach(d => {
            let transaction = recentTransactions.find(r => r.date == formatTime(d.date));
            d.count = transaction != null ? transaction.transactionCount : 0;
            if (this.holidays.includes(formatHoliday(d.date))) d.holiday = true;
        })
        let max = recentTransactions.reduce((a,b) => a.transactionCount > b.transactionCount ? a : b).transactionCount;

        let tooltip = d3Selection.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        let rect = this.svg.append("g")
          .attr("transform", `translate(${this.margin},0) `)
          .selectAll("rect")
          .data(days.sort((a,b) => a.holiday ? 1 : 0))
          .enter().append("rect")
            .attr("stroke", d => d.holiday ? "#e74c3c" : "#FFFFFF")
            .attr("stroke-width", "3")
            .attr("class", (d) => `transaction-${d.count}`)
            .attr("width", this.cellSize)
            .attr("height", this.cellSize)
            .attr("x", (d) => d3Time.timeWeek.count(yearAgo, d.date) * this.cellSize) 
            .attr("y", (d) => d.date.getDay() * this.cellSize + this.margin)
            .on("mouseover", d => {
              tooltip.transition()
                .duration(200)
                .style("opacity", 1)
              let count = "No transactions";
              if (d.count == 1) count = `${d.count} transaction`;
              if (d.count > 1) count = `${d.count} transactions`;
              tooltip.html(`${count} on </br> ${formatDay(d.date)}`)
                .style("left", (d3Selection.event.pageX) + "px")
                .style("top", (d3Selection.event.pageY - 28) + "px");
            })
            .on("mouseout", (d) =>
              tooltip.transition()
                .duration(500)
                .style("opacity", 0)
            );





    });

  }
  @HostListener('window:resize', ['$event.target'])
  public onResize(target) {
    this.changeSize.next(target.innerWidth);   
  }

}
