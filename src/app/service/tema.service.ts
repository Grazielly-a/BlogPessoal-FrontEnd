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
    return this.http.get<temas[]>('https://blogpessoalgrazielly.herokuapp.com/temas', this.token)
  }

  getByIdTemas(id: number): Observable<temas>{
    return this.http.get<temas>(`https://blogpessoalgrazielly.herokuapp.com/temas/${id}`, this.token)
  }

  getByNomeTemas(descricao: string): Observable<temas[]> {
    return this.http.get<temas[]>(`https://blogpessoalgrazielly.herokuapp.com/temas/descricao/${descricao}`, this.token)
  }
  
  postTemas(temas: temas): Observable<temas>{
    return this.http.post<temas>('https://blogpessoalgrazielly.herokuapp.com/temas', temas, this.token)
  }

  putTemas(temas: temas): Observable<temas>{
    return this.http.put<temas>('https://blogpessoalgrazielly.herokuapp.com/temas', temas, this.token)
  }

  deleteTemas(id: number){
    return this.http.delete(`https://blogpessoalgrazielly.herokuapp.com/temas/${id}`, this.token)
  }

}