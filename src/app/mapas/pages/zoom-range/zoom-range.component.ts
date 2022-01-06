import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as mapboxgl  from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }

    .row{
      background-color: white;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      z-index: 999;
      width: 380px;
    }
    `
    
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() { }

  ngAfterViewInit(): void {

    console.log('AfterViewInit', this.divMapa);
    

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID, que traemos desde el html con el viewchild
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-99.58556475717162, 19.126198396960966], // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });

    this.mapa.on('zoom', (ev) => {
      const zoomActual = this.mapa.getZoom();
      // console.log(zoomActual);
      this.zoomLevel = zoomActual;
      // console.log(ev);
    });

    this.mapa.on('zoomend', (ev) => {
      if ( this.mapa.getZoom() > 18 ){
        this.mapa.zoomTo( 18 );
      }
    });
  }
  zoomOut(){
    // console.log('zoom out');
    this.mapa.zoomOut();

  }
  zoomIn(){
    this.mapa.zoomIn();
  
  }

  zoomCambio(valor:string){
    // console.log(valor);
    this.mapa.zoomTo(Number(valor));
    
  }
}
