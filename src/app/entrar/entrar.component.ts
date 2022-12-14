import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { usuarioLogin } from '../model/usuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: usuarioLogin = new usuarioLogin()

  constructor(private alth: AuthService,
     private router: Router,
     private alertas: AlertasService) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  entrar() {
    this.alth.entrar(this.usuarioLogin).subscribe((resp: usuarioLogin) => {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome
      environment.foto = this.usuarioLogin.foto
      environment.id = this.usuarioLogin.id  
      environment.tipo = this.usuarioLogin.tipo

      this.router.navigate(['/inicio'])
    },
      erro => {
        if (erro.status == 401 || erro.status == 500) {
          this.alertas.showAlertDanger('Usuário ou Senha incorreto.')
        }
      }
    )
  }

}
