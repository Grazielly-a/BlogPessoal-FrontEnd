import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { temas } from '../model/temas';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTemas(): Observable<temas[]>{
    return this.http.get<temas[]>('http://localhost:8080/temas', this.token)
  }
  
  postTemas(temas: temas): Observable<temas>{
    return this.http.post<temas>('http://localhost:8080/temas', temas, this.token)
  }

}