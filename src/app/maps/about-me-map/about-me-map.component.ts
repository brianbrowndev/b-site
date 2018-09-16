import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AboutMePopupComponent } from './popup/about-me-popup.component';
import * as d3Fetch from 'd3-fetch';
import * as d3Selection from 'd3-selection';
import * as d3Geo from 'd3-geo';
import * as d3Ease from 'd3-ease';
import * as d3Shape from 'd3-shape';
import 'd3-transition';
import * as topojson from 'topojson-client';
import { MapUtilities } from '@app/maps/map-utilities';
import { forkJoin, from, Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'about-me-map',
  templateUrl: './about-me-map.component.html',
  styleUrls: ['./about-me-map.component.scss']
})
export class AboutMeMapComponent implements OnInit {
  //  map components
  @ViewChild('map') map: ElementRef;
  @ViewChild(AboutMePopupComponent) aboutMePopupComponent: AboutMePopupComponent;
  data: {[key: string]: string } = {
    richmond: "/assets/page/about/richmond.topo.json",
    places: "/assets/page/about/places.topo.json"
  };
  width: number = 500 * 1.5;
  height: number = 340 * 1.5;
  svg;
  path;
  projection;
  popup: string = "home";
  changeSize = new Subject();
  locations: any = [];
  constructor(
    public mu: MapUtilities
  ) { }

  ngOnInit() {
    this.drawMap();
    this.changeSize
    .asObservable().pipe(
      throttleTime(5000)
    )
    .subscribe(innerWidth => this.redrawMap());
  }

  redrawMap() {
    d3Selection.select('svg').remove();
    this.drawMap();
  }

  drawMap() {
    
    this.width = this.map.nativeElement.clientWidth;
    this.height = this.width * .7

    // this.height = Math.ceil((this.width * 9) / 16);

    this.svg = d3Selection.select(this.map.nativeElement).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    
    let mapGroup = this.svg.append("g").attr("class", "map-group");

    this.projection = d3Geo.geoAlbers()
      .scale(this.width)
      .translate([this.width /2, this.height/2]);
    this.path = d3Geo.geoPath(this.projection);
 
    forkJoin([
      from(d3Fetch.json(this.data.richmond)),
      from(d3Fetch.json(this.data.places))
    ]
    ).subscribe(([richmondJson, placesJson]) => {

      let self = this;
      let richmond = topojson.feature(richmondJson, richmondJson["objects"].richmond).features[0];
      let richmondPlaces = topojson.feature(placesJson, placesJson["objects"].richmond).features;

      let delay = 0;
      let duration = 0;

      // Reset projection before redrawing
      this.projection
        .scale(1)
        .translate([0, 0]);
      this.mu.zoomIn(this.projection, this.path.bounds(richmond), this.width, this.height);
      mapGroup.append("path")
        .datum(richmond)
        .attr("d", this.path)
        .each(function (d) { duration = (d.length = this.getTotalLength()) * 1.5 })
        .style("stroke-dasharray", (d) => `0,${d.length}`)
        .attr("class", "map-boundary")
        .transition()
          .delay((d, i) => { var delay1 = delay; delay += duration; return delay1; })
          .duration(d => { return duration; })
          .ease(d3Ease.easeLinear)
          .style("stroke-dasharray", (d) => `${d.length},${d.length}`);

      var triangle = d3Shape.symbol()
                  .type(d3Shape.symbolTriangle)
                  .size(150);

      var star = d3Shape.symbol()
                  .type(d3Shape.symbolStar)
                  .size(180);


      // POINT LOCATIONS
      let projects = mapGroup.selectAll(null)
      .data(richmondPlaces).enter()
      .append("path")
        .filter(d => d.properties.location != 'home')
        .attr("d", triangle)
        .attr("transform", d => `translate(${this.projection(d.geometry.coordinates)})`)
        // .attr("x", (d) => this.projection(d.geometry.coordinates)[0])
        // .attr("y", (d) => this.projection(d.geometry.coordinates)[1])
        // .attr("width", "6px")
        // .attr("height", "6px")
          .attr("class", d => `map-point map-point--${d.properties.location}` )
        .attr('data-location', (d) => d.properties.location)
      let home = mapGroup.selectAll(null)
        .data(richmondPlaces).enter()
        .append("path")
          .filter(d => d.properties.location == 'home')
          .attr("d", star)
          .attr("transform", d => `translate(${this.projection(d.geometry.coordinates)})`)
          .attr("class", d => `map-point point-select map-point--${d.properties.location}` )
          .attr('data-location', (d) => d.properties.location)
      
      // add selection event to all points
      let locations = mapGroup.selectAll('.map-point')
        .on("click", function(e) {
          self.aboutMePopupComponent.popup = e.properties.location;
          locations.each(function(d:any) {
            this.classList.remove('point-select');
          });
          this.classList.add('point-select');
        })

        // legends..never again
        var legend = this.svg.append("g")
          .attr("class", "map-legend")
          .attr("width", 30)
          .attr("height", 30)

        legend.selectAll('.map-legend').data(richmondPlaces)
            .enter().append("path")
          .filter(d => d.properties.location != 'home')
            .attr("d", triangle)
            .attr("transform", (d, i) => `translate(30,${this.height - 30 - ((i+ 1) * 20)})` )
            .attr("class", d => `map-point--${d.properties.location}`)

        legend.selectAll('.map-legend').data(richmondPlaces)
            .enter().append("path")
          .filter(d => d.properties.location == 'home')
            .attr("d", star)
            .attr("width", 18)
            .attr("height", 18)
            .attr("transform", (d, i) => `translate(30,${this.height - 30 - (i * 20)})` )
            .attr("class", d => `map-point--${d.properties.location}`)

        legend.selectAll('.map-legend').data(richmondPlaces)
            .enter().append("text")
          .filter(d => d.properties.location !== 'home')
            .attr("x", 50)
            .attr("y", (d, i) => this.height - 25 - ((i + 1.1)*20)) 
            .text((d, i) => d.properties.location.toUpperCase());

        legend.selectAll('.map-legend').data(richmondPlaces)
            .enter().append("text")
          .filter(d => d.properties.location == 'home')
            .attr("x", 50)
            .attr("y", (d, i) => this.height - 25) 
            .text((d, i) => d.properties.location.toUpperCase());
    });
  }
  @HostListener('window:resize', ['$event.target'])
  public onResize(target) {
    this.changeSize.next(target.innerWidth);   
  }

}
