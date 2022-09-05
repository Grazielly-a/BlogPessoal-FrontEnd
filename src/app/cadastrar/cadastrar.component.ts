import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../model/usuario';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: usuario = new usuario
  confirmarSenha: string
  tipoDeUsuario: string


  constructor(private authSerice: AuthService, private router: Router) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.tipoDeUsuario = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoDeUsuario

    if (this.usuario.senha != this.confirmarSenha) {
      alert('A senha está incorreta.')
    } else {
      this.authSerice.cadastrar(this.usuario).subscribe((resp: usuario) => {
        this.usuario = resp
        this.router.navigate(["/entrar"])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }

}
