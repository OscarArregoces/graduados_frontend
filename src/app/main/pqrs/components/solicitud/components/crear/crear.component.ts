import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subscription } from 'rxjs';
import { PqrsService } from 'src/app/core/services/dashboard/pqrs.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';





@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit, OnDestroy {

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  archivoAdjunto!: File;

  API_URI = environment.API_URI;
  public subscription$!: Subscription;
  public token: any;
  public tipoSolicitudes: any[] = [];
  public displayTipoSolicitudForm: boolean = false;
  public permisoAddTipoSolicitud: string = 'pqrs.add_tipopqrs';
  public width: string = '';
  public User: any;
  public form = this.fb.group({
    description: ['', [Validators.required, Validators.maxLength(600)]],
    tipopqrs: ['', Validators.required],
    titulo: ['', [Validators.required, Validators.maxLength(256)]],
  })
  public formTipoSolicitud = this.fb.group({
    tipo: ['', Validators.required]
  })
  public files: any = [];

  constructor(
    private pqrsService: PqrsService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private pantallaService: PantallaService

  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.User = JSON.parse(localStorage.getItem('user')!);
    this.traerTipoSolicitudes();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }


  onSubmit() {

    try {
      const formData = new FormData();
      formData.append('anexo', this.archivoAdjunto);
      formData.append('description', this.form.value.description)
      formData.append('persona', this.User.id)
      formData.append('tipopqrs', this.form.value.tipopqrs.id)
      formData.append('titulo', this.form.value.titulo)


      this.pqrsService.post(`${this.API_URI}/pqrs/create/`, formData, this.token).subscribe(respuesta => {

        this.form.reset();
        this.fileUpload.clear();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente !!!' })
      })
    } catch (error) {
      console.log(error)
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema en la consulta' })
    }
  }
  handleCreateTipoSolicitud(){
    try {
      this.pqrsService.post(`${this.API_URI}/pqrs/tipo/create/`, this.formTipoSolicitud.value, this.token).subscribe(respuesta => {
        this.formTipoSolicitud.reset();
        this.traerTipoSolicitudes();
        this.changeDisplayTipoSolicitudForm();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }
  traerTipoSolicitudes() {
    try {
      this.pqrsService.get(`${this.API_URI}/pqrs/tipo/`, this.token).subscribe(respuesta => {
        this.tipoSolicitudes = respuesta.data;
      })
    } catch (error) {
      console.log(error)
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema en la consulta' })
    }
  }

  adjuntarArchivo(event: any) {
    const fileList: FileList = event.files;
    if (fileList.length > 0) {
      this.archivoAdjunto = fileList[0];
    }
  }

  changeDisplayTipoSolicitudForm() {
    this.displayTipoSolicitudForm = !this.displayTipoSolicitudForm;
  }

}



// FINALIZADA = "FN", _("Finalizada")
// ACTIVA = "AC", _("Activa")
// PENDIENTE = "PD", _("Pendiente")