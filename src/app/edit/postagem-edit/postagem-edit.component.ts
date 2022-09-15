import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { postagens } from 'src/app/model/postagens';
import { temas } from 'src/app/model/temas';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagens: postagens = new postagens()

  temas: temas = new temas()  
  listaTemas: temas[]
  idTemas: number

  constructor(private router: Router,
    private route: ActivatedRoute,
    private postagensService: PostagemService,
    private temaService: TemaService) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    let id  = this.route.snapshot.params['id']
    this.findByIdPostagens(id)
    this.findAllTemas()
  }

  findByIdPostagens(id: number) {
    this.postagensService.getByIdPostagens(id).subscribe((resp: postagens) =>{
      this.postagens = resp
    })
  }

  findByIdTemas() {
    this.temaService.getByIdTemas(this.idTemas).subscribe((resp: temas) =>{
      this.temas = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: temas[]) =>{
      this.listaTemas = resp
    })
  }

  atualizar() {
    this.temas.id = this.idTemas
    this.postagens.temas = this.temas

    this.postagensService.putPostagens(this.postagens).subscribe((resp: postagens) =>{
      this.postagens = resp
      alert('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
