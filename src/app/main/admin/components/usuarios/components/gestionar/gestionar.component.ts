import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/core/services/dashboard/admin.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
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
  token!:string;

  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;
  public loading: boolean = false;

  public usuariosSeleccionados: any[] = [];
  public usuarios: any[] = [];
  public usuariosVerificated: any[] = [];

  public formCreate = new FormGroup({
    tipo: new FormControl('', Validators.required)
  })
  public formEdit = new FormGroup({
    tipo: new FormControl('', Validators.required)
  })
  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private pantallaService: PantallaService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }

  ngOnDestroy(): void { this.subscription$.unsubscribe(); }

  onSubmit(){}
  handleEdit(){}
  deleteAll(){}

  changeDisplayFormCreate() { this.displayFormCreate = !this.displayFormCreate }
  changeDisplayFormEdit(genero:any={}) { this.displayFormEdit = !this.displayFormEdit }

  traerUsuarios() { }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  confirm(event: Event | any, id: any) {
    console.log('Confir called')

    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar este genero?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.adminService.delete(`${this.API_URI}/poll/momentos/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerUsuarios();
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
