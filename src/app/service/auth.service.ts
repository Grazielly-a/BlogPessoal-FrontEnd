import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from 'src/environments/environment.prod';
import { usuario } from '../model/usuario';
import { usuarioLogin } from '../model/usuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  entrar(usuarioLogin: usuarioLogin): Observable<usuarioLogin>{
    return this.http.post<usuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin)
  }

  cadastrar(usuario: usuario): Observable<usuario> {
    return this.http.post<usuario>('http://localhost:8080/usuarios/cadastrar', usuario)
  }

  logado() {
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }
}
