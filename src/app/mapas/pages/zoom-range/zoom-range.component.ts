import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

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
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-99.58556475717162, 19.126198396960966];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {

    console.log('AfterViewInit', this.divMapa);
    
    // Mapa
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID, que traemos desde el html con el viewchild
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });

    // Nivel del zoom
    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
      // console.log(ev);
    });

  // Nivel máximo del zoom
    this.mapa.on('zoomend', (ev) => {
      if ( this.mapa.getZoom() > 18 ){
        this.mapa.zoomTo( 18 );
      }
    });

    // Movimiento del mapa
    this.mapa.on('move', (event) => {
      // console.log(event);
      const target = event.target;
      const {lng, lat} = target.getCenter();
      // console.log(target.getCenter());
      this.center = [lng , lat];
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
