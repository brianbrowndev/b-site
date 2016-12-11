import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as $ from 'jquery';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';


@Component({
  selector: 'app-bike-commute',
  templateUrl: './bike-commute.component.html',
  styleUrls: ['./bike-commute.component.scss']
})
export class BikeCommuteComponent implements OnInit {

    //  map components
    private graph;
    private map;
    private mapColors: {} = {
        work: "#2980b9",
        home: "#e74c3c",
        poi: "#8e44ad",
        overlap: "#8e44ad"
    };
    private mapData: {} = {
        commute: "/assets/post/commute/commute.topo.json",
        poi: "/assets/post/commute/poi.geo.json",
        graph: "/assets/post/commute/graph.csv"
    };
    private mapContainer: string = "map";
    private graphContainer: string = ".graph-container";
    private eventDefault = { opacity: ".5" };
    private selectDefault = { opacity: ".9" };


  constructor() { }

  ngOnInit() {
    this.drawMap();
    this.drawGraphic();
  }

  drawMap() {
    this.map = new L.Map(this.mapContainer).setView([37, -77], 13);
    let TileLayer = L.tileLayer;
    TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    d3.queue()
      .defer(d3.json, this.mapData['commute'])
      .await(this.run.bind(this));
  }

  run(e, commute) {
    function onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.description) {
        layer.bindPopup(feature.properties.description)
      }
    }
    var commuteLyr = L.geoJson(null, {});
    this.map.addLayer(commuteLyr);
    let commuteTopo = topojson.feature(commute, commute.objects.commute);
    commuteLyr.addData(commuteTopo);
    let bounds = commuteLyr.getBounds();
    this.map.fitBounds(bounds);
    let defaultStyle = {
      width: 5,
      opacity: 1
    };
    commuteLyr.eachLayer((f, l) => {
      let key = f.feature.properties.dest.toLowerCase();
      f.setStyle(defaultStyle)
        .setStyle({ color: this.mapColors[key] });
      $(f._container).attr('id', key);
      $(f._container).css("opacity", ".5");
      f.on("mouseover", () => {
        (f => { this.mapMouseOver(f) })(f);
      });
      f.on("mouseout", () => {
        (f => { this.mapMouseOut(f) })(f);
      });
    })
  }
  drawGraphic() {
    this.graph = $(this.graphContainer);
    this.drawGraph();
    window.onresize = this.drawGraph.bind(this);
  }
  drawGraph() {
    let width = this.graph.width();
    let height = Math.ceil((width * 9) / 16);
    $(this.graphContainer).empty();
    let svg = d3.select(this.graphContainer).append("svg")
      .attr("width", width)
      .attr("height", height);
    let x = d3.scaleLinear()
      .range([0, width]);
    let y = d3.scaleLinear()
      .range([height, 0]);
    let area = d3.area()
      .x(d => {
        return x(d["distance"])
      })
      .y0(height)
      .y1(d => {
        return y(d["elevation"])
      })
    d3.csv(this.mapData["graph"], (error, data: any) => {
      data.forEach(d => {
        d["distance"] = parseFloat(d["distance"]).toFixed(2);
        d["elevation"] = +d["elevation"];
      });
      let workCommute = data.filter(d => {
        return d["route"] == "work"
      })
        .sort((a, b) => {
          return d3.descending(a["distance"], b["distance"])
        });
      let homeCommute = data.filter(d => {
        return d["route"] == "home"
      })
        .sort((a, b) =>
          d3.ascending(a["distance"], b["distance"])
        );
      data = [...homeCommute, ...workCommute];
      let g = svg.append("g");
      x.domain(d3.extent(data, d => {
        return d["distance"]
      }));
      y.domain([0, d3.max(data, d => {
        return d["elevation"]
      })]);
      let dataNest = d3.nest()
        .key(d => {
          return d["route"];
        })
        .entries(data);
      for (let d of dataNest) {
        g.append("path")
          .attr("class", "area")
          .attr("d", area(d.values))
          .attr("fill", this.mapColors[d.key])
          .attr("id", d.key)
          .on("mouseover", this.graphMouseOver.bind(this, g))
          .on("mouseout", this.graphMouseOut.bind(this, g));

      }
      svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisRight(y).ticks(5, 0)
          .tickFormat(d3.format(",.0f")));

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height - 25})`)
        .call(d3.axisBottom(x).ticks(5));

      svg.selectAll(".tick")
        .each((d, i, g) => {
          if (d == 0) {
            let elem: any = g[i];
            elem.remove();
          }
        });

      svg.append("text")
        .attr("class", "label-text")
        .attr("x", (width / 2) - 35)
        .attr("y", height - 30)
        .text("Distance (miles)");
      svg.append("text")
        .attr("class", "label-text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - (height / 2) - 35)
        .attr("y", 55)
        .text("Elevation (feet)")

    });
  }

  mapMouseOver(f) {
    var key = f.feature.properties.dest.toLowerCase();
    for (var prop of Object.keys(this.selectDefault)) {
      $(f._container).css(prop, this.selectDefault[prop]);
      $(`.area#${key}`).css(prop, this.selectDefault[prop]);
      $(`.legend-item#${key}`).css(prop, this.selectDefault[prop]);
    }
    // d3.select(`.area#${key}`).moveToFront();
    f.bringToFront();
  }
  mapMouseOut(f) {
    var key = f.feature.properties.dest.toLowerCase();
    for (var prop of Object.keys(this.eventDefault)) {
      $(f._container).css(prop, this.eventDefault[prop]);
      $(`.area#${key}`).css(prop, this.eventDefault[prop]);
      $(`.legend-item#${key}`).css(prop, this.eventDefault[prop]);
    }
  }

  graphMouseOver(g) {
    let s = `#${g.id}`;
    for (let prop of Object.keys(this.selectDefault)) {
      $(g).css(prop, this.selectDefault[prop]);
      $(`g${s}`).css(prop, this.selectDefault[prop]);
      $(`.legend-item${s}`).css(prop, this.selectDefault[prop]);
    }
    // d3.select(g).moveToFront();
  }
  graphMouseOut() {
    var s = `#${this["id"]}`;
    for (var prop of Object.keys(this.selectDefault)) {
      $(this).css(prop, this.eventDefault[prop]);
      $(`g${s}`).css(prop, this.eventDefault[prop]);
      $(`.legend-item${s}`).css(prop, this.eventDefault[prop]);
    }
  }



}
