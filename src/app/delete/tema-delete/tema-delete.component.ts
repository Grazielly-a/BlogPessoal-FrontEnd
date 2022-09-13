import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { temas } from 'src/app/model/temas';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  temas: temas = new temas()
  idTemas: number

  constructor(private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idTemas = this.route.snapshot.params['id']
    this.findByIdTemas(this.idTemas)
  }

  findByIdTemas(id: number) {
    this.temaService.getByIdTemas(id).subscribe((resp: temas) =>{
      this.temas = resp
    })
  }

  apagar() {
    this.temaService.deleteTemas(this.idTemas).subscribe(() =>{
      alert('Tema apagado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}
