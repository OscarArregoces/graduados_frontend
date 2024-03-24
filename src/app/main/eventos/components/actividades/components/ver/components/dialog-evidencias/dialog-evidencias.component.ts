import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

import { ConfirmationService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import Swal from 'sweetalert2';

import { MainService } from '@core/services/main/main.service';
import { Actividad, Evidencia } from '@models/main/eventos.interface';
import { Variant } from '@models/ui/CustomInfoCard';
import { ValidForm } from '@helpers/validForms';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-dialog-evidencias',
  templateUrl: './dialog-evidencias.component.html',
  styleUrls: ['./dialog-evidencias.component.css'],
})
export class DialogEvidenciasComponent implements OnInit, OnChanges {
  @Input() display: boolean = false;
  @Input() width: string = "80%";
  @Input() actividad: Actividad | null = null;
  @Output() closeDisplay: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  public API_URI = environment.API_URI;
  public token: string | null = null;
  public archivoAdjunto: File | null = null;
  public variantColor: Variant = Variant.Blue;
  public evidencias: Evidencia[] = []
  public infoCardDescription: string = `
  El módulo "Evidencias de la Actividad" te permite compartir imagenes y archivos que demuestren la ejecución de las actividades organizadas para los graduados de la Universidad de La Guajira. Sube hasta 5 archivos de cualquier tipo, como imágenes, documentos o presentaciones, con un tamaño máximo de 10 MB por archivo.
  `;
  public form = this.fb.group({
    titulo: ['', Validators.required]
  })

  constructor(
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.token && changes['actividad'] && changes['actividad'].currentValue !== null && changes['actividad'].previousValue === null) {
      this.mainService.get(`${this.API_URI}/eventos/evidencias/${this.actividad?.id}/`, this.token)
        .pipe(
          catchError(error => {
            throw error;
          })
        )
        .subscribe(res => {
          this.evidencias = res.data;
        })
    }
  }

  adjuntarArchivo(event: any,) {
    const fileList: FileList = event.files;
    if (fileList.length > 0) {
      this.archivoAdjunto = fileList[0];
    }
  }

  handleAddFile() {
    ValidForm(this.form);
    if (this.form.valid && this.archivoAdjunto) {
      this.evidencias.push({
        titulo: this.form.value.titulo.trim(),
        archivo: this.archivoAdjunto
      });
      this.fileUpload.clear();
      this.form.reset();
    }
  }

  confirm(event: any, index: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro(a) que quieres eliminar esta evidencia?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.evidencias.splice(index, 1)
      },
      reject: () => {
        //reject action
      }
    });
  }

  handleCloseDialog() {
    this.closeDisplay.emit();
    this.form.reset();
    this.archivoAdjunto = null;
    this.fileUpload.clear();
  }

  onSubmit() {
    const formData = new FormData();
    let archivosSinCambios: Evidencia[] = [];

    for (const evidencia of this.evidencias) {
      if (evidencia.archivo instanceof File) {

        const nombreOriginal = evidencia.archivo.name;
        const extension = nombreOriginal.split('.').pop();
        const nuevoNombre = 'evidencia_' + Date.now() + '.' + extension;

        formData.append('archivos', evidencia.archivo, nuevoNombre);
        formData.append('titulos', evidencia.titulo);
      } else {
        archivosSinCambios.push(evidencia)
      }
    }
    formData.append("archivosSinCambios", JSON.stringify(archivosSinCambios))

    this.mainService.postFiles(`${this.API_URI}/eventos/evidencias/${this.actividad?.id}/`, formData, this.token)
      .pipe(
        catchError(error => {
          Swal.fire({
            icon: "warning",
            title: "¡Atención!",
            text: "No se pudieron cargar las evidencias",
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
            timerProgressBar: true
          });
          throw error;
        })
      )
      .subscribe(res => {
        Swal.fire({
          icon: "success",
          title: "Noificación",
          text: "¡Evidencias Cargadas Exitosamente!",
          showConfirmButton: false,
          timer: 1500,
          allowOutsideClick: false,
          timerProgressBar: true,
        });
        this.form.reset();
        this.evidencias = [];
        this.archivoAdjunto = null;
        this.actividad = null;
        this.closeDisplay.emit();
      })
  }
}
