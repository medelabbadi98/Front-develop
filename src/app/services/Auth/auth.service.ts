import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../../core/constants'
import { User } from '../../models/user';
import jwt_decode from "jwt-decode";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private baseUrl = Constants.getUserUrl();

	private user!: User;

	constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

	signin(request: any): Observable<any> {

		return this.http.post<any>(Constants.getLoginUserUrl() + '/login', request.toString(), { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }), observe: 'response' }).pipe(map((resp) => {
			//sessionStorage.setItem('user', request.username);
			localStorage.setItem('token', 'Bearer ' + resp.headers.get('access_token'));
			localStorage.setItem('user', resp.headers.get('user-service')!);
			this.getUserById()
			return resp;
		}));
	}

	signout() {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		this.router.navigateByUrl('auth/modern/signin');
	}

	resetAllParamsStorage() {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	}

	checkMail(mail: any): Observable<any> {
		this.resetAllParamsStorage();
		return this.http.get<any>(Constants.getUserUrl() + '/checkmail/' + mail).pipe(map((resp) => {
			return resp;
		}));
	}

	isUserSignedin() {
		return localStorage.getItem('token') !== null;
	}

	getSignedinUser() {
		return JSON.parse(localStorage.getItem('user')!);
	}

	getToken():any {
		let token = localStorage.getItem('token');
		return token;
	}

	getUserById() {
		var userObject = this.getSignedinUser();
		return userObject["idUser"];
	}

	getUserRoles() {
		 if(this.getToken() !== ""){
			var roles :any = jwt_decode(this.getToken());
			return roles["roles"];
		 }
	  	return null;
	}

	checkTokenIsExpired(token:any){
		return this.http.post<any>(Constants.getUserUrl() + '/resetpassword', token).pipe(map((resp) => {
			return resp;
		}));
	}

	updatePassword(body:any){
		return this.http.post<any>(Constants.getUserUrl() + '/updatepassword', body).pipe(map((resp) => {
			return resp;
		}));
	}
}
