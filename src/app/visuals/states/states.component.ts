import { Component, OnInit } from '@angular/core';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import * as d3Fetch from 'd3-fetch';
import * as topojson from 'topojson-client';
import * as d3Ease from 'd3-ease';
import { MapUtilities } from '../map-utilities';
import { from } from 'rxjs';

@Component({
  selector: 'map-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  //  map components
  map;
  data: { states: string } = {
    states: "/assets/page/notfound/states.topo.json",
  };
  width: number = 500;
  height: number = 340;
  svg;
  path;
  g;
  projection;
  constructor(
    public mu: MapUtilities
  ) { }

  ngOnInit() {
    this.svg = d3Selection.select("#map").append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.projection = d3Geo.geoAlbers()
      .scale(1)
      .translate([0, 0]);
    this.path = d3Geo.geoPath(this.projection);
    this.g = this.svg.append("g")
      .attr("class", "boundary")
    this.drawMap();
  }

  drawMap() {

    from(d3Fetch.json(this.data.states)).subscribe(result => {
      let statesArray = topojson.feature(result, result["objects"].states).features;
      let states = this.mu.shuffleArray(statesArray);
      let state = states.shift();
      run.call(this);
      function run() {
        // Reset projection before redrawing
        this.projection
          .scale(1)
          .translate([0, 0]);
        this.mu.zoomIn(this.projection, this.path.bounds(state), this.width, this.height);
        var delay = 0;
        var duration = 0;

        this.g.append("path")
          .datum(state)
          .attr("d", this.path)
          .each(function (d) { duration = (d.length = this.getTotalLength()) * 3 })
          .style("stroke-width", "2px")
          .style("stroke-dasharray", function (d) { return `0,${d.length}`; })
          .transition()
            .delay((d, i) => { var delay1 = delay; delay += duration; return delay1; })
            .duration(d => { return duration; })
            .ease(d3Ease.easeLinear)
            .on("start", function (d) { this.style.stroke = "#303e4d"; })
            .style("stroke-dasharray", function (d) { return `${d.length},${d.length}`; })
          .transition()
            .duration(1200)
            .style("stroke-opacity", 0)
            .attr("transform", "")
            .remove()
            .on("end", run.bind(this), this);

        if (states.length === 0) {
          states = this.mu.shuffleArray(topojson.feature(result, result["objects"].states).features);
        }
        state = states.shift();
      }
    });
  }

}
