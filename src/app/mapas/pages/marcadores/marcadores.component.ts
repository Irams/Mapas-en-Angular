import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorConColor{
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
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

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li{
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {


  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-99.58556475717162, 19.126198396960966];


  // Arreglo de marcadores
  marcadores: MarcadorConColor[] = [];
  
  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement, // container ID, que traemos desde el html con el viewchild
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: this.center, // starting position [lng, lat]
    zoom: this.zoomLevel, // starting zoom
  });

  this.leerLocalStorage();

  // const markerHtml: HTMLElement = document.createElement('div');
  // markerHtml.innerHTML = 'Hola Hims'

//   const marker = new mapboxgl.Marker({
//     element: markerHtml
//   })
//       .setLngLat(this.center)
//       .addTo(this.mapa);

// }



}

agregarMarcador(){
  const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
  // console.log(color);
  
  const nuevoMarcador = new mapboxgl.Marker(
      {
      draggable: true,
      color: color
      }
  )
      .setLngLat(this.center)
      .addTo(this.mapa);

  this.marcadores.push({
    color,
    marker: nuevoMarcador
  });
  // console.log(this.marcadores);
  this.guardarMarcadoresLS();
  
  nuevoMarcador.on('dragend', () => {
    // console.log('drag');
    this.guardarMarcadoresLS();
   });

}

irMarcador(marker?: mapboxgl.Marker){
  // console.log(marker);
  this.mapa.flyTo({
    center: marker?.getLngLat()
  })
  
  }

guardarMarcadoresLS(){

  const lngLatArr: MarcadorConColor[] = [];

  this.marcadores.forEach( m =>{
    const color = m.color;
    const {lng, lat} = m.marker!.getLngLat();

    lngLatArr.push({
      color: color,
      centro: [lng, lat]
    });
  })

  localStorage.setItem('marcadores', JSON.stringify(lngLatArr) );
}

leerLocalStorage(){

  if( !localStorage.getItem('marcadores') ){
    return;
  }

  const lngLatArr: MarcadorConColor[] = JSON.parse( localStorage.getItem('marcadores')! );

  // console.log(lngLatArr);

  lngLatArr.forEach(m=>{
    const newMarker = new mapboxgl.Marker({
      color: m.color,
      draggable: true,

    })
    .setLngLat(m.centro!)
    .addTo(this.mapa);

    this.marcadores.push({
      marker: newMarker,
      color: m.color
     });

     newMarker.on('dragend', () => {
      // console.log('drag');
      this.guardarMarcadoresLS();
     });

  });
  
}

borrarMarcador(i:number){
// console.log('Borrabdo marcador');
this.marcadores[i].marker?.remove();
this.marcadores.splice(i,1);
this.guardarMarcadoresLS();

}

}