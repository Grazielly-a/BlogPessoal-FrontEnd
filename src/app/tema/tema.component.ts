import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { temas } from '../model/temas';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  temas: temas = new temas()
  listaTemas: temas[]

  constructor(private router: Router, 
    private temaService: TemaService,
    private alertas: AlertasService) { }

  ngOnInit() {
    if(environment.token == ''){      
      this.router.navigate(['/entrar'])
    }

    if(environment.tipo != 'adm'){
      this.alertas.showAlertInfo('Você precisa ser adm para acessar essa rota.')
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()
  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: temas[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTemas(this.temas).subscribe((resp: temas) => {
      this.temas = resp      
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
      this.findAllTemas()
      this.temas =  new temas()
    })
  }



}
