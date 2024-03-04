import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  API_URI = environment.API_URI;
  public subscription$!: Subscription;
  public width: string = '';
  public token: any;
  public idCurrentEmprendimiento!: number;
  public emprendimientos: any[] = [];
  public emprendimientosSeleccionados: any[] = [];
  public emprendimiento: any;
  public visible: boolean = false;
  public loading: boolean = false;
  public displayObservaciones: boolean = false;
  public inforCardDescription: string = `
  La sección 'Detalles Emprendimientos' proporciona a los administrativos una visión completa de todos los emprendimientos registrados en el sistema de Clasificados. Desde esta interfaz, los administrativos pueden acceder fácilmente a detalles esenciales de cada emprendimiento, facilitando la supervisión y gestión global de los negocios presentes en la plataforma.
  `;

  public formObservaciones = this.fb.group({
    mensaje: ['', [Validators.required, Validators.maxLength(500)]],
    state: [false, Validators.required]
  })

  constructor(
    private clasificadosService: ClasificadosService,
    private pantallaService: PantallaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: UntypedFormBuilder,
    private dataFetchingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getEmprendimientos().subscribe(res => {
      this.emprendimientos = res.data;
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }
  showDetalles(id: number) {
    this.visible = true;
    this.emprendimiento = this.emprendimientos.filter((emprendimiento: any) => emprendimiento.id === id)
    console.log(this.emprendimiento)
  }
  closeDetalles() {
    this.visible = false;
  }
  changeDisplayObservaciones() {
    this.displayObservaciones = !this.displayObservaciones;
  }

  confirm(idEmprendimiento: number) {
    this.confirmationService.confirm({
      message: '¿Quieres verificar este emprendimiento?',
      icon: 'pi pi-check-circle',
    });

    this.idCurrentEmprendimiento = idEmprendimiento;

  }

  accept() {
    let body = {
      "state": true
    }
    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/${this.idCurrentEmprendimiento}/change/state/`, body, this.token).subscribe((res) => {
        this.dataFetchingService.getEmprendimientos().subscribe(res => {
          this.emprendimientos = res.data;
        })
        this.confirmationService.close();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Emprendimiento verificado' });
      })
    } catch (error) {
      console.log('Error', error)
    }
  }
  reject() {
    this.changeDisplayObservaciones();
    this.confirmationService.close();
  }


  handleSubmit() {
    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/${this.idCurrentEmprendimiento}/change/state/`, this.formObservaciones.value, this.token).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Observaciones enviadas' });
        this.confirmationService.close();
        this.formObservaciones.reset();
        this.changeDisplayObservaciones();
      })
    } catch (error) {
      console.log('Error', error)
    }
  }
}
