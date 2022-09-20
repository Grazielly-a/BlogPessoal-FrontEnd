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
    return this.http.get<postagens[]>('https://blogpessoalgrazielly.herokuapp.com/postagens', this.token)
  }

  getByIdPostagens(id: number): Observable<postagens> {
    return this.http.get<postagens>(`https://blogpessoalgrazielly.herokuapp.com/postagens/${id}`, this.token)
  }

  getByTituloPostagens(titulo: string): Observable<postagens[]> {
    return this.http.get<postagens[]>(`https://blogpessoalgrazielly.herokuapp.com/postagens/titulo/${titulo}`, this.token)
  }

  postPostagens(postagens: postagens): Observable<postagens> {
    return this.http.post<postagens>('https://blogpessoalgrazielly.herokuapp.com/postagens', postagens, this.token)
  }

  putPostagens(postagens: postagens): Observable<postagens> {
    return this.http.put<postagens>('https://blogpessoalgrazielly.herokuapp.com/postagens', postagens, this.token)
  }

  deletePostagens(id: number) {
    return this.http.delete(`https://blogpessoalgrazielly.herokuapp.com/postagens/${id}`, this.token)
  }
}
