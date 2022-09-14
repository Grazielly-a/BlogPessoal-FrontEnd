import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { postagens } from '../model/postagens';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<postagens[]>{
    return this.http.get<postagens[]>('http://localhost:8080/postagens', this.token)
  }

  postPostagens(postagens: postagens): Observable<postagens> {
    return this.http.post<postagens>('http://localhost:8080/postagens', postagens, this.token)
  }
}
