import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { valorReloj, XsegundoService } from 'src/app/core/services/reloj/Xsegundo.service';
import { listaMenuI } from 'src/app/models/menu';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { createMenu, listMenu } from 'src/app/consts/menu';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MainService } from 'src/app/core/services/main/main.service';
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';
interface menu {
  label: string,
  data?: string
  expandedIcon: string,
  collapsedIcon: string,
  children?: any[]
}
@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css'],
  providers: [DialogService]
})
export class PrivateLayoutComponent implements OnInit, OnDestroy {
  display = true
  items: MenuItem[] = [];
  items2: MenuItem[] = [];

  public API_URI = environment.API_URI;
  public displayAvatarForm: boolean = false;
  public displayCuentaForm: boolean = false;
  public width!: string;
  public subscription$!: Subscription;

  public formCuenta = this.fb.group({
    'original_password': ['', Validators.required],
    'password': ['', Validators.required],
  })

  public isLoggedIn = true;
  public menu1: listaMenuI[] = [];
  public algo: listaMenuI[] = [];
  public publicMenu: listaMenuI[] = [];
  public privateMenu: listaMenuI[] = [];
  public profileImageUrl = 'assets/demo1.png';
  public ImageUrl = 'assets/demo1.png';
  public nombre: string = 'Demo';
  public subcribe: any;
  public token: string | null = null;
  public displayMaximizable: boolean = true
  public mostrar: boolean = false;
  public username: string | undefined = undefined
  public password: string | undefined = undefined
  public descriptionCustomInfoCard: string = `
  Bienvenido al apartado de Actualización de Contraseña. En este espacio seguro, puedes modificar tu contraseña para garantizar la seguridad de tu cuenta. Por favor, ingresa tu contraseña actual y establece una nueva para actualizar tu cuenta. Asegúrate de que la nueva contraseña sea segura y única. Haz clic en 'Actualizar Contraseña' para confirmar los cambios.¡Gracias por mantener tu cuenta segura!"
  `;

  public files1: menu[] = []
  datos$: Observable<valorReloj> = this.segundo.getInfoReloj();
  hora?: number = 0;
  minutos?: string = '';
  dia?: string = '';
  fecha?: string = '';
  ampm?: string = '';
  segundos?: string = '';
  public ref1: any;
  public image3: string = 'assets/demo1.png'
  public image2: string = 'assets/demo.png'
  public Dialog: boolean = false

  private UserId: number = 0
  public mensaje: boolean = false



  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private segundo: XsegundoService,
    public dialogService: DialogService,
    private pantallaService: PantallaService,
    private fb: UntypedFormBuilder,
    private mainService: MainService

  ) { }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.getMenu()
    this.token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')!)
    if (user) {
      const { full_name } = user;
      this.nombre = full_name;
    }
    this.datos$ = this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana;
      this.fecha = x.diaymes;
      this.ampm = x.ampm;
      this.segundos = x.segundo
    });

    this.primengConfig.ripple = true;
    this.items2 = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
    this.items = [
      {
        label: 'Cuenta', icon: 'pi pi-id-card',
        command: () => this.changeDisplayCuentaForm()
      },
      {
        label: 'Avatar', icon: 'pi pi-user',
        command: () => this.changeDisplayAvatarForm()
      },
      {
        label: 'Cerrar Sesion', icon: 'pi pi-power-off', command: () => {
          this.showConfirm();
        }
      },
      { separator: true },

    ];

    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width)

  }

  handleSubmitFormCuenta() {

    const { original_password, password } = this.formCuenta.value;
    if (original_password.length === 0 || password.length === 0) return this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'Los dos campos son obligatorios' });
    if (original_password === password) return this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'La contraseña actual no puede ser igual a la nueva' });

    try {
      this.mainService.put(`${this.API_URI}/users/change/password/`, this.formCuenta.value, this.token).subscribe(res => {
        this.closeDisplayCuentaForm();
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Contraseña cambiada !!' });
      })
    } catch (error: any) {
      console.log('Error en consulta', error)
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contraseña incorrecta' })
    }
  }
  ocultarMenu(boolean: boolean) {
    this.display = boolean
  }


  openDialogResgister(event: Event) {
    event.preventDefault();


  }
  public confirm() {
    this.showSuccess()
    this.displayMaximizable = false
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ingreso exitoso' });
  }
  save(id: string) {

  }

  openDialogLogin(event: Event) {
    event.preventDefault();
    this.displayMaximizable = true
  }
  cerrarSesion() {
    let lastLogin = localStorage.getItem('lastLogin');
    this.authService.logout()
    if (lastLogin) {
      this.router.navigate([lastLogin]);
    } else {
      this.router.navigate(['/graduado']);
    }
  }

  showConfirm() {
    this.Dialog = true;
  }

  hideDialog() {
    this.Dialog = false;
  }

  changeDisplayAvatarForm() {
    this.displayAvatarForm = !this.displayAvatarForm;
  }
  changeDisplayCuentaForm() {
    this.displayCuentaForm = !this.displayCuentaForm;
  }
  closeDisplayCuentaForm() {
    this.displayCuentaForm = false;
    this.formCuenta.reset();
  }

  public getMenu() {
    const menu = JSON.parse(localStorage.getItem('menu')!);
    if (menu) {
      this.showSuccess()
      this.menu1 = createMenu(menu);
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
