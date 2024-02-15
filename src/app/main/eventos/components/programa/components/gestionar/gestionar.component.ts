import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit, OnDestroy {

  public width: string = '';
  public subscription$!: Subscription;
  public searchValue: string = '';

  API_URI = environment.API_URI;

  public facultades: any[] = [];
  public programas: any[] = [];
  public programasVerificated: any[] = [];
  public itemsBulkDelete: any[] = [];
  public inforCardDescription: string = `
  El módulo 'Gestionar Programas' brinda una interfaz completa para administrar los programas académicos asociados a las actividades. Permite a los administrativos asignar eventos específicos a programas de pregrado o postgrado, mejorando la relevancia y orientación de las actividades.
  `;
  public inforCardDescriptionCreate: string = `
  Forja la excelencia académica al crear programas de manera eficaz. Define trayectorias educativas significativas que enriquecerán la experiencia de los estudiantes. Esta función esencial potencia la versatilidad en la oferta académica, asegurando una planificación educativa integral y enriquecedora.
  `
  public inforCardDescriptionEdit: string = `
  Mantén la actualización y relevancia en tu oferta educativa al editar programas existentes. Ajusta detalles para reflejar cambios en las dinámicas académicas y garantiza una oferta siempre a la vanguardia. Con esta herramienta clave, optimizas la calidad y personalización de la formación académica para satisfacer las expectativas en constante evolución de tus estudiantes.
  `
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];

  public idEdit: string = '';
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;

  public formCreate = this.fb.group({
    name: ['', Validators.required],
    faculty: ['', Validators.required],

  })
  public formEdit = this.fb.group({
    name: ['', Validators.required],
    faculty: ['', Validators.required],

  })

  constructor(
    private eventosService: EventosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private pantallaService: PantallaService
  ) { }
  
  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.traerProgramas();
    this.traerFacultades();
    const [ width ] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe( width => this.width = width);
  }
  ngOnDestroy(): void {
   this.subscription$.unsubscribe();
  }

  traerFacultades() {
    this.facultades = []
    try {
      this.eventosService.get(`${this.API_URI}/university/faculta/`, this.token).subscribe(respuesta => {
        // this.facultades = respuesta.data
        respuesta.data.map((facultad: any) => this.facultades.push( {
          "id": facultad.id,
          "name": facultad.name,
        }))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }
  traerProgramas() {
    this.programas = []
    try {
      this.eventosService.get(`${this.API_URI}/university/programa/`, this.token).subscribe(respuesta => {
        this.programas = respuesta.data
        respuesta.data.map((programas: any) => this.programasVerificated.push(programas.name.toLowerCase().replace(/\s+/g, '')))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }


  onSubmit() {
    if(this.programasVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))){
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Este programa ya existe' })
    }

    let body = {
      "name": this.formCreate.value.name,
      "faculta": this.formCreate.value.faculty.id,
    }
    try {
      this.eventosService.post(`${this.API_URI}/university/programa/create/`, body , this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.traerProgramas();
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {

    if(this.programasVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))){
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Este programa ya existe' })
    }
    let body = {
      "name": this.formEdit.value.name,
      "faculta": this.formEdit.value.faculty.id,
    }
    
    try {
      this.eventosService.put(`${this.API_URI}/university/programa/update/${this.idEdit}/`, body , this.token).subscribe(respuesta => {
        this.formEdit.reset();
        this.traerProgramas();
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
      this.eventosService.delete(`${this.API_URI}/university/programa/delete/`, this.token, body).subscribe(respuesta => {
        this.traerProgramas();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }
  }
  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }
  closeDisplayFormCreate() {
    this.displayFormCreate = false;
    this.formCreate.reset();
  }
  changeDisplayFormEdit(programa: any = {}) {
    this.idEdit = programa.id;
    this.formEdit.patchValue(programa)
    console.log(programa)
    this.displayFormEdit = !this.displayFormEdit;
  }
  closeDisplayFormEdit() {
    this.displayFormEdit = false;
    this.formEdit.reset();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  confirm(event: Event | any, id: any) {
    console.log(id)

    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar este programa?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.eventosService.delete(`${this.API_URI}/university/programa/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerProgramas();
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
