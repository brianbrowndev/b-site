import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Fetch from 'd3-fetch';
import * as topojson from 'topojson-client';
import { MapUtilities } from '../map-utilities';

@Component({
  selector: 'about-me-map',
  templateUrl: './about-me-map.component.html',
  styleUrls: ['./about-me-map.component.scss']
})
export class AboutMeMapComponent implements OnInit {
  //  map components
  map;
  data: {[key: string]: string } = {
    richmond: "/assets/page/about/richmond.topo.json",
    places: "/assets/page/about/places.topo.json"
  };
  width: number = 500 * 1.5;
  height: number = 340 * 1.5;
  svg;
  path;
  g;
  projection;
  popup: string = "home";
  constructor(
    public mu: MapUtilities
  ) { }

  ngOnInit() {
    this.svg = d3.select("#map").append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.projection = d3.geoAlbers()
      .scale(1)
      .translate([0, 0]);
    this.path = d3.geoPath(this.projection);
    this.g = this.svg.append("g")
    this.drawMap();

  }

  drawMap() {
    Promise.all([
      d3Fetch.json(this.data.richmond),
      d3Fetch.json(this.data.places)
    ]
    ).then(([richmondJson, placesJson]) => {

      let richmond = topojson.feature(richmondJson, richmondJson["objects"].richmond).features[0];
      let richmondPlaces = topojson.feature(placesJson, placesJson["objects"].richmond).features;

      let delay = 0;
      let duration = 0;

      // Reset projection before redrawing
      this.projection
        .scale(1)
        .translate([0, 0]);
      this.mu.zoomIn(this.projection, this.path.bounds(richmond), this.width, this.height);
      this.g.append("path")
        .datum(richmond)
        .attr("d", this.path)
        .each(function (d) { duration = (d.length = this.getTotalLength()) * 2 })
        .style("stroke-dasharray", (d) => `0,${d.length}`)
        .attr("class", "map-boundary")
        .transition()
          .delay((d, i) => { var delay1 = delay; delay += duration; return delay1; })
          .duration(d => { return duration; })
          .ease(d3.easeLinear)
          .style("stroke-dasharray", (d) => `${d.length},${d.length}`);

      console.log(richmondPlaces)
      let points = this.g.selectAll("circle")
      .data(richmondPlaces).enter()
      .append("circle")
        .attr("cx", (d) => this.projection(d.geometry.coordinates)[0])
        .attr("cy", (d) => this.projection(d.geometry.coordinates)[1])
        .attr("r", "6px")
        .attr("class", "map-point")
        .on("click", (e) => this.popup = e.properties.location)

      // bind class off property, then use css to style
      points.each(function(d:any) {
        this.classList.add(`map-point--${d.properties.location}`);
      });
    });
  }

}
