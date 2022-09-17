import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { postagens } from '../model/postagens';
import { temas } from '../model/temas';
import { usuario } from '../model/usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagens: postagens = new postagens()
  listaPostagens: postagens[]

  temas: temas = new temas()
  listaTemas: temas[]
  idTemas: number

  usuario: usuario = new usuario()
  idUsuario = environment.id

  key = 'data'
  reverse = true

  constructor(private router: Router,
    private postagensService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){      
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: temas[]) =>{
      this.listaTemas = resp
    })
  }

  findByIdTemas() {
    this.temaService.getByIdTemas(this.idTemas).subscribe((resp: temas) =>{
      this.temas = resp
    })
  }

  getAllPostagens() {
    this.postagensService.getAllPostagens().subscribe((resp: postagens[]) =>{
      this.listaPostagens = resp
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: usuario) =>{
      this.usuario = resp
    })
  }

  publicar() {
    this.temas.id = this.idTemas
    this.postagens.temas = this.temas

    this.usuario.id = this.idUsuario
    this.postagens.usuarios = this.usuario

    this.postagensService.postPostagens(this.postagens).subscribe((resp: postagens) =>{
      this.postagens = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagens = new postagens()
      this.getAllPostagens()
    })
  }

}
