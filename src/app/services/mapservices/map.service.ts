import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MapApiService } from './map-api.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private api: MapApiService){
  }
  private latitude: BehaviorSubject<number> = new BehaviorSubject<number>(51.505);
  private longitude: BehaviorSubject<number> = new BehaviorSubject<number>(-0.09);
  private zoom: BehaviorSubject<number> = new BehaviorSubject<number>(13);

  getLatitude(): Observable<number> {
    return this.latitude.asObservable();
  }

  getLongitude(): Observable<number> {
    return this.longitude.asObservable();
  }

  getZoom(): Observable<number> {
    return this.zoom.asObservable();
  }

  setCoordinates(latitude: number, longitude: number, zoom: number): void {
    this.latitude.next(latitude);
    this.longitude.next(longitude);
    this.zoom.next(zoom);
  }
}
