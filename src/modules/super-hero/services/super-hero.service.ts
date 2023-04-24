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

  updateHero(body:any, id:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.baseUrl+'/superheroes/'+id,body,{headers:headers});
  }

  deleteHero(id:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.baseUrl+'/superheroes/'+id,{headers:headers});
  }

  addHero(body:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.baseUrl+'/superheroes/',body,{headers:headers});
  }

  getByString(text: string): Observable<any> {
    return this.getHeroes().pipe(
      map((response: any) => response.filter((x: any) => x.name.toLowerCase().includes(text.toLowerCase()))),
      catchError((error) => {
        console.log(error);
        return of('no match');
      })
    );
  }

}
