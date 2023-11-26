import { Injectable } from '@angular/core';
import { gpsElements } from 'src/app/models/gpsElement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getElementsByImei(imei: string): Observable<gpsElements> {
    return this.http.get<gpsElements>(this.url + imei);
  }
}
