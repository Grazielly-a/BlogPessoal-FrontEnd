import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { temas } from 'src/app/model/temas';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  temas: temas = new temas()

  constructor(private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTemas(id)
  }

  findByIdTemas(id: number){
    this.temaService.getByIdTemas(id).subscribe((resp: temas) =>{
      this.temas = resp
    })
  }

  atualizar(){
    this.temaService.putTemas(this.temas).subscribe((resp: temas) =>{
      this.temas = resp
      alert('Tema atualizado com secesso!')
      this.router.navigate(['/tema'])
    })
  }

}
