import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription, catchError } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { ValidForm, ValidarFechaAnterior } from 'src/app/helpers/validForms';
import { Sede } from 'src/app/models/main/Inicio.interface';
import { Area, Dependencia, Modalidad, Responsable, Servicio, Subarea, TipoActividad } from 'src/app/models/main/eventos.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit, OnDestroy {

  API_URI = environment.API_URI;

  public modalidades: Modalidad[] = [
    Modalidad.Presencial,
    Modalidad.Virtual,
    Modalidad.Híbrida
  ];

  public token: any;
  public width: string = '';
  public displayFormPonentes: boolean = false;
  public displayVinculacion: boolean = false;
  public vinculacionSelected: string | null = null;
  public sedes: Sede[] = [];
  public dependencias: Dependencia[] = [];
  public servicios: Servicio[] = [];
  public subscription$!: Subscription;
  public areas: Area[] = [];
  public responsables: Responsable[] = [];
  public subareas: Subarea[] = [];
  public tipo_actividades: TipoActividad[] = [];

  public inforCardDescription: string = `
  Este formulario te permite registrar a los responsables de la actividad, asignándoles roles y tipos de vinculación específicos. Selecciona cuidadosamente la combinación de rol y tipo de vinculación que mejor describa la participación de cada responsable en la actividad.
  `;
  public form = this.fb.group({
    nombre_actividad: ['', [Validators.required, Validators.maxLength(256)]],
    tipo_actividad: ['', Validators.required],
    area: ['', Validators.required],
    subarea: [{ value: '', disabled: true }, Validators.required],
    fecha_inicio: ['', [Validators.required, ValidarFechaAnterior]],
    fecha_final: ['', [Validators.required, ValidarFechaAnterior]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    objetivo: ['', [Validators.required, Validators.maxLength(256)]],
    servicios: ['', [Validators.required]],
    modalidad: ['', Validators.required],
    sede: ['', [Validators.required]],
    dependencia: ['', [Validators.required]],
    enlace_reunion: ['', Validators.maxLength(500)],
    direccion: ['', [Validators.maxLength(256)]],
    estado_actividad: [1, [Validators.maxLength(256)]],

  });

  constructor(
    private eventosService: EventosService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private pantallaService: PantallaService,
    private dataFechingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    const [width] = this.pantallaService.calcularEspacioPantalla()
    this.subscription$ = width.subscribe(width => this.width = width);
    this.token = localStorage.getItem('token');
    this.dataFechingService.getSedes().subscribe(res => this.sedes = res.data);
    this.dataFechingService.getServicios().subscribe(res => this.servicios = res.data);
    this.dataFechingService.getDependencias().subscribe(res => this.dependencias = res.data);
    this.dataFechingService.getAreas().subscribe(res => {
      this.areas = res.data;
      this.form.controls['subarea'].disable()
    });
    this.dataFechingService.getTipoActividades().subscribe(res => {
      this.tipo_actividades = res.data;
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onSubmit() {
    ValidForm(this.form);
    
    if (this.responsables.length === 0) {
      return this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Agregue un responsable' })
    }
    if (this.form.valid) {
      const {
        nombre_actividad,
        tipo_actividad,
        area,
        subarea,
        fecha_inicio,
        fecha_final,
        descripcion,
        objetivo,
        servicios,
        modalidad,
        sede,
        dependencia,
        enlace_reunion,
        direccion,
        estado_actividad
      } = this.form.value;

      let body = {
        actividad: {
          nombre_actividad,
          tipo_actividad: tipo_actividad.id,
          area: area.id,
          subarea: subarea.id,
          fecha_inicio,
          fecha_final,
          descripcion,
          objetivo,
          servicios: servicios.map((servicio: Servicio) => servicio.id),
          modalidad,
          sede: sede.id,
          dependencia: dependencia.id,
          enlace_reunion: enlace_reunion ? enlace_reunion : "",
          direccion: direccion ? direccion : "",
          estado_actividad
        },
        ponentes: {
          vinculacion: this.responsables.filter(responsable => responsable.vinculacion === "Graduado" || responsable.vinculacion === "Administrativo"),
          externos: this.responsables.filter(responsable => responsable.vinculacion !== "Graduado" && responsable.vinculacion !== "Administrativo"),
        }
      }
      this.eventosService.post(`${this.API_URI}/eventos/`, body, this.token)
        .pipe(
          catchError(error => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Oops...",
              text: "Hubo un problema",
              showConfirmButton: false,
              timer: 1500,
              allowOutsideClick: false,
            });
            throw error
          })
        )
        .subscribe(res => {
          this.form.reset();
          this.responsables = [];
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Notificación",
            text: "¡La actividad ha sido solicitada satisfactoriamente!",
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
          });
        })
    }
  }


  onChangeAreas(event: any) {
    this.form.controls['subarea'].disable()

    if (event !== null) {
      let body = {
        "area": event.id
      }
      try {
        this.eventosService.post(`${this.API_URI}/eventos/sub/areas/query/`, body, this.token).subscribe(r => {
          this.subareas = r.data;
        })
      } catch (error) {
        console.log(error)
      }
      this.form.controls['subarea'].enable()
    }
  }

  changeDisplayFormPonentes() {
    this.displayFormPonentes = !this.displayFormPonentes;
  }
  changeDisplayVinculacion() {
    this.displayVinculacion = !this.displayVinculacion;
  }
  closeDisplayFormPonentes() {
    this.displayFormPonentes = false;
  }
  onChangeModalidad(e: any) {
    this.form.get('direccion')!.setValue('');
    this.form.get('enlace_reunion')!.setValue('');
  }

  handleClickVinculacion(vinculacion: string) {
    this.vinculacionSelected = vinculacion;
  }
  handleResetVinculacion() {
    this.vinculacionSelected = null;
  }

  addResponsable(responsable: Responsable) {
    this.responsables.push(responsable);
    this.vinculacionSelected = null;
    this.closeDisplayFormPonentes();
  }
  removeResponsable(document: string) {
    this.responsables = this.responsables.filter(responsable => responsable.document !== document)
  }
}
