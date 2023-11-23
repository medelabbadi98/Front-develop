import { Injectable } from '@angular/core';
import { gpsElements } from 'src/app/models/gpsElement';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapApiService {
  private imei!:string;
  private url="http://localhost:4846/gps/api/v1/sockets/getrecord/";
  constructor(private http: HttpClient) { }
  getelement() {
    return this.http.get<gpsElements[]>(this.url+"350612072451709");
  }
}
