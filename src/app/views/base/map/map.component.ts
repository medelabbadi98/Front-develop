import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { MapApiService } from 'src/app/services/mapservices/map-api.service';
import { MapService } from 'src/app/services/mapservices/map.service';
import { WebsocketService } from 'src/app/services/web-socket.service';
declare const google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  
  @ViewChild('mapContainer') mapContainer: ElementRef;

  map: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.loadMap();
    console.log('ngOnInit called');
    // this.initializeMap();
    // this.subscribeToCoordinates();
  }

  loadMap() {
    this.ngZone.runOutsideAngular(() => {
      try {
        if (this.mapContainer && this.mapContainer.nativeElement) {
          this.map = new google.maps.Map(this.mapContainer.nativeElement, {
            center: { lat: 51.678418, lng: 7.809007 },
            zoom: 13,
          });
        } else {
          console.error('Map container not found or not defined.');
        }
      } catch (error) {
        console.error('Error initializing the map:', error);
      }
    });
  
  }

  private initializeMap() {
    
    // const initialLatitude = 51.505;
    // const initialLongitude = -0.09;
    // const initialZoom = 10;

    // this.map = L.map('map', {
    //   center: [initialLatitude, initialLongitude],
    //   zoom: initialZoom
    // });

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      
    // }).addTo(this.map);
    // const customIcon = L.icon({
    //   iconUrl: 'assets/marker.png', 
    //   iconSize: [32, 32], 
    //   iconAnchor: [16, 32], 
    //   popupAnchor: [0, -32] 
    // });
    // this.marker = L.marker([initialLatitude, initialLongitude], { icon: customIcon }).addTo(this.map);
    // this.map.invalidateSize();
}

  private subscribeToCoordinates() {
    // this.subscription = this.mapApi.getelement().subscribe((data: any) => {
    //   console.log(data);
    //   this.map.setView([data.y, data.x], data.altitude);
    //   this.marker.setLatLng([data.y, data.x]);
    // });
    // this.subscription = this.mapService.getLatitude().subscribe((latitude: number) => {
    //   this.updateMap('latitude', latitude);
    // });

    // this.subscription.add(this.mapService.getLongitude().subscribe((longitude: number) => {
    //   this.updateMap('longitude', longitude);
    // }));

    // this.subscription.add(this.mapService.getZoom().subscribe((zoom: number) => {
    //   this.updateMap('zoom', zoom);
    // }));
  }
  
  // private updateMap(type: string, value: number) {
  //   switch (type) {
  //     case 'latitude':
  //       this.map.panTo(new L.LatLng(value, this.map.getCenter().lng));
  //       this.marker.setLatLng([value, this.map.getCenter().lng]);
  //       break;
  //     case 'longitude':
  //       this.map.panTo(new L.LatLng(this.map.getCenter().lat, value));
  //       this.marker.setLatLng([this.map.getCenter().lat, value]);
  //       break;
  //     case 'zoom':
  //       this.map.setZoom(value);
  //       break;
  //   }
  // }

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}
