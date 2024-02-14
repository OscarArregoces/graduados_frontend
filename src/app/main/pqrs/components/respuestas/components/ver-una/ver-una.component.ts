import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { PqrsService } from 'src/app/core/services/dashboard/pqrs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver-una',
  templateUrl: './ver-una.component.html',
  styleUrls: ['./ver-una.component.css']
})
export class VerUnaComponent implements OnInit {

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  archivoAdjunto!: File;

  API_URI = environment.API_URI;
  API_URL_MEDIA = environment.API_URL_MEDIA;

  public token!: string | null;
  public solicitud: any[] = [];
  public respuestas: any[] = [];
  public id: string = '';
  public addPermission: string = 'add_respuesta';

  public form = this.fb.group({
    "descripcion": ['', [Validators.required, Validators.maxLength(600)]],
  })
  public files: any = [];

  constructor(
    private pqrsService: PqrsService,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerRespuestas();
  }

  submit() {

    const formData = new FormData();


    if(this.files[0] !== undefined){
      formData.append('anexo', this.files[0]);
    }
    formData.append('descripcion', this.form.value.descripcion)
    formData.append('pqrs', this.id)

    
    // console.log(this.files)

    // let object: any = {};
    // formData.forEach((value, key) => object[key] = value);
    // let json = JSON.stringify(object);
    // console.log(json)

    // let body = {
    //   "pqrs": this.id,
    //   "descripcion": this.form.value.descripcion
    // }

    try {
      this.pqrsService.post(`${this.API_URI}/pqrs/respuesta/create/`, formData, this.token).subscribe(r => {
        this.form.reset();
        this.traerRespuestas();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log(error)
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo en error' })
    }
  }

  onUpload(event: any) {
    this.files = [];
    const archivos = event.target.files[event.target.files.length - 1];
    
    if(archivos != undefined){
      this.files = [archivos]
    }
  }


  traerRespuestas() {
    this.solicitud = [];
    this.respuestas = [];

    this.route.queryParams.subscribe(({id}: any) => {
      this.id = id;

      let body = {
        "pqrs": id
      }

      try {
        this.pqrsService.post(`${this.API_URI}/pqrs/respuesta/query/`, body, this.token).subscribe(res => {
          console.log(res.data.respuestas)
          this.solicitud = res.data.pqrs;
          this.respuestas = res.data.respuestas;
        })
      } catch (error) {
        console.log(error)
      }
    }
    );
  }

  adjuntarArchivo(event: any) {
    const fileList: FileList = event.files;
    if (fileList.length > 0) {
      this.archivoAdjunto = fileList[0];
    }
  }

}
