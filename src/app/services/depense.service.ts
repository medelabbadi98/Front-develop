import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {Depense} from 'src/app/models/Depense';
import {DepenseDTO} from 'src/app/models/DepenceDTO';
import { Constants } from '../core/constants';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  private baseUrl = Constants.getDepenceUrl();
  private depense!: Depense;
  private depensedto!: DepenseDTO;
  private username!:string;
  constructor(private http: HttpClient) {}
  createDepense(Dep: any): Observable<Object> {
    this.username= sessionStorage.getItem('username')!;
    this.depensedto=new DepenseDTO();
    this.depensedto.username=this.username;
    this.depensedto.typeDepence=Dep.get("typeDepence");
    this.depensedto.description=Dep.get("description");
    this.depensedto.price=Dep.get("price");
    this.depensedto.dateDepence=Dep.get("dateDepence");
    return this.http.post<Depense>(this.baseUrl.toString()+"/add", this.depensedto)
  }
  getAllDepense() {
   this.username= sessionStorage.getItem('username')!;
    return this.http.get<DepenseDTO[]>(this.baseUrl.toString()+"/getAll?username="+this.username);

  }
  updateDepense(Dep: any): Observable<Object> {
    this.username= sessionStorage.getItem('username')!;
    this.depensedto=new DepenseDTO();
    this.depensedto.id=Dep.get("id");
    this.depensedto.username=this.username;
    this.depensedto.typeDepence=Dep.get("typeDepence");
    this.depensedto.description=Dep.get("description");
    this.depensedto.price=Dep.get("price");
    this.depensedto.dateDepence=Dep.get("dateDepence");
    return this.http.post<Depense>(this.baseUrl.toString()+"/editDepense", this.depensedto);
  }
  deleteDepense(Dep: any): Observable<Object> {
    return this.http.post<Depense>(this.baseUrl.toString()+"/Delete", Dep.get("id"));
  }
}
