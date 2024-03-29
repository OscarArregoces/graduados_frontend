import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { EncuestasService } from 'src/app/core/services/dashboard/encuestas.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  API_URI = environment.API_URI;
  public form = this.fb.group({
    tipo: ['', Validators.required]
  })
  public token: any;
  public momentos: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private momentoService: EncuestasService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerMomentos()
  }

  onSubmit() {
    if (this.momentos.includes(this.form.value.tipo.toLowerCase())) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Este momento ya existe' });
    }
    console.log(this.momentos)

    this.momentoService.post(`${this.API_URI}/poll/momentos/create/`, this.form.value, this.token).subscribe(respuesta => {
      console.log(respuesta)
      this.form.reset()
      this.traerMomentos();
      return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Momento creado correctamente' });
    })
  }


  traerMomentos() {
    this.momentoService.get(`${this.API_URI}/poll/momentos/`, this.token).subscribe(respuesta => {
      this.momentos = [];
      respuesta.data.map((momento: any) => this.momentos.push(momento.tipo))
    })
  }


}
