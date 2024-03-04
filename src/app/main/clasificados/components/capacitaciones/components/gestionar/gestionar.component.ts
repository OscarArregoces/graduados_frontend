import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit, OnDestroy {

  public searchValue: string = '';
  public subscription$!: Subscription;


  API_URI = environment.API_URI;

  public capacitaciones: any[] = [];
  public capacitacionesVerificated: any[] = [];
  public capacitacionesSeleccionadas: any[] = [];
  public bulkDelete: number[] = []
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];

  public width: string = '';
  public idEdit: string = '';
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;

  public formCreate = this.fb.group({
    name: ['', Validators.required]
  })
  public formEdit = this.fb.group({
    name: ['', Validators.required]
  })
  public infoCardDescription: string = `
  Domina la formación empresarial al gestionar capacitaciones de manera centralizada. Este espacio integral te permite crear, visualizar, actualizar y eliminar programas formativos. Asegura una administración estratégica de las capacitaciones, potenciando el crecimiento continuo de emprendimientos y empresas. Con esta función, la institución toma las riendas de su desarrollo, garantizando una oferta formativa alineada con las demandas cambiantes del entorno empresarial.
  `;
  public infoCardDescriptionCreate: string = `
  Empodera el desarrollo empresarial al crear capacitaciones de manera eficaz. Diseña programas formativos que enriquecerán las habilidades de emprendimientos y empresas. Esta función clave impulsa la formación continua, asegurando un ecosistema emprendedor vibrante y en constante crecimiento.
  `;
  public infoCardDescriptionEdit: string = `
  Mantén la relevancia y adaptabilidad en la formación empresarial al editar capacitaciones existentes. Ajusta detalles para reflejar cambios en las dinámicas del mercado y garantiza una oferta formativa siempre actualizada. Con esta herramienta esencial, optimizas el impacto de las capacitaciones, proporcionando a los emprendimientos las herramientas necesarias para enfrentar los desafíos empresariales contemporáneos.
  `;

  constructor(
    private clasificadosService: ClasificadosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private pantallaService: PantallaService,
    private dataFetchingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getCapacitaciones().subscribe(res => {
      this.capacitaciones = [];
      this.capacitacionesVerificated = [];
      this.capacitaciones = res.data;
      res.data.map((capacitacion: any) => this.capacitacionesVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
    })
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }


  onSubmit() {
    if (this.capacitacionesVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta capacitacion ya existe' })
    }
    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/capacitaciones/create/`, this.formCreate.value, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.dataFetchingService.getCapacitaciones().subscribe(res => {
          this.capacitaciones = [];
          this.capacitacionesVerificated = [];
          this.capacitaciones = res.data;
          res.data.map((capacitacion: any) => this.capacitacionesVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
        })
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {
    if (this.capacitacionesVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta capacitacion ya existe' })
    }
    try {
      this.clasificadosService.put(`${this.API_URI}/advertisements/capacitaciones/update/${this.idEdit}/`, this.formEdit.value, this.token).subscribe(respuesta => {
        this.dataFetchingService.getCapacitaciones().subscribe(res => {
          this.capacitaciones = [];
          this.capacitacionesVerificated = [];
          this.capacitaciones = res.data;
          res.data.map((capacitacion: any) => this.capacitacionesVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
        })
        this.formEdit.reset();
        this.changeDisplayFormEdit()
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Editado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }
  closeDisplayFormCreate() {
    this.displayFormCreate = false;
    this.formCreate.reset();
  }
  changeDisplayFormEdit(capacitacion: any = {}) {
    this.idEdit = capacitacion.id;
    this.formEdit.patchValue(capacitacion)
    this.displayFormEdit = !this.displayFormEdit;
  }
  closeDisplayFormEdit() {
    this.displayFormEdit = false;
    this.formEdit.reset();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  deleteAll() {

    this.capacitacionesSeleccionadas.forEach((elemento: any, index: number) => {
      this.bulkDelete.push(elemento.id)
    })

    let body = {
      "ids": this.bulkDelete
    }

    try {
      this.clasificadosService.delete(`${this.API_URI}/advertisements/capacitaciones/delete/`, this.token, body).subscribe(respuesta => {
        this.dataFetchingService.getCapacitaciones().subscribe(res => {
          this.capacitaciones = [];
          this.capacitacionesVerificated = [];
          this.capacitaciones = res.data;
          res.data.map((capacitacion: any) => this.capacitacionesVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
        })
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }
  }

  confirm(event: Event | any, id: any) {
    console.log('Confir called')

    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta capacitacion?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.clasificadosService.delete(`${this.API_URI}/advertisements/capacitaciones/delete/${id}/`, this.token).subscribe(respuesta => {
            this.dataFetchingService.getCapacitaciones().subscribe(res => {
              this.capacitaciones = [];
              this.capacitacionesVerificated = [];
              this.capacitaciones = res.data;
              res.data.map((capacitacion: any) => this.capacitacionesVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
            })
            return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Eliminado correctamente !!!' })
          });
        } catch (error) {
          console.log(error)
        }
      },
      reject: () => {
        //reject action
      }
    });
  }
}
