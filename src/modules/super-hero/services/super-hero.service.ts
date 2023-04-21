import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {
  baseUrl = 'http://localhost:3000'
  constructor(private _http:HttpClient) { }

  getHeroes():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.baseUrl+'/superheroes',{headers:headers});
  }

  getOneHero(id:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.baseUrl+'/superheroes/'+id,{headers:headers});
  }

  updateHero():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.baseUrl+'/superheroes/1',{name:'Nuevo nombre'},{headers:headers});
  }

  getByString(text: string): Observable<any> {
    return this.getHeroes().pipe(
      map((response: any) => response.filter((x: any) => x.name.includes(text))),
      catchError((error) => {
        console.log(error);
        return of('no match');
      })
    );
  }

}
