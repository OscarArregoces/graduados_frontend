import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription, catchError } from 'rxjs';
import { AdminService } from 'src/app/core/services/dashboard/admin.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { Graduado } from 'src/app/models/main/Inicio.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit {

  API_URI = environment.API_URI;
  width!: string;
  subscription$!: Subscription;
  token!: string;

  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;
  public loading: boolean = false;

  public graduados: Graduado[] = [];
  public graduadoFound: boolean = false;
  public inforCardDescription: string = `
  Nuestro Módulo de Graduados proporciona una plataforma centralizada para acceder de manera fácil y eficiente a la información detallada de nuestros graduados. Desde fechas de graduación hasta logros académicos, este módulo ofrece una visión completa de la trayectoria educativa de cada graduado. Facilita la gestión y actualización de perfiles, permitiendo un seguimiento preciso de los logros de los graduados a lo largo del tiempo. Con esta herramienta, mantenemos un vínculo continuo con nuestra comunidad de graduados, brindando una experiencia integral y facilitando la conexión entre los logros académicos y las oportunidades futuras.
  `
  public itemsBulkDelete: any[] = [];

  public form = this.fb.group({
    documento: ['']
  })

  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private pantallaService: PantallaService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.traerGraduados();
  }

  ngOnDestroy(): void { this.subscription$.unsubscribe(); }

  onSubmit() { }
  handleEdit() { }
  deleteAll() { }

  traerGraduados() {
    this.form.reset();
    this.graduadoFound = false;
    this.adminService.get(`${this.API_URI}/users/graduados`, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.graduados = res.data;
      })
  }
  traerGraduado() {
    const { documento } = this.form.value;
    if (documento === "") return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ingrese un No Documento' });

    this.graduadoFound = true;
    this.adminService.get(`${this.API_URI}/users/graduados/${documento}`, this.token)
      .pipe(
        catchError(error => {
          if (error?.error?.errors?.detail) {
            this.graduados = [];
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          }
          throw error;
        })
      )
      .subscribe(res => {
        this.graduados = [res.data]
      })
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }



}
