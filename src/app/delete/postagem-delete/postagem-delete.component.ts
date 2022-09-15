import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { postagens } from 'src/app/model/postagens';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagens: postagens = new postagens()
  idPostagens: number

  

  constructor(private router: Router,
    private route: ActivatedRoute,
    private postagensService: PostagemService) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idPostagens  = this.route.snapshot.params['id']
    this.findByIdPostagens(this.idPostagens) 
  }

  findByIdPostagens(id: number) {
    this.postagensService.getByIdPostagens(id).subscribe((resp: postagens) =>{
      this.postagens = resp
    })
  }  

  apagar() {
    this.postagensService.deletePostagens(this.idPostagens).subscribe(() =>{
      alert('Postagem apagada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }
}
