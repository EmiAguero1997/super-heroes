import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {
  baseUrl = 'http://localhost:3000'
  constructor(private _http:HttpClient) { }

  updateHero():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.baseUrl+'/superheroes/1',{name:'Nuevo nombre'},{headers:headers});
  }
}
