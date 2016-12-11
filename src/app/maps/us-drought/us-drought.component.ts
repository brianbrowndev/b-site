import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

@Component({
  selector: 'app-us-drought',
  templateUrl: './us-drought.component.html',
  styleUrls: ['./us-drought.component.scss']
})
export class UsDroughtComponent implements OnInit {
  private map;
  private data: { divisions: string, drought: string } = {
    divisions: "/assets/post/us-drought/divisions-merged.topo.json",
    drought: "/assets/post/us-drought/drought.csv"
  };
  private styles;
  private width: number = 960;
  private height: number = 500;
  private svg;
  private path;
  private g;
  private projection;

  private droughtYear: string = "2015";
  constructor() { }

  ngOnInit() {
    this.svg = d3.select("#map").append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    this.projection = d3.geoAlbers()
      .scale(1000)
      .translate([this.width / 2, this.height / 2]);

    this.path = d3.geoPath(this.projection);

    this.styles = d3.scaleQuantize()
      .domain([-4.00, -3.00, -2.00, 0])
      .range(["#7F003F", "#FE0000", "#FEAF44", "#bdc3c7"]);

    d3.queue()
      .defer(d3.json, this.data.divisions)
      .defer(d3.csv, this.data.drought)
      .await(this.run.bind(this));
  }

  run(e, divisions, drought) {
    let droughtYear = this.droughtByYear(drought, this.droughtYear);
    let features = topojson.feature(divisions, divisions.objects.divisions).features;
    this.svg.append("g")
      .attr("class", "divisions")
      .selectAll("path")
      .data(features)
      .enter().append("path")
      .style("fill", d =>  this.styles(droughtYear.get(d.id)))
      .style("stroke", d => {
        return this.styles(droughtYear.get(d.id))
      }).attr("d", this.path);

    // $("#right, #left").click(event => {
    //   let direction = $(event.currentTarget).data().direction;
    //   let year = ($("#map-year").data().year);
    //   if ((direction === "right" && year === 2015) ||
    //     (direction === "left" && year === 1895)) {
    //     return
    //   }
    //   direction === "left" ? year -= 1 : year += 1;
    //   $("#map-year").data("year", year);
    //   $("#map-year").text("" + year);
    //   let yearStr = year.toString();
    //   droughtYear = droughtByYear(drought, yearStr);
    //   svg.selectAll("path")
    //     .data(features)
    //     .style("fill", d => {
    //       return color(droughtYear.get(d.id))
    //     })
    //     .style("stroke", d => {
    //       return color(droughtYear.get(d.id))
    //     })
    // });
  }
  droughtByYear(drought, year) {
    let droughtByDiv = d3.map();
    drought.forEach(d => {
      if (d.year === year) {
        droughtByDiv.set(+d.key, +d.pdsi)
      }
    });
    return droughtByDiv;

  }
}