import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../core/constants'
import { map } from 'rxjs';
import { User } from 'src/app/models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = Constants.getUserUrl();

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  getAllUsers(){
    return this.http.get<any>(Constants.getUserUrl() + '/list').pipe(map((resp) => {
			return resp;
		}));
  }

  getProfileUser(){
    return JSON.parse(localStorage.getItem('user')!) as User;
  }
}
