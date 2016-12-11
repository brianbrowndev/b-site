import * as d3 from 'd3';

export class States {

    //  map components
    private width:number = 300;
    private height: number = 230;
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


    constructor() {
    }

