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

  public categorias: any[] = [];
  public subCategorias: any[] = [];
  public subCategoriasVerificated: any[] = [];
  public itemsBulkDelete: any[] = [];
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];

  public width: string = '';
  public idEdit: string = '';
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;
  public inforCardDescription: string = `
  El módulo de Subcategorías complementa el sistema de clasificación en la sección de Clasificados. Permite a los usuarios crear y gestionar subcategorías específicas dentro de cada categoría, refinando aún más la presentación y búsqueda de emprendimientos. Proporciona una estructura detallada que mejora la visibilidad y accesibilidad de los negocios en la plataforma.
  `;
  public formCreate = this.fb.group({
    name: ['', Validators.required],
    categoriaId: ['', Validators.required]
  })
  public formEdit = this.fb.group({
    name: ['', Validators.required],
    categoriaId: ['', Validators.required]
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
    this.token = localStorage.getItem('token')
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getCategorias().subscribe(res => this.categorias = res.data);
    this.dataFetchingService.getSubCategorias().subscribe(res => {
      this.subCategorias = [];
      this.subCategoriasVerificated = [];
      this.subCategorias = res.data;
      res.data.map((capacitacion: any) => this.subCategoriasVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
    });
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  onSubmit() {
    if (this.subCategoriasVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta subcategoria ya existe' })
    }

    let body = {
      "name": this.formCreate.value.name,
      "categoriaId": this.formCreate.value.categoriaId.id,
    }

    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/sub/category/create/`, body, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.dataFetchingService.getSubCategorias().subscribe(res => {
          this.subCategorias = [];
          this.subCategoriasVerificated = [];
          this.subCategorias = res.data;
          res.data.map((capacitacion: any) => this.subCategoriasVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
        });
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {
    if (this.subCategoriasVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta subcategoria ya existe' })
    }

    let body = {
      "name": this.formEdit.value.name,
      "categoriaId": this.formEdit.value.categoriaId.id,
    }
    try {
      this.clasificadosService.put(`${this.API_URI}/advertisements/sub/category/update/${this.idEdit}/`, body, this.token).subscribe(respuesta => {
        this.dataFetchingService.getSubCategorias().subscribe(res => {
          this.subCategorias = [];
          this.subCategoriasVerificated = [];
          this.subCategorias = res.data;
          res.data.map((capacitacion: any) => this.subCategoriasVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
        });
        this.formEdit.reset();
        this.changeDisplayFormEdit()
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  deleteAll() {
    const itemsMaped = this.itemsBulkDelete.map((item: any) => item.id)

    if (itemsMaped.length === 0) return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Debes seleccionar al menos un registro' });
    let body = {
      "ids": itemsMaped
    }
    try {
      this.clasificadosService.delete(`${this.API_URI}/advertisements/sub/category/delete/`, this.token, body).subscribe(respuesta => {
        this.dataFetchingService.getSubCategorias().subscribe(res => {
          this.subCategorias = [];
          this.subCategoriasVerificated = [];
          this.subCategorias = res.data;
          res.data.map((capacitacion: any) => this.subCategoriasVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
        });
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
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

  confirm(event: Event | any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta subcategoria?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.clasificadosService.delete(`${this.API_URI}/advertisements/sub/category/delete/${id}/`, this.token).subscribe(respuesta => {
            this.dataFetchingService.getSubCategorias().subscribe(res => {
              this.subCategorias = [];
              this.subCategoriasVerificated = [];
              this.subCategorias = res.data;
              res.data.map((capacitacion: any) => this.subCategoriasVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
            });
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
