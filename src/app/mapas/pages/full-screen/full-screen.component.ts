import { Component, OnInit } from '@angular/core';

import * as mapboxgl  from "mapbox-gl";

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #mapa{
      height: 100%;
      width: 100%;
    }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const map = new mapboxgl.Map({
      container: 'mapa', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-99.58556475717162, 19.126198396960966], // starting position [lng, lat]
      zoom: 16, // starting zoom

    });

  }

}
