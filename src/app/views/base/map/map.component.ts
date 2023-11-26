import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { gpsElements } from 'src/app/models/gpsElement';
import { MapApiService } from 'src/app/services/mapservices/map-api.service';
import {MapService} from 'src/app/services/mapservices/map.service';
import { zip } from 'rxjs';
declare const google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  @ViewChild('mapContainer') mapContainer: ElementRef;

  map: any;
  marker: any; 

  constructor(private ngZone: NgZone, private mapService: MapService, private mapApiService: MapApiService) {
    zip(
      this.mapService.getLatitude(),
      this.mapService.getLongitude(),
      this.mapService.getZoom()
    ).subscribe(([]) => {
      this.loadMap();
    });
  }


  ngOnInit(){
   
  }
  loadMap() {
    this.ngZone.runOutsideAngular(() => {
      try {
          this.mapApiService.getElementsByImei('350612072451709').subscribe((response: gpsElements) => {
            if (this.mapContainer && this.mapContainer.nativeElement) {
              console.log('Marker Position:', { lat: response.x, lng: response.y });
              this.map = new google.maps.Map(this.mapContainer.nativeElement, {
                center: { lat: parseFloat(response.y!),lng: parseFloat(response.x!) },
                zoom: parseFloat(response.altitude!),
              });
            }
              new google.maps.Marker({
                position: { lat: parseFloat(response.y!),lng: parseFloat(response.x!) },
                map: this.map,
              });
            
          });
        
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
