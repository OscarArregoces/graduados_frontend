import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
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

  public subscription$!: Subscription;
  public searchValue: string = '';
  public width!: string;
  API_URI = environment.API_URI;

  public categorias: any[] = [];
  public categoraisVerificated: any[] = [];
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];
  public itemsBulkDelete: any[] = [];

  public idEdit: string = '';
  public inforCardDescription: string = `
  El módulo de Categorías proporciona un marco organizativo esencial para los emprendimientos en la sección de Clasificados. Aquí, los usuarios pueden crear, editar y gestionar las categorías que definen la naturaleza y el enfoque de sus negocios. Facilita la agrupación lógica de emprendimientos, permitiendo a los usuarios clasificar y presentar sus proyectos de manera efectiva.
  `;
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;
  public formCreate = this.fb.group({
    name: ['', Validators.required]
  })
  public formEdit = this.fb.group({
    name: ['', Validators.required]
  })

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
    this.dataFetchingService.getCategorias().subscribe(res => {
      this.categorias = [];
      this.categoraisVerificated = [];
      this.categorias = res.data;
      res.data.map((capacitacion: any) => this.categoraisVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
    })
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }



  onSubmit() {
    if (this.categoraisVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta categoria ya existe' })
    }
    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/category/create/`, this.formCreate.value, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.dataFetchingService.getCategorias().subscribe(res => {
          this.categorias = [];
          this.categoraisVerificated = [];
          this.categorias = res.data;
          res.data.map((capacitacion: any) => this.categoraisVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
        })
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }


  handleEdit() {
    if (this.categoraisVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta categoria ya existe' })
    }
    try {
      this.clasificadosService.put(`${this.API_URI}/advertisements/category/update/${this.idEdit}/`, this.formEdit.value, this.token).subscribe(respuesta => {
        this.dataFetchingService.getCategorias().subscribe(res => {
          this.categorias = [];
          this.categoraisVerificated = [];
          this.categorias = res.data;
          res.data.map((capacitacion: any) => this.categoraisVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
        })
        this.formEdit.reset();
        this.changeDisplayFormEdit()
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }
  changeDisplayFormEdit(capacitacion: any = {}) {
    this.idEdit = capacitacion.id;
    this.formEdit.patchValue(capacitacion)
    this.displayFormEdit = !this.displayFormEdit;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  deleteAll() {
    const itemsMaped = this.itemsBulkDelete.map((item: any) => item.id)

    if (itemsMaped.length === 0) return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Debes seleccionar al menos un registro' });
    let body = {
      "ids": itemsMaped
    }

    try {
      this.clasificadosService.delete(`${this.API_URI}/advertisements/category/delete/`, this.token, body).subscribe(respuesta => {
        this.dataFetchingService.getCategorias().subscribe(res => {
          this.categorias = [];
          this.categoraisVerificated = [];
          this.categorias = res.data;
          res.data.map((capacitacion: any) => this.categoraisVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
        })
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }
  }

  confirm(event: Event | any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta categoria?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.clasificadosService.delete(`${this.API_URI}/advertisements/category/delete/${id}/`, this.token).subscribe(respuesta => {
            this.dataFetchingService.getCategorias().subscribe(res => {
              this.categorias = [];
              this.categoraisVerificated = [];
              this.categorias = res.data;
              res.data.map((capacitacion: any) => this.categoraisVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
            })
            return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
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
