import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AboutMePopupComponent } from './popup/about-me-popup.component';
import * as d3Fetch from 'd3-fetch';
import * as d3Selection from 'd3-selection';
import * as d3Geo from 'd3-geo';
import * as d3Ease from 'd3-ease';
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

    this.svg = d3Selection.select(this.map.nativeElement).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

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
      this.svg.append("path")
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


      let points = this.svg.selectAll("circle")
      .data(richmondPlaces).enter()
      .append("circle")
        .attr("cx", (d) => this.projection(d.geometry.coordinates)[0])
        .attr("cy", (d) => this.projection(d.geometry.coordinates)[1])
        .attr("r", "6px")
        .attr("class", "map-point")
        .attr('data-location', (d) => d.properties.location)
        .on("click", function(e) {
          self.aboutMePopupComponent.popup = e.properties.location;
          points.each(function(d:any) {
            this.classList.remove('point-select');
          });
          this.classList.add('point-select');
        })

      // bind class off property, then use css to style
      points.each(function(d:any) {
        this.classList.add(`map-point--${d.properties.location}`);
        if (this.dataset.location == 'home') {
          this.classList.add('point-select');
        }
      });
    });
  }
  @HostListener('window:resize', ['$event.target'])
  public onResize(target) {
    this.changeSize.next(target.innerWidth);   
  }

}
